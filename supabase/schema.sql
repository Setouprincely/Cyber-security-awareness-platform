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
