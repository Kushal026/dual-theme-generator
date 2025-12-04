import React, { useState } from 'react';
import { ArrowRight, Target, MapPin, Calendar, GraduationCap, BookOpen, TrendingUp, Zap, Star, Globe } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onClassSelection: (classLevel: '10th' | '12th', stream?: string) => void;
  onSectionChange: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onClassSelection, onSectionChange }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showStreamSelection, setShowStreamSelection] = useState(false);
  const [selectedClass, setSelectedClass] = useState<'10th' | '12th' | null>(null);

  const handleClassSelection = (classLevel: '10th' | '12th') => {
    if (classLevel === '12th') {
      setSelectedClass(classLevel);
      setShowStreamSelection(true);
    } else {
      onClassSelection(classLevel);
    }
  };

  const handleStreamSelection = (stream: string) => {
    if (selectedClass) {
      onClassSelection(selectedClass, stream);
      setShowStreamSelection(false);
    }
  };

  const features = [
    {
      id: 'quiz',
      title: 'Aptitude Assessment',
      description: 'Discover your strengths and interests through personalized quizzes (Only for 10th completed Students)',
      icon: Target,
      colorClass: 'bg-edu-blue',
      lightBg: 'bg-edu-blue-light',
    },
    {
      id: 'careers',
      title: 'Career Mapping',
      description: 'Visualize career paths and opportunities for each stream',
      icon: TrendingUp,
      colorClass: 'bg-edu-green',
      lightBg: 'bg-edu-green-light',
    },
    {
      id: 'colleges',
      title: 'College Directory',
      description: 'Find colleges with detailed information',
      icon: MapPin,
      colorClass: 'bg-edu-purple',
      lightBg: 'bg-edu-purple-light',
    },
    {
      id: 'timeline',
      title: 'Timeline Tracker',
      description: 'Never miss important admission dates and deadlines',
      icon: Calendar,
      colorClass: 'bg-edu-orange',
      lightBg: 'bg-edu-orange-light',
    }
  ];

  const uniqueFeatures = [
    {
      title: 'AI-Powered Recommendations',
      description: 'Get personalized suggestions',
      icon: Zap,
      colorClass: 'text-edu-yellow',
      bgClass: 'bg-edu-yellow-light'
    },
    {
      title: 'Followed NEP Guidelines',
      description: 'Promotes personalized, flexible, and inclusive learning pathways',
      icon: Star,
      colorClass: 'text-edu-pink',
      bgClass: 'bg-edu-pink-light'
    },
    {
      title: 'National Opportunities',
      description: 'Explore education options',
      icon: Globe,
      colorClass: 'text-edu-teal',
      bgClass: 'bg-edu-teal-light'
    }
  ];

  if (showWelcome) {
    return (
      <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-edu-blue/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-edu-purple/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-edu-green/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-edu-orange/20 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-16 animate-fade-in">
              <div className="inline-flex items-center glass rounded-full px-6 py-3 mb-8 shadow-elevated">
                <GraduationCap className="w-6 h-6 text-edu-blue mr-2" />
                <span className="text-edu-blue font-semibold">Welcome to EduPath</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Your Journey to the
                <span className="bg-gradient-to-r from-edu-blue to-edu-purple bg-clip-text text-transparent"> Perfect Career</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                Discover your potential, explore career options, and find the perfect path
                that aligns with your interests and aspirations.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="group btn-primary text-lg shadow-glow"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => onSectionChange('learnmore')}
                  className="btn-secondary text-lg group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Learn More</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Why Choose EduPath */}
            <div className="card-elevated p-8 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-foreground mb-8">Why Choose EduPath?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {uniqueFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-2xl bg-secondary hover:shadow-elevated transition-all transform hover:scale-105 border border-border"
                  >
                    <div className={`w-12 h-12 rounded-full ${feature.bgClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${feature.colorClass}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-hero py-20">
      <div className="container mx-auto px-4">
        {/* Educational Stage Selection */}
        {!showStreamSelection ? (
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Educational Stage</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Select your current educational stage to get personalized career guidance and course recommendations.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <button
                onClick={() => handleClassSelection('10th')}
                className="group bg-gradient-blue text-primary-foreground p-8 rounded-2xl hover:shadow-glow transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">After 10th</div>
                  <div className="opacity-90 mb-4 text-lg">Choose your stream for 11th & 12th</div>
                  <div className="text-sm opacity-80 leading-relaxed">
                    • Science, Commerce, Arts streams<br />
                    • Diploma & Vocational courses<br />
                    • ITI & Polytechnic options
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleClassSelection('12th')}
                className="group bg-gradient-green text-primary-foreground p-8 rounded-2xl hover:shadow-glow transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4">After 12th</div>
                  <div className="opacity-90 mb-4 text-lg">Choose your degree program</div>
                  <div className="text-sm opacity-80 leading-relaxed">
                    • Bachelor's degree programs<br />
                    • Professional courses<br />
                    • Entrance exam preparation
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">What did you study in 12th Class?</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Select your 12th class stream to get personalized degree and career recommendations.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => handleStreamSelection('Science')}
                className="group bg-gradient-blue text-primary-foreground p-6 rounded-2xl hover:shadow-glow transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Science</div>
                  <div className="opacity-90 mb-3">PCM / PCB / PCMB</div>
                  <div className="text-sm opacity-80">
                    Physics, Chemistry, Math/Biology
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleStreamSelection('Commerce')}
                className="group bg-gradient-green text-primary-foreground p-6 rounded-2xl hover:shadow-glow transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Commerce</div>
                  <div className="opacity-90 mb-3">With/Without Math</div>
                  <div className="text-sm opacity-80">
                    Accountancy, Business Studies, Economics
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleStreamSelection('Arts')}
                className="group bg-gradient-purple text-primary-foreground p-6 rounded-2xl hover:shadow-glow transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Arts</div>
                  <div className="opacity-90 mb-3">Humanities</div>
                  <div className="text-sm opacity-80">
                    History, Political Science, Psychology
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowStreamSelection(false)}
              className="text-muted-foreground hover:text-foreground font-medium inline-flex items-center space-x-2 transition-colors"
            >
              <span>← Back to class selection</span>
            </button>
          </div>
        )}

        {/* Interactive Features Section */}
        <div className="max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Explore Our Features</h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group card-elevated overflow-hidden hover:shadow-glow transition-all transform hover:scale-[1.02]"
              >
                <div className={`h-2 ${feature.colorClass}`}></div>
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 rounded-2xl ${feature.colorClass} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                      <button
                        onClick={() => onSectionChange(feature.id)}
                        className={`${feature.colorClass} text-primary-foreground px-6 py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-medium`}
                      >
                        Explore Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-primary rounded-2xl shadow-elevated p-8 text-center text-primary-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl mb-8 opacity-90">Join thousands of students who found their perfect career path with EduPath</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowWelcome(false)}
                className="bg-card text-edu-blue px-8 py-4 rounded-xl hover:bg-secondary transition-all transform hover:scale-105 font-bold text-lg shadow-lg"
              >
                Get Started Now
              </button>
              <button
                onClick={() => onSectionChange('learnmore')}
                className="border-2 border-primary-foreground/50 text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary-foreground/10 transition-all transform hover:scale-105 font-bold text-lg"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
