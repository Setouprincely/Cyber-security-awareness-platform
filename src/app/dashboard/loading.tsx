import { GlassCard } from '@/components/ui/GlassCard'

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Welcome Header Skeleton */}
      <GlassCard className="h-32 p-6" variant="cyber">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-200 rounded-full" />
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-64" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </GlassCard>

      {/* Profile Summary Skeleton */}
      <GlassCard className="p-6" variant="cyber">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} className="p-6" variant="cyber">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-lg" />
              <div className="ml-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Skeleton */}
        <GlassCard className="p-6" variant="cyber">
          <div className="p-6 border-b border-cyber-blue/20">
            <div className="h-5 bg-gray-200 rounded w-32" />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    <div className="h-3 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Upcoming Training Skeleton */}
        <GlassCard className="p-6" variant="cyber">
          <div className="p-6 border-b border-cyber-blue/20">
            <div className="h-5 bg-gray-200 rounded w-40" />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-64 mb-2" />
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-16" />
                    <div className="h-6 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded w-full mt-4" />
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions Skeleton */}
      <GlassCard className="p-6" variant="cyber">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center space-y-2">
                <div className="h-8 w-8 bg-gray-200 rounded mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
                <div className="h-3 bg-gray-200 rounded w-20 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}