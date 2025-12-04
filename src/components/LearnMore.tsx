import React from 'react';
import { ArrowLeft, BookOpen, Target, Users, Award, Globe, Zap } from 'lucide-react';

interface LearnMoreProps {
  onBack: () => void;
}

export const LearnMore: React.FC<LearnMoreProps> = ({ onBack }) => {
  const features = [
    {
      icon: Target,
      title: 'Personalized Aptitude Assessment',
      description: 'Our scientifically designed aptitude tests help identify your strengths, interests, and ideal career paths based on your unique profile.',
      colorClass: 'bg-edu-blue',
      lightBg: 'bg-edu-blue-light',
      textColor: 'text-edu-blue'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Career Mapping',
      description: 'Explore detailed career roadmaps showing the journey from your current education level to your dream profession.',
      colorClass: 'bg-edu-green',
      lightBg: 'bg-edu-green-light',
      textColor: 'text-edu-green'
    },
    {
      icon: Users,
      title: 'Extensive College Directory',
      description: 'Access information about thousands of colleges across India with detailed insights on courses, fees, facilities, and placements.',
      colorClass: 'bg-edu-purple',
      lightBg: 'bg-edu-purple-light',
      textColor: 'text-edu-purple'
    },
    {
      icon: Award,
      title: 'Exam Timeline Tracker',
      description: 'Never miss important deadlines with our comprehensive tracker covering all major entrance exams and admission dates.',
      colorClass: 'bg-edu-orange',
      lightBg: 'bg-edu-orange-light',
      textColor: 'text-edu-orange'
    },
    {
      icon: Zap,
      title: 'AI-Powered Recommendations',
      description: 'Get intelligent suggestions tailored to your profile, academic background, and career aspirations.',
      colorClass: 'bg-edu-yellow',
      lightBg: 'bg-edu-yellow-light',
      textColor: 'text-edu-yellow'
    },
    {
      icon: Globe,
      title: 'NEP 2020 Aligned',
      description: 'Our guidance follows the National Education Policy 2020 framework, ensuring modern and flexible learning pathways.',
      colorClass: 'bg-edu-teal',
      lightBg: 'bg-edu-teal-light',
      textColor: 'text-edu-teal'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-edu-blue hover:text-edu-blue-dark mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About EduPath
            </h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive guide to making informed education and career decisions
            </p>
          </div>

          <div className="card-elevated p-8 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EduPath is dedicated to helping students navigate the complex landscape of education and career choices in India. 
              We believe every student deserves access to quality guidance regardless of their background or location.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform combines comprehensive data, intelligent algorithms, and user-friendly interfaces to provide 
              personalized recommendations that align with each student's unique strengths and aspirations.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-elevated p-6 hover:shadow-glow transition-all animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className={`w-14 h-14 ${feature.lightBg} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="opacity-90 mb-6">
              Join thousands of students who have found their perfect career path with EduPath
            </p>
            <button
              onClick={onBack}
              className="bg-card text-edu-blue px-8 py-3 rounded-xl hover:bg-secondary transition-all font-bold shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
