import React from 'react';
import { X, BookOpen, Beaker, LineChart, Palette } from 'lucide-react';

interface StreamExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStream: (stream: string) => void;
  currentStream: string;
}

export const StreamExplorer: React.FC<StreamExplorerProps> = ({
  isOpen,
  onClose,
  onSelectStream,
  currentStream
}) => {
  if (!isOpen) return null;

  const streams = [
    {
      name: 'Science',
      icon: Beaker,
      description: 'For students interested in engineering, medical, research, and technology careers',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
      careers: ['Engineer', 'Doctor', 'Scientist', 'IT Professional', 'Researcher'],
      colorClass: 'bg-edu-blue',
      lightBg: 'bg-edu-blue-light',
      textColor: 'text-edu-blue'
    },
    {
      name: 'Commerce',
      icon: LineChart,
      description: 'For students interested in business, finance, accounting, and entrepreneurship',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
      careers: ['CA', 'Banker', 'Financial Analyst', 'Entrepreneur', 'Manager'],
      colorClass: 'bg-edu-green',
      lightBg: 'bg-edu-green-light',
      textColor: 'text-edu-green'
    },
    {
      name: 'Arts',
      icon: Palette,
      description: 'For students interested in humanities, law, journalism, and creative fields',
      subjects: ['History', 'Political Science', 'Psychology', 'Sociology', 'Languages'],
      careers: ['Lawyer', 'Journalist', 'Teacher', 'Psychologist', 'Civil Servant'],
      colorClass: 'bg-edu-purple',
      lightBg: 'bg-edu-purple-light',
      textColor: 'text-edu-purple'
    }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-edu-blue" />
            <h2 className="text-2xl font-bold text-foreground">Explore All Streams</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {streams.map((stream) => (
            <div
              key={stream.name}
              className={`rounded-xl border-2 overflow-hidden transition-all ${
                currentStream === stream.name ? 'border-edu-blue shadow-glow' : 'border-border hover:border-edu-blue/50'
              }`}
            >
              <div className={`${stream.colorClass} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <stream.icon className="w-8 h-8 text-primary-foreground" />
                    <h3 className="text-xl font-bold text-primary-foreground">{stream.name} Stream</h3>
                  </div>
                  {currentStream === stream.name && (
                    <span className="bg-card/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 bg-card">
                <p className="text-muted-foreground mb-4">{stream.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className={`font-semibold ${stream.textColor} mb-2`}>Key Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className={`${stream.lightBg} ${stream.textColor} px-3 py-1 rounded-full text-sm`}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${stream.textColor} mb-2`}>Career Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.careers.map((career, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectStream(stream.name);
                    onClose();
                  }}
                  className={`${stream.colorClass} text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-all font-medium`}
                >
                  Select {stream.name} Stream
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
