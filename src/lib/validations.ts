import { z } from 'zod'

// Enhanced email validation with cybersecurity focus
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(255, 'Email is too long')
  .refine(
    (email) => {
      // Additional validation for common email patterns
      const domain = email.split('@')[1]?.toLowerCase()
      return domain && domain.includes('.')
    },
    'Please use a valid email domain'
  )

// Enhanced password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password is too long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)')

// Name validation
const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters long')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .refine(
    (name) => name.trim().length >= 2,
    'Name must contain at least 2 non-whitespace characters'
  )

// Role validation
export const UserRole = z.enum(['TRAINEE', 'ADMIN'], {
  errorMap: () => ({ message: 'Please select a valid role' })
})

// Enhanced login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Password is required')
    .max(128, 'Password is too long'),
  rememberMe: z.boolean().optional().default(false)
})

// Enhanced registration schema
export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role: UserRole.optional().default('TRAINEE'),
  terms: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms and conditions')
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

// Multi-step registration schemas
export const registrationStep1Schema = z.object({
  name: nameSchema,
  email: emailSchema
})

export const registrationStep2Schema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role: UserRole.optional().default('TRAINEE'),
  terms: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms and conditions')
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
)

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Enhanced forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema
})

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

export const validatePassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password)
    return true
  } catch {
    return false
  }
}

export const getPasswordStrength = (password: string): {
  score: number
  feedback: string[]
} => {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) score += 1
  else feedback.push('Use at least 8 characters')

  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Add lowercase letters')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Add uppercase letters')

  if (/\d/.test(password)) score += 1
  else feedback.push('Add numbers')

  if (/[@$!%*?&]/.test(password)) score += 1
  else feedback.push('Add special characters')

  if (password.length >= 12) score += 1

  return { score, feedback }
}

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Training module validation schemas
export const trainingModuleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.enum(['PHISHING', 'PASSWORD_SECURITY', 'SOCIAL_ENGINEERING', 'DATA_PROTECTION', 'SAFE_BROWSING', 'INCIDENT_RESPONSE']),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  estimatedDuration: z.number().min(1, 'Duration must be at least 1 minute').max(300, 'Duration cannot exceed 300 minutes'),
  isPublished: z.boolean().optional().default(false),
})

// Quiz validation schemas
export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  passingScore: z.number().min(0, 'Passing score must be at least 0').max(100, 'Passing score cannot exceed 100'),
  timeLimit: z.number().min(1, 'Time limit must be at least 1 minute').max(180, 'Time limit cannot exceed 180 minutes').optional(),
})

export const quizQuestionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters'),
  type: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'MULTIPLE_SELECT']),
  options: z.array(z.string().min(1, 'Option cannot be empty')).min(2, 'At least 2 options required'),
  correctAnswer: z.array(z.string().min(1, 'Correct answer cannot be empty')).min(1, 'At least one correct answer required'),
  explanation: z.string().optional(),
  points: z.number().min(1, 'Points must be at least 1').max(10, 'Points cannot exceed 10'),
})

// Email template validation schemas
export const emailTemplateSchema = z.object({
  name: z.string().min(3, 'Template name must be at least 3 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  body: z.string().min(20, 'Email body must be at least 20 characters'),
  senderName: z.string().min(2, 'Sender name must be at least 2 characters'),
  senderEmail: z.string().email('Invalid sender email address'),
  phishingIndicators: z.array(z.string()).optional().default([]),
})

// Phishing campaign validation schemas
export const phishingCampaignSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters'),
  description: z.string().optional(),
  emailTemplateId: z.string().min(1, 'Email template is required'),
  targetUsers: z.array(z.string()).min(1, 'At least one target user is required'),
  scheduledAt: z.date().optional(),
})

// User profile validation schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

// Notification validation schemas
export const notificationSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR', 'PHISHING_DETECTED', 'TRAINING_REMINDER', 'CAMPAIGN_SCHEDULED']),
  actionUrl: z.string().url('Invalid URL').optional(),
})

// Search and pagination schemas
export const paginationSchema = z.object({
  page: z.number().min(1, 'Page must be at least 1').optional().default(1),
  limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').optional().default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
})

// Analytics validation schemas
export const analyticsDateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
}).refine((data) => data.startDate <= data.endDate, {
  message: "Start date must be before or equal to end date",
  path: ["endDate"],
})

// File upload validation schemas
export const fileUploadSchema = z.object({
  file: z.any().refine((file) => {
    if (!file) return false
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    return allowedTypes.includes(file.type)
  }, 'Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed'),
  maxSize: z.number().optional().default(5 * 1024 * 1024), // 5MB default
})

// Badge validation schemas
export const badgeSchema = z.object({
  name: z.string().min(3, 'Badge name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon: z.string().min(1, 'Icon is required'),
  criteria: z.object({
    type: z.string(),
    count: z.number().optional(),
    category: z.string().optional(),
  }),
  points: z.number().min(0, 'Points must be at least 0'),
})

// System settings validation schemas
export const systemSettingSchema = z.object({
  key: z.string().min(1, 'Setting key is required'),
  value: z.string().min(1, 'Setting value is required'),
})

// Enhanced type exports for TypeScript
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type RegistrationStep1Data = z.infer<typeof registrationStep1Schema>
export type RegistrationStep2Data = z.infer<typeof registrationStep2Schema>
export type UserRoleType = z.infer<typeof UserRole>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type TrainingModuleInput = z.infer<typeof trainingModuleSchema>
export type QuizInput = z.infer<typeof quizSchema>
export type QuizQuestionInput = z.infer<typeof quizQuestionSchema>
export type EmailTemplateInput = z.infer<typeof emailTemplateSchema>
export type PhishingCampaignInput = z.infer<typeof phishingCampaignSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type NotificationInput = z.infer<typeof notificationSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
export type AnalyticsDateRangeInput = z.infer<typeof analyticsDateRangeSchema>
export type FileUploadInput = z.infer<typeof fileUploadSchema>
export type BadgeInput = z.infer<typeof badgeSchema>
export type SystemSettingInput = z.infer<typeof systemSettingSchema>
