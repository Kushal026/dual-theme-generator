import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Brain, ArrowLeft } from 'lucide-react';
import { StreamExplorer } from './StreamExplorer';

interface AptitudeQuizProps {
  selectedClassLevel: '10th' | '12th' | null;
  selectedStream: string | null;
  onBack?: () => void;
  onStreamChange?: (stream: string) => void;
}

export const AptitudeQuiz: React.FC<AptitudeQuizProps> = ({ selectedClassLevel, selectedStream, onBack, onStreamChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendedStream, setRecommendedStream] = useState('');
  const [showStreamExplorer, setShowStreamExplorer] = useState(false);

  const questions10th = [
    {
      question: "Which of these activities excites you the most?",
      options: [
        "Solving mathematical problems and puzzles",
        "Managing money, budgets, or business ideas",
        "Reading books, writing stories, or learning languages",
        "Creating art, music, or designing things"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Arts']
    },
    {
      question: "What are you naturally good at?",
      options: [
        "Understanding how things work (machines, experiments)",
        "Planning and organizing events or activities",
        "Communicating and expressing ideas creatively",
        "Analyzing data and solving logical problems"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Science']
    },
    {
      question: "Which subject interests you the most?",
      options: [
        "Mathematics and Science (Physics, Chemistry, Biology)",
        "Economics and Business Studies",
        "History, Geography, and Languages",
        "Computer Science and Technology"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Science']
    },
    {
      question: "What kind of career appeals to you?",
      options: [
        "Engineer, Doctor, Scientist, or IT Professional",
        "Businessman, Banker, Accountant, or Entrepreneur",
        "Teacher, Lawyer, Journalist, or Social Worker",
        "Designer, Artist, Writer, or Psychologist"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Arts']
    },
    {
      question: "How do you prefer to learn new things?",
      options: [
        "Through experiments, practicals, and hands-on work",
        "Through case studies, real-world examples, and data",
        "Through reading, discussions, and presentations",
        "Through visual aids, creativity, and self-expression"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Arts']
    },
    {
      question: "What type of problems do you enjoy solving?",
      options: [
        "Technical and scientific challenges",
        "Business and financial problems",
        "Social and philosophical questions",
        "Creative and design challenges"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Arts']
    },
    {
      question: "Which extracurricular activity would you choose?",
      options: [
        "Science club, Robotics, or Coding",
        "Business club, Stock market simulation, or Entrepreneurship",
        "Debate club, Drama, or Literature",
        "Art club, Music, or Photography"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Arts']
    },
    {
      question: "What's your ideal work environment in the future?",
      options: [
        "Laboratory, Hospital, or Tech company",
        "Corporate office, Bank, or Own business",
        "School, Court, Media house, or NGO",
        "Studio, Gallery, or Creative agency"
      ],
      streamMap: ['Science', 'Commerce', 'Arts', 'Arts']
    }
  ];

  const questions12th = [
    {
      question: "What kind of activities do you enjoy most?",
      options: [
        "Solving mathematical problems and puzzles",
        "Reading and writing stories",
        "Building or fixing things",
        "Helping and interacting with people"
      ]
    },
    {
      question: "Which subject interests you the most?",
      options: [
        "Mathematics and Science",
        "Literature and Languages",
        "Arts and Design",
        "Business and Economics"
      ]
    },
    {
      question: "What's your ideal work environment?",
      options: [
        "Laboratory or technical workspace",
        "Office with creative freedom",
        "Outdoor or hands-on setting",
        "Collaborative team environment"
      ]
    }
  ];

  const questions = selectedClassLevel === '10th' ? questions10th : questions12th;

  const calculateRecommendation = () => {
    if (selectedClassLevel === '10th') {
      const streamCounts: { [key: string]: number } = {
        'Science': 0,
        'Commerce': 0,
        'Arts': 0
      };

      answers.forEach((answerIndex, questionIndex) => {
        const stream = questions10th[questionIndex].streamMap[answerIndex];
        streamCounts[stream]++;
      });

      const recommended = Object.entries(streamCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setRecommendedStream(recommended);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendation();
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setRecommendedStream('');
  };

  if (showResults) {
    return (
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-edu-blue hover:text-edu-blue-dark mb-6 font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            )}

            <div className="card-elevated p-8 animate-fade-in">
              <div className="text-center mb-8">
                <CheckCircle className="w-20 h-20 text-edu-green mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">Assessment Complete!</h2>
                {selectedClassLevel === '10th' ? (
                  <>
                    <div className="bg-gradient-primary text-primary-foreground rounded-xl p-6 mb-6">
                      <h3 className="text-2xl font-bold mb-2">Recommended Stream</h3>
                      <p className="text-4xl font-bold mb-2">{recommendedStream}</p>
                      <p className="opacity-90">This stream aligns best with your interests and strengths</p>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Based on your responses, {recommendedStream} stream is the most suitable choice for you after 10th class.
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground mb-6">Based on your responses, here are your recommended paths:</p>
                )}
              </div>

              {selectedClassLevel === '10th' ? (
                <div className="space-y-4 mb-8">
                  <div className="p-6 bg-edu-blue-light rounded-lg border-2 border-edu-blue/30">
                    <h3 className="font-bold text-foreground text-xl mb-2">Why {recommendedStream}?</h3>
                    {recommendedStream === 'Science' && (
                      <ul className="text-foreground/80 space-y-2 text-left">
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-blue mt-1">✓</span>
                          <span>Strong analytical and problem-solving abilities</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-blue mt-1">✓</span>
                          <span>Interest in how things work and scientific exploration</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-blue mt-1">✓</span>
                          <span>Opens doors to Engineering, Medical, Research careers</span>
                        </li>
                      </ul>
                    )}
                    {recommendedStream === 'Commerce' && (
                      <ul className="text-foreground/80 space-y-2 text-left">
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-green mt-1">✓</span>
                          <span>Strong business acumen and financial understanding</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-green mt-1">✓</span>
                          <span>Interest in economics, trade, and entrepreneurship</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-green mt-1">✓</span>
                          <span>Path to CA, Banking, Business Management careers</span>
                        </li>
                      </ul>
                    )}
                    {recommendedStream === 'Arts' && (
                      <ul className="text-foreground/80 space-y-2 text-left">
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-purple mt-1">✓</span>
                          <span>Creative thinking and excellent communication skills</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-purple mt-1">✓</span>
                          <span>Interest in humanities, social sciences, and creativity</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-edu-purple mt-1">✓</span>
                          <span>Leads to Law, Psychology, Journalism, Design careers</span>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="p-4 bg-edu-yellow-light rounded-lg border border-edu-yellow/30">
                    <h4 className="font-semibold text-foreground mb-2">Next Steps:</h4>
                    <ol className="text-foreground/80 space-y-1 text-left list-decimal list-inside">
                      <li>Research colleges offering {recommendedStream} stream</li>
                      <li>Explore entrance exams and preparation requirements</li>
                      <li>Visit our college directory for more information</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-edu-blue-light rounded-lg">
                    <h3 className="font-bold text-foreground">Top Match: Engineering & Technology</h3>
                    <p className="text-muted-foreground text-sm">Your analytical skills suggest a strong fit for technical careers.</p>
                  </div>
                  <div className="p-4 bg-edu-green-light rounded-lg">
                    <h3 className="font-bold text-foreground">Alternative: Business & Management</h3>
                    <p className="text-muted-foreground text-sm">Your problem-solving abilities align well with business roles.</p>
                  </div>
                </div>
              )}

              {selectedClassLevel === '10th' && (
                <div className="bg-secondary border-2 border-border rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-foreground mb-3 text-lg">What would you like to do next?</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('navigateToColleges'))}
                      className="w-full btn-primary text-left flex items-center justify-between"
                    >
                      <span>Continue with {recommendedStream} Stream</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowStreamExplorer(true)}
                      className="w-full btn-secondary text-left flex items-center justify-between"
                    >
                      <span>Explore Other Stream Options</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleRestart}
                      className="w-full btn-ghost text-left flex items-center justify-between"
                    >
                      <span>Retake Assessment</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {selectedClassLevel !== '10th' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('navigateToColleges'))}
                    className="flex-1 btn-primary"
                  >
                    Explore Colleges & Programs
                  </button>
                  <button
                    onClick={handleRestart}
                    className="flex-1 btn-secondary"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <StreamExplorer
          isOpen={showStreamExplorer}
          onClose={() => setShowStreamExplorer(false)}
          onSelectStream={(stream) => {
            setRecommendedStream(stream);
            if (onStreamChange) {
              onStreamChange(stream);
            }
          }}
          currentStream={recommendedStream}
        />
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-edu-blue hover:text-edu-blue-dark mb-6 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          )}

          <div className="mb-8 text-center animate-fade-in">
            <Brain className="w-12 h-12 text-edu-blue mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedClassLevel === '10th' ? 'Stream Selection Assessment' : 'Aptitude Assessment'}
            </h2>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            {selectedClassLevel === '10th' && (
              <p className="text-sm text-edu-blue mt-2">
                This assessment will help you choose the right stream for 11th-12th
              </p>
            )}
          </div>

          <div className="card-elevated p-8 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground mb-6">{questions[currentQuestion].question}</h3>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 border-2 border-border rounded-lg hover:border-edu-blue hover:bg-edu-blue-light transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground group-hover:text-edu-blue-dark">{option}</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-edu-blue group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
