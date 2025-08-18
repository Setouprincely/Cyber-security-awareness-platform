'use client'

import { Toaster } from 'sonner'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        expand={true}
        richColors={false}
        closeButton={true}
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 35, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#E0E0E0',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.1)',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
          className: 'cyber-toast',
        }}
        theme="dark"
      />

      {/* Custom CSS for cyberpunk toast styling */}
      <style jsx global>{`
        .cyber-toast[data-type="success"] {
          border-color: #00FF41 !important;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.3) !important;
        }

        .cyber-toast[data-type="error"] {
          border-color: #FF073A !important;
          box-shadow: 0 0 20px rgba(255, 7, 58, 0.3) !important;
          animation: glitch-toast 0.3s ease-in-out;
        }

        .cyber-toast[data-type="info"] {
          border-color: #00D4FF !important;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.3) !important;
        }

        .cyber-toast[data-type="warning"] {
          border-color: #FF8C00 !important;
          box-shadow: 0 0 20px rgba(255, 140, 0, 0.3) !important;
        }

        @keyframes glitch-toast {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }

        .cyber-toast [data-close-button] {
          color: #E0E0E0;
          border: 1px solid rgba(0, 212, 255, 0.3);
          background: rgba(0, 212, 255, 0.1);
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .cyber-toast [data-close-button]:hover {
          background: rgba(0, 212, 255, 0.2);
          border-color: #00D4FF;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        .cyber-toast [data-icon] {
          filter: drop-shadow(0 0 5px currentColor);
        }
      `}</style>
    </>
  )
}
