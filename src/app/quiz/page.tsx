'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the most common type of phishing attack?",
    options: [
      "Email phishing",
      "Vishing",
      "Smishing",
      "Whaling"
    ],
    correctAnswer: 0
  },
  // Add more questions here
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResults(true);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setIsAnswerChecked(true);
  };

  const generateCertificate = () => {
    // TODO: Implement certificate generation
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Cybersecurity Assessment
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Progress</span>
            <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} />
          </div>
        </div>

        {!showResults ? (
          <Card className="p-6 border-2 border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </span>
                <span className="text-sm text-gray-400">Score: {score}</span>
              </div>

              <motion.h2
                key={currentQuestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-semibold"
              >
                {sampleQuestions[currentQuestion].question}
              </motion.h2>

              <div className="grid gap-4">
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      selectedAnswer === index
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-gray-800/50 border-2 border-transparent hover:border-gray-700'
                    } ${
                      isAnswerChecked
                        ? index === sampleQuestions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-500/20'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-500/20'
                          : ''
                        : ''
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                {!isAnswerChecked ? (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestion === sampleQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="p-6 border-2 border-green-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
              <h2 className="text-2xl font-semibold mb-4">Quiz Complete!</h2>
              <div className="space-y-4">
                <p className="text-xl">
                  Your score: {score} out of {sampleQuestions.length}
                  <span className="text-green-400 ml-2">
                    ({Math.round((score / sampleQuestions.length) * 100)}%)
                  </span>
                </p>
                <Button onClick={generateCertificate}>
                  Generate Certificate
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
