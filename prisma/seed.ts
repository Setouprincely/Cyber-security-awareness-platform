import { PrismaClient, UserRole, ModuleCategory, DifficultyLevel, QuestionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cybersecurity-platform.com' },
    update: {},
    create: {
      email: 'admin@cybersecurity-platform.com',
      name: 'System Administrator',
      password: adminPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  })

  // Create sample trainee users
  const traineePassword = await bcrypt.hash('trainee123!', 12)
  const trainee1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: traineePassword,
      role: UserRole.TRAINEE,
      emailVerified: new Date(),
    },
  })

  const trainee2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: traineePassword,
      role: UserRole.TRAINEE,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Users created')

  // Create training modules
  const phishingModule = await prisma.trainingModule.create({
    data: {
      title: 'Introduction to Phishing Attacks',
      description: 'Learn to identify and respond to phishing attempts',
      content: `
# Introduction to Phishing Attacks

## What is Phishing?

Phishing is a type of social engineering attack where cybercriminals attempt to trick individuals into revealing sensitive information such as passwords, credit card numbers, or personal data by masquerading as a trustworthy entity.

## Common Types of Phishing

### 1. Email Phishing
The most common form where attackers send fraudulent emails that appear to come from legitimate sources.

### 2. Spear Phishing
Targeted attacks aimed at specific individuals or organizations using personalized information.

### 3. Whaling
High-value targets such as executives or high-profile individuals.

### 4. Smishing (SMS Phishing)
Phishing attacks conducted via text messages.

### 5. Vishing (Voice Phishing)
Phone-based phishing attacks.

## Red Flags to Watch For

- **Urgent or threatening language**: "Your account will be closed immediately!"
- **Generic greetings**: "Dear Customer" instead of your name
- **Suspicious sender addresses**: Check for misspellings or unusual domains
- **Unexpected attachments**: Be cautious of unexpected files
- **Requests for sensitive information**: Legitimate companies rarely ask for passwords via email
- **Poor grammar and spelling**: Many phishing emails contain obvious errors
- **Suspicious links**: Hover over links to see the actual destination

## How to Protect Yourself

1. **Verify the sender**: Contact the organization directly using official contact information
2. **Don't click suspicious links**: Type URLs directly into your browser
3. **Use multi-factor authentication**: Add an extra layer of security
4. **Keep software updated**: Ensure your email client and browser are current
5. **Report suspicious emails**: Forward phishing attempts to your IT department
6. **Trust your instincts**: If something feels wrong, it probably is

## What to Do If You Fall Victim

1. **Change passwords immediately**: Update all affected accounts
2. **Contact your bank**: If financial information was compromised
3. **Report the incident**: Notify your IT department or security team
4. **Monitor accounts**: Watch for unusual activity
5. **Run security scans**: Check your devices for malware

Remember: When in doubt, don't click, don't download, and don't provide information. Always verify through official channels.
      `,
      category: ModuleCategory.PHISHING,
      difficulty: DifficultyLevel.BEGINNER,
      estimatedDuration: 30,
      isPublished: true,
      createdBy: admin.id,
    },
  })

  const passwordModule = await prisma.trainingModule.create({
    data: {
      title: 'Password Security Best Practices',
      description: 'Learn how to create and manage secure passwords',
      content: `
# Password Security Best Practices

## Why Password Security Matters

Passwords are often the first line of defense against unauthorized access to your accounts and sensitive information. Weak passwords can lead to data breaches, identity theft, and financial loss.

## Creating Strong Passwords

### Characteristics of Strong Passwords

- **Length**: At least 12 characters long
- **Complexity**: Mix of uppercase, lowercase, numbers, and symbols
- **Uniqueness**: Different for each account
- **Unpredictability**: Avoid personal information and common patterns

### Password Creation Strategies

#### 1. Passphrase Method
Use a memorable phrase and modify it:
- "I love coffee in the morning!" → "Il0v3C0ff33!nTh3M0rn1ng!"

#### 2. Acronym Method
Create an acronym from a memorable sentence:
- "My dog Rex was born in 2015 and loves treats!" → "MdRwbi2015alt!"

#### 3. Random Generation
Use a password manager to generate truly random passwords.

## Password Management

### Password Managers
- **Benefits**: Generate, store, and auto-fill strong passwords
- **Popular options**: 1Password, LastPass, Bitwarden, Dashlane
- **Master password**: Use one strong password to protect all others

### Two-Factor Authentication (2FA)
- **What it is**: Additional security layer beyond passwords
- **Types**: SMS codes, authenticator apps, hardware tokens
- **Recommendation**: Enable 2FA on all important accounts

## Common Password Mistakes

1. **Using personal information**: Names, birthdays, addresses
2. **Reusing passwords**: Same password across multiple accounts
3. **Simple patterns**: "password123", "qwerty", "123456"
4. **Sharing passwords**: Never share passwords with others
5. **Writing passwords down**: Avoid sticky notes and unsecured documents
6. **Using public computers**: Don't save passwords on shared devices

## Password Hygiene

### Regular Maintenance
- **Change compromised passwords immediately**
- **Update passwords periodically** (every 6-12 months for sensitive accounts)
- **Remove unused accounts**
- **Review password manager regularly**

### Breach Response
1. **Check if your accounts were compromised**: Use services like HaveIBeenPwned
2. **Change affected passwords immediately**
3. **Enable 2FA if not already active**
4. **Monitor accounts for suspicious activity**

## Enterprise Password Policies

### For Organizations
- **Minimum length requirements**: At least 12 characters
- **Complexity requirements**: Mix of character types
- **Password history**: Prevent reuse of recent passwords
- **Account lockout policies**: Protect against brute force attacks
- **Regular security training**: Keep employees informed

Remember: A strong password is your first defense against cyber threats. Invest in a good password manager and enable two-factor authentication wherever possible.
      `,
      category: ModuleCategory.PASSWORD_SECURITY,
      difficulty: DifficultyLevel.BEGINNER,
      estimatedDuration: 25,
      isPublished: true,
      createdBy: admin.id,
    },
  })

  console.log('✅ Training modules created')

  // Create quizzes for the modules
  const phishingQuiz = await prisma.quiz.create({
    data: {
      moduleId: phishingModule.id,
      title: 'Phishing Knowledge Assessment',
      description: 'Test your understanding of phishing attacks and prevention',
      passingScore: 70,
      timeLimit: 15,
    },
  })

  // Create quiz questions for phishing module
  await prisma.quizQuestion.createMany({
    data: [
      {
        quizId: phishingQuiz.id,
        question: 'What is the most common type of phishing attack?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: ['Email phishing', 'SMS phishing', 'Voice phishing', 'Social media phishing'],
        correctAnswer: ['Email phishing'],
        explanation: 'Email phishing is the most common form of phishing attack, where attackers send fraudulent emails.',
        points: 1,
        order: 1,
      },
      {
        quizId: phishingQuiz.id,
        question: 'Which of the following are red flags in a phishing email? (Select all that apply)',
        type: QuestionType.MULTIPLE_SELECT,
        options: ['Urgent language', 'Generic greetings', 'Requests for passwords', 'Official company logo'],
        correctAnswer: ['Urgent language', 'Generic greetings', 'Requests for passwords'],
        explanation: 'Urgent language, generic greetings, and requests for sensitive information are common phishing indicators.',
        points: 2,
        order: 2,
      },
      {
        quizId: phishingQuiz.id,
        question: 'You should always click on links in emails to verify if they are legitimate.',
        type: QuestionType.TRUE_FALSE,
        options: ['True', 'False'],
        correctAnswer: ['False'],
        explanation: 'Never click on suspicious links. Instead, type URLs directly into your browser or contact the organization directly.',
        points: 1,
        order: 3,
      },
      {
        quizId: phishingQuiz.id,
        question: 'What should you do if you suspect you have received a phishing email?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: ['Delete it immediately', 'Forward it to friends', 'Report it to IT/security team', 'Reply asking for verification'],
        correctAnswer: ['Report it to IT/security team'],
        explanation: 'Always report suspicious emails to your IT or security team so they can take appropriate action.',
        points: 1,
        order: 4,
      },
    ],
  })

  const passwordQuiz = await prisma.quiz.create({
    data: {
      moduleId: passwordModule.id,
      title: 'Password Security Assessment',
      description: 'Evaluate your knowledge of password security best practices',
      passingScore: 80,
      timeLimit: 10,
    },
  })

  // Create quiz questions for password module
  await prisma.quizQuestion.createMany({
    data: [
      {
        quizId: passwordQuiz.id,
        question: 'What is the minimum recommended length for a strong password?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: ['6 characters', '8 characters', '10 characters', '12 characters'],
        correctAnswer: ['12 characters'],
        explanation: 'Security experts recommend passwords be at least 12 characters long for adequate protection.',
        points: 1,
        order: 1,
      },
      {
        quizId: passwordQuiz.id,
        question: 'Two-factor authentication adds an extra layer of security to your accounts.',
        type: QuestionType.TRUE_FALSE,
        options: ['True', 'False'],
        correctAnswer: ['True'],
        explanation: '2FA provides additional security by requiring a second form of verification beyond just a password.',
        points: 1,
        order: 2,
      },
      {
        quizId: passwordQuiz.id,
        question: 'Which of the following make a password stronger? (Select all that apply)',
        type: QuestionType.MULTIPLE_SELECT,
        options: ['Using uppercase and lowercase letters', 'Including numbers', 'Adding special characters', 'Using personal information'],
        correctAnswer: ['Using uppercase and lowercase letters', 'Including numbers', 'Adding special characters'],
        explanation: 'Strong passwords use a mix of character types but avoid personal information that could be guessed.',
        points: 2,
        order: 3,
      },
    ],
  })

  console.log('✅ Quizzes and questions created')

  // Create badges
  await prisma.badge.createMany({
    data: [
      {
        name: 'First Steps',
        description: 'Complete your first training module',
        icon: '🎯',
        criteria: { type: 'module_completion', count: 1 },
        points: 10,
      },
      {
        name: 'Knowledge Seeker',
        description: 'Complete 5 training modules',
        icon: '📚',
        criteria: { type: 'module_completion', count: 5 },
        points: 50,
      },
      {
        name: 'Phishing Expert',
        description: 'Score 100% on a phishing quiz',
        icon: '🎣',
        criteria: { type: 'perfect_quiz', category: 'PHISHING' },
        points: 25,
      },
      {
        name: 'Security Guardian',
        description: 'Report a phishing simulation',
        icon: '🛡️',
        criteria: { type: 'report_phishing', count: 1 },
        points: 30,
      },
      {
        name: 'Vigilant User',
        description: 'Avoid clicking on 5 phishing simulations',
        icon: '👁️',
        criteria: { type: 'avoid_phishing', count: 5 },
        points: 40,
      },
    ],
  })

  console.log('✅ Badges created')

  // Create email templates
  await prisma.emailTemplate.createMany({
    data: [
      {
        name: 'Fake Bank Security Alert',
        subject: 'URGENT: Suspicious Activity Detected on Your Account',
        body: `
Dear Valued Customer,

We have detected suspicious activity on your account and need you to verify your identity immediately to prevent unauthorized access.

Click here to secure your account: [MALICIOUS_LINK]

If you do not verify within 24 hours, your account will be temporarily suspended for security purposes.

Thank you for your immediate attention to this matter.

Best regards,
Security Team
Your Bank
        `,
        senderName: 'Bank Security Team',
        senderEmail: 'security@yourbank-alert.com',
        attachments: [],
        phishingIndicators: [
          'Urgent language',
          'Suspicious sender domain',
          'Request to click link',
          'Threat of account suspension',
          'Generic greeting'
        ],
        createdBy: admin.id,
      },
      {
        name: 'Fake IT Support Request',
        subject: 'System Maintenance - Password Update Required',
        body: `
Hello,

As part of our routine system maintenance, all users are required to update their passwords.

Please click the link below to update your password:
[MALICIOUS_LINK]

This must be completed by end of business today to maintain access to company systems.

IT Support Team
        `,
        senderName: 'IT Support',
        senderEmail: 'itsupport@company-systems.net',
        attachments: [],
        phishingIndicators: [
          'Urgent deadline',
          'Password request via email',
          'Suspicious domain',
          'Generic signature'
        ],
        createdBy: admin.id,
      },
    ],
  })

  console.log('✅ Email templates created')

  // Create system settings
  await prisma.systemSettings.createMany({
    data: [
      { key: 'platform_name', value: 'Cybersecurity Awareness Platform' },
      { key: 'max_login_attempts', value: '5' },
      { key: 'session_timeout_minutes', value: '60' },
      { key: 'password_min_length', value: '8' },
      { key: 'enable_2fa', value: 'true' },
      { key: 'phishing_simulation_enabled', value: 'true' },
      { key: 'email_notifications_enabled', value: 'true' },
    ],
  })

  console.log('✅ System settings created')
  console.log('🎉 Database seeded successfully!')
  
  console.log('\n📋 Default Accounts Created:')
  console.log('Admin: admin@cybersecurity-platform.com / admin123!')
  console.log('Trainee 1: john.doe@example.com / trainee123!')
  console.log('Trainee 2: jane.smith@example.com / trainee123!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
