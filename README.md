# Cybersecurity Awareness and Phishing Simulation Platform

A comprehensive web-based platform designed to educate users about cybersecurity best practices and simulate phishing attacks to train them in identifying and responding to potential threats.

## 🎯 Project Overview

This platform serves as a final year project that addresses the critical need for cybersecurity awareness training in organizations. It combines interactive educational modules with realistic phishing simulations to create a comprehensive training environment.

### Key Features

- **Interactive Training Modules**: Comprehensive lessons on phishing, password security, social engineering, and data protection
- **Phishing Simulation Engine**: Realistic email simulations to test user awareness
- **Analytics Dashboard**: Detailed reporting and progress tracking
- **Role-Based Access Control**: Separate interfaces for trainees and administrators
- **Gamification**: Badges and points system to encourage engagement
- **Security-First Design**: Built with modern security best practices

## 🚀 Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Charts**: Chart.js and Recharts
- **Email**: Nodemailer
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-awareness-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/cybersecurity_platform"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   # Add other required environment variables
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── training/          # Training module pages
│   ├── simulations/       # Phishing simulation pages
│   └── analytics/         # Analytics pages
├── components/            # Reusable React components
│   ├── ui/               # Basic UI components
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   └── providers/        # Context providers
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Features in Detail

### User Authentication
- Secure registration and login
- Role-based access (Trainee/Admin)
- Password reset functionality
- OAuth integration (Google)

### Training Modules
- Interactive cybersecurity lessons
- Progress tracking
- Knowledge assessment quizzes
- Completion certificates

### Phishing Simulations
- Customizable email templates
- Scheduled campaigns
- Real-time interaction tracking
- Immediate feedback system

### Analytics Dashboard
- User progress visualization
- Phishing simulation results
- Risk assessment metrics
- Exportable reports

## 🔒 Security Features

- HTTPS enforcement
- Input sanitization
- Rate limiting
- CSRF protection
- Secure password hashing
- JWT token management

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:
- Users (authentication and profiles)
- Training Modules (educational content)
- Quizzes (assessments)
- User Progress (tracking completion)
- Phishing Campaigns (simulation management)
- Campaign Results (interaction tracking)

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Leslie Benson Achi**
- Final Year Project
- Computer Science Department

## 🙏 Acknowledgments

- Thanks to all cybersecurity professionals who inspired this project
- Special thanks to academic supervisors and mentors
- Open source community for the amazing tools and libraries

## 📞 Support

If you have any questions or need help with the project, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Note**: This is an educational project designed for cybersecurity awareness training. Always follow your organization's security policies and guidelines.
