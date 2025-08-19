-- Create a table for user profiles that extends Supabase Auth users
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  role text not null check (role in ('ADMIN', 'TRAINEE')) default 'TRAINEE',
  updated_at timestamp with time zone default timezone('utc'::text, now()),

  constraint email_check check (email ~* '^.+@.+\..+$')
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'TRAINEE')
  );
  return new;
end;
$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================
-- Phishing Simulation Tables
-- =============================

-- Sessions table to group a user's actions in a single randomized scenario
create table if not exists simulation_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  scenario_type text not null check (scenario_type in ('EMAIL','SMS','WEBSITE')),
  started_at timestamp with time zone not null default timezone('utc'::text, now()),
  ended_at timestamp with time zone,
  success boolean,
  time_taken_ms integer,
  variation jsonb,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table simulation_sessions enable row level security;

-- Events table to track granular user interactions within a session
create table if not exists phishing_events (
  id uuid primary key,
  session_id uuid not null references public.simulation_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  scenario_type text not null check (scenario_type in ('EMAIL','SMS','WEBSITE')),
  action text not null check (action in (
    'EMAIL_OPENED',
    'LINK_CLICKED',
    'ATTACHMENT_CLICKED',
    'REPORTED_PHISHING',
    'FORM_SUBMITTED',
    'IGNORED',
    'HOVERED_LINK'
  )),
  meta jsonb,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table phishing_events enable row level security;

-- RLS Policies
-- Users can manage their own sessions/events
create policy if not exists "Users can insert their own sessions"
  on simulation_sessions for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can select their own sessions"
  on simulation_sessions for select
  using (auth.uid() = user_id);

create policy if not exists "Users can update their own sessions"
  on simulation_sessions for update
  using (auth.uid() = user_id);

create policy if not exists "Users can insert their own events"
  on phishing_events for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can select their own events"
  on phishing_events for select
  using (auth.uid() = user_id);

-- Admins (from profiles) can read all for analytics
create policy if not exists "Admins can select all sessions"
  on simulation_sessions for select
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'
  ));

create policy if not exists "Admins can select all events"
  on phishing_events for select
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'
  ));

-- =============================
-- Training Modules & Quizzes
-- =============================

-- Core training modules
create table if not exists training_modules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in (
    'PHISHING', 'PASSWORD_SECURITY', 'SOCIAL_ENGINEERING', 'DATA_PROTECTION', 'SAFE_BROWSING', 'INCIDENT_RESPONSE'
  )),
  difficulty text not null check (difficulty in ('BEGINNER','INTERMEDIATE','ADVANCED')),
  estimated_duration integer not null default 30,
  content jsonb not null,
  is_published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table training_modules enable row level security;

create policy if not exists "Anyone can read published modules"
  on training_modules for select
  using (is_published = true or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'
  ));

create policy if not exists "Admins can insert modules"
  on training_modules for insert
  with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'
  ));

create policy if not exists "Admins can update modules"
  on training_modules for update
  using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'
  ));

-- Per-user module progress
create table if not exists module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.training_modules(id) on delete cascade,
  progress integer not null default 0 check (progress between 0 and 100),
  completed boolean not null default false,
  current_lesson integer not null default 0,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (user_id, module_id)
);

alter table module_progress enable row level security;

create policy if not exists "Users manage own module progress"
  on module_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Quizzes
create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.training_modules(id) on delete cascade,
  title text not null,
  description text,
  passing_score integer not null default 80 check (passing_score between 0 and 100),
  time_limit integer,
  is_final boolean not null default false,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table quizzes enable row level security;

create policy if not exists "Quizzes are readable to all"
  on quizzes for select
  using (true);

create policy if not exists "Admins manage quizzes"
  on quizzes for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

create table if not exists quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question text not null,
  type text not null check (type in ('MULTIPLE_CHOICE','TRUE_FALSE','MULTIPLE_SELECT','SCENARIO')),
  options jsonb not null,
  correct_answer jsonb not null,
  explanation text,
  points integer not null default 1 check (points > 0)
);

alter table quiz_questions enable row level security;
create policy if not exists "Quiz questions are readable"
  on quiz_questions for select using (true);
create policy if not exists "Admins manage quiz questions"
  on quiz_questions for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- Attempts
create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  started_at timestamp with time zone not null default timezone('utc'::text, now()),
  completed_at timestamp with time zone,
  score integer not null default 0,
  passed boolean,
  answers jsonb
);

alter table quiz_attempts enable row level security;
create policy if not exists "Users manage own attempts"
  on quiz_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Certificates issued
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_name text not null,
  score integer not null,
  issued_at timestamp with time zone not null default timezone('utc'::text, now()),
  pdf_data_url text
);

alter table certificates enable row level security;
create policy if not exists "Users read own certificates"
  on certificates for select using (auth.uid() = user_id);
create policy if not exists "Users insert own certificates"
  on certificates for insert with check (auth.uid() = user_id);