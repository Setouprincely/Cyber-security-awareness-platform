import { HTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  description?: string
  icon?: ReactNode
  showIcon?: boolean
  dismissible?: boolean
  onDismiss?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'info', 
    title,
    description,
    icon,
    showIcon = true,
    dismissible = false,
    onDismiss,
    children,
    ...props 
  }, ref) => {
    const variants = {
      info: {
        container: 'bg-blue-50 border-blue-200 text-blue-800',
        icon: 'text-blue-400',
        title: 'text-blue-800',
        description: 'text-blue-700',
      },
      success: {
        container: 'bg-green-50 border-green-200 text-green-800',
        icon: 'text-green-400',
        title: 'text-green-800',
        description: 'text-green-700',
      },
      warning: {
        container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        icon: 'text-yellow-400',
        title: 'text-yellow-800',
        description: 'text-yellow-700',
      },
      danger: {
        container: 'bg-red-50 border-red-200 text-red-800',
        icon: 'text-red-400',
        title: 'text-red-800',
        description: 'text-red-700',
      },
    }

    const defaultIcons = {
      info: Info,
      success: CheckCircle,
      warning: AlertCircle,
      danger: XCircle,
    }

    const IconComponent = icon || (showIcon ? defaultIcons[variant] : null)

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border p-4',
          variants[variant].container,
          className
        )}
        {...props}
      >
        <div className="flex">
          {IconComponent && (
            <div className="flex-shrink-0">
              {typeof IconComponent === 'function' ? (
                <IconComponent className={cn('h-5 w-5', variants[variant].icon)} />
              ) : (
                <div className={cn('h-5 w-5', variants[variant].icon)}>
                  {IconComponent}
                </div>
              )}
            </div>
          )}
          <div className={cn('ml-3 flex-1', !IconComponent && 'ml-0')}>
            {title && (
              <h3 className={cn('text-sm font-medium', variants[variant].title)}>
                {title}
              </h3>
            )}
            {description && (
              <div className={cn('mt-1 text-sm', variants[variant].description)}>
                {description}
              </div>
            )}
            {children && (
              <div className={cn('mt-2', variants[variant].description)}>
                {children}
              </div>
            )}
          </div>
          {dismissible && onDismiss && (
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className={cn(
                    'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                    variants[variant].icon,
                    'hover:bg-black hover:bg-opacity-10'
                  )}
                  onClick={onDismiss}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }
