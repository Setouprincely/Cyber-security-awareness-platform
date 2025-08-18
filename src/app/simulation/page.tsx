'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';

export default function SimulationPage() {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Phishing Simulation Training
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="col-span-2"
          >
            <Card className="p-6 border-2 border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur">
              <h2 className="text-2xl font-semibold mb-4">Current Simulation</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-400">Active Scenario</Badge>
                  <span className="text-sm text-gray-400">Difficulty: Intermediate</span>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">From: security@companyx-verify.com</p>
                      <p className="font-medium">Account Security Alert - Action Required</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300">
                    Dear User,<br /><br />
                    We detected unusual activity on your account. Please verify your identity
                    by clicking the link below to prevent account suspension.<br /><br />
                    [Suspicious Link]
                  </p>
                  
                  <div className="flex gap-4">
                    <Button variant="danger">
                      Mark as Phishing
                    </Button>
                    <Button variant="outline">
                      Mark as Legitimate
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 border-2 border-green-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
              <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Accuracy Rate</span>
                  <span className="text-green-400">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 border-2 border-purple-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
              <h3 className="text-xl font-semibold mb-4">Tips & Hints</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Check sender email addresses carefully</li>
                <li>• Look for urgency or pressure tactics</li>
                <li>• Hover over links before clicking</li>
                <li>• Check for grammar and spelling errors</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
