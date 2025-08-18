import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse'
  text?: string
  fullScreen?: boolean
}

const Loading = ({ 
  className, 
  size = 'md', 
  variant = 'spinner',
  text,
  fullScreen = false,
  ...props 
}: LoadingProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const renderSpinner = () => (
    <Loader2 className={cn('animate-spin text-primary-600', sizes[size])} />
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary-600 rounded-full animate-pulse',
            size === 'sm' && 'w-1 h-1',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-4 h-4'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div
      className={cn(
        'bg-primary-600 rounded-full animate-pulse',
        sizes[size]
      )}
    />
  )

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      default:
        return renderSpinner()
    }
  }

  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        fullScreen && 'min-h-screen',
        className
      )}
      {...props}
    >
      {renderVariant()}
      {text && (
        <p className={cn(
          'mt-2 text-gray-600',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
          size === 'xl' && 'text-lg'
        )}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

// Skeleton loading component
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'rectangular' | 'circular'
}

const Skeleton = ({ 
  className, 
  width, 
  height, 
  variant = 'rectangular',
  style,
  ...props 
}: SkeletonProps) => {
  const variants = {
    text: 'rounded',
    rectangular: 'rounded-md',
    circular: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variants[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  )
}

export { Loading, Skeleton }
