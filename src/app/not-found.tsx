'use client';
'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-900">
      <div className="text-center space-y-8">
        <motion.div
          animate={{
            textShadow: [
              '2px 2px #ff0000',
              '-2px -2px #0000ff',
              '2px -2px #ff0000',
              '-2px 2px #0000ff',
              '2px 2px #ff0000',
            ],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="relative"
        >
          <h1 className="text-9xl font-bold text-white opacity-90">404</h1>
          <motion.div
            className="absolute inset-0 text-9xl font-bold text-red-500"
            animate={{
              x: [-2, 2, -2],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
          >
            404
          </motion.div>
          <motion.div
            className="absolute inset-0 text-9xl font-bold text-blue-500"
            animate={{
              x: [2, -2, 2],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              delay: 0.1,
            }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.p
          className="text-xl text-gray-400"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          SYSTEM_ERROR: Page not found in the matrix
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/">
            <Button
              variant="outline"
              className="border-blue-500 hover:bg-blue-500/20"
            >
              Return to Base
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
