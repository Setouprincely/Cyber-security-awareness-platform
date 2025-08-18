// User Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  isActive: boolean
  emailVerified?: Date
}

export enum UserRole {
  TRAINEE = 'TRAINEE',
  ADMIN = 'ADMIN'
}

// Authentication Types
export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Training Module Types
export interface TrainingModule {
  id: string
  title: string
  description: string
  content: string
  category: ModuleCategory
  difficulty: DifficultyLevel
  estimatedDuration: number // in minutes
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
  quiz?: Quiz
}

export enum ModuleCategory {
  PHISHING = 'PHISHING',
  PASSWORD_SECURITY = 'PASSWORD_SECURITY',
  SOCIAL_ENGINEERING = 'SOCIAL_ENGINEERING',
  DATA_PROTECTION = 'DATA_PROTECTION',
  SAFE_BROWSING = 'SAFE_BROWSING',
  INCIDENT_RESPONSE = 'INCIDENT_RESPONSE'
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

// Quiz Types
export interface Quiz {
  id: string
  moduleId: string
  title: string
  description?: string
  questions: QuizQuestion[]
  passingScore: number
  timeLimit?: number // in minutes
  createdAt: Date
  updatedAt: Date
}

export interface QuizQuestion {
  id: string
  question: string
  type: QuestionType
  options: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT'
}

// User Progress Types
export interface UserProgress {
  id: string
  userId: string
  moduleId: string
  status: ProgressStatus
  score?: number
  completedAt?: Date
  timeSpent: number // in minutes
  attempts: number
  createdAt: Date
  updatedAt: Date
}

export enum ProgressStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

// Phishing Simulation Types
export interface PhishingCampaign {
  id: string
  name: string
  description?: string
  emailTemplate: EmailTemplate
  targetUsers: string[]
  scheduledAt?: Date
  status: CampaignStatus
  createdAt: Date
  updatedAt: Date
  createdBy: string
  results?: CampaignResult[]
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  senderName: string
  senderEmail: string
  attachments?: string[]
  phishingIndicators: string[]
  createdAt: Date
  updatedAt: Date
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Campaign Results Types
export interface CampaignResult {
  id: string
  campaignId: string
  userId: string
  action: UserAction
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  additionalData?: Record<string, any>
}

export enum UserAction {
  EMAIL_OPENED = 'EMAIL_OPENED',
  LINK_CLICKED = 'LINK_CLICKED',
  ATTACHMENT_DOWNLOADED = 'ATTACHMENT_DOWNLOADED',
  CREDENTIALS_SUBMITTED = 'CREDENTIALS_SUBMITTED',
  REPORTED_PHISHING = 'REPORTED_PHISHING',
  IGNORED = 'IGNORED'
}

// Analytics Types
export interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  completedModules: number
  averageScore: number
  phishingClickRate: number
  reportingRate: number
  topVulnerableUsers: VulnerableUser[]
  moduleCompletionRates: ModuleStats[]
  campaignStats: CampaignStats[]
}

export interface VulnerableUser {
  userId: string
  userName: string
  email: string
  riskScore: number
  failedSimulations: number
  completedTraining: number
}

export interface ModuleStats {
  moduleId: string
  moduleName: string
  completionRate: number
  averageScore: number
  averageTime: number
}

export interface CampaignStats {
  campaignId: string
  campaignName: string
  totalTargets: number
  clickRate: number
  reportingRate: number
  completionDate: Date
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: Date
  actionUrl?: string
}

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  PHISHING_DETECTED = 'PHISHING_DETECTED',
  TRAINING_REMINDER = 'TRAINING_REMINDER',
  CAMPAIGN_SCHEDULED = 'CAMPAIGN_SCHEDULED'
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface FormError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: FormError[]
}
