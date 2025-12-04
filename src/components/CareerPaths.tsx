import React, { useState } from 'react';
import { ArrowRight, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

interface CareerPath {
  stream: string;
  degrees: string[];
  careers: string[];
  exams: string[];
  color: string;
  forClass: '10th' | '12th' | 'both';
  description: string;
}

interface CareerPathsProps {
  selectedClassLevel: '10th' | '12th' | null;
  selectedStream: string | null;
}

const allCareerPaths: CareerPath[] = [
  {
    stream: 'Science Stream (11th-12th)',
    degrees: ['Science with PCM', 'Science with PCB', 'Science with PCMB', 'Diploma in Engineering', 'Polytechnic Courses'],
    careers: ['Prepare for Engineering', 'Prepare for Medical', 'Research Fields', 'Technical Jobs', 'Laboratory Technician'],
    exams: ['JEE Main preparation', 'NEET preparation', 'State Polytechnic Entrance', 'Diploma Entrance Exams'],
    color: 'blue',
    forClass: '10th',
    description: 'Choose Science stream to pursue engineering, medical, or research careers'
  },
  {
    stream: 'Commerce Stream (11th-12th)',
    degrees: ['Commerce with Math', 'Commerce without Math', 'Business Studies', 'Vocational Commerce'],
    careers: ['Banking Preparation', 'Business Fields', 'Accounting', 'Finance Sector', 'Entrepreneurship'],
    exams: ['CA Foundation preparation', 'Commerce entrance exams', 'Banking exam preparation'],
    color: 'green',
    forClass: '10th',
    description: 'Choose Commerce stream for business, finance, and entrepreneurship opportunities'
  },
  {
    stream: 'Arts/Humanities (11th-12th)',
    degrees: ['Arts with Languages', 'Arts with Social Sciences', 'Fine Arts', 'Applied Arts'],
    careers: ['Teaching', 'Civil Services', 'Journalism', 'Social Work', 'Creative Fields'],
    exams: ['CUET preparation', 'State entrance exams', 'Fine Arts entrance'],
    color: 'purple',
    forClass: '10th',
    description: 'Choose Arts stream for creative, social, and administrative career paths'
  },
  {
    stream: 'Vocational & Technical',
    degrees: ['ITI Courses', 'Diploma Courses', 'Skill Development Programs', 'Trade Certificates'],
    careers: ['Skilled Technician', 'Craftsperson', 'Technical Assistant', 'Self-Employment', 'Industry Jobs'],
    exams: ['ITI Entrance', 'Polytechnic Entrance', 'Skill Certification Tests'],
    color: 'orange',
    forClass: '10th',
    description: 'Choose vocational training for immediate job opportunities and skill-based careers'
  },
  {
    stream: 'Science',
    degrees: ['B.Tech/B.E.', 'MBBS', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Pharma', 'B.Arch'],
    careers: ['Software Engineer', 'Doctor', 'Research Scientist', 'Data Scientist', 'Pharmacist', 'Architect'],
    exams: ['JEE Main/Advanced', 'NEET', 'GATE', 'CSIR-NET', 'IIT JAM', 'NATA'],
    color: 'blue',
    forClass: '12th',
    description: 'Advanced science programs leading to technical and medical careers'
  },
  {
    stream: 'Commerce',
    degrees: ['B.Com', 'BBA', 'B.Com (H)', 'BCA', 'B.Sc. Economics', 'BMS'],
    careers: ['Chartered Accountant', 'Business Analyst', 'Financial Advisor', 'Bank Manager', 'Investment Banker'],
    exams: ['CA Foundation', 'CS Executive', 'CMA', 'CLAT', 'MAT', 'CAT'],
    color: 'green',
    forClass: '12th',
    description: 'Business and commerce programs for finance and management careers'
  },
  {
    stream: 'Arts',
    degrees: ['B.A. English', 'B.A. History', 'B.A. Political Science', 'B.A. Psychology', 'B.A. Economics'],
    careers: ['Journalist', 'Teacher', 'Civil Servant', 'Social Worker', 'Content Writer', 'Counselor'],
    exams: ['UPSC', 'SSC', 'UGC-NET', 'State PSC', 'CLAT', 'JMI Mass Comm'],
    color: 'purple',
    forClass: '12th',
    description: 'Liberal arts and humanities programs for diverse career opportunities'
  },
  {
    stream: 'Technology',
    degrees: ['BCA', 'B.Tech IT', 'B.Sc. Computer Science', 'B.Sc. IT', 'B.Tech CSE', 'B.Tech AI/ML'],
    careers: ['Software Developer', 'Web Developer', 'Mobile App Developer', 'AI/ML Engineer', 'Data Analyst'],
    exams: ['JEE Main', 'State CET', 'NIMCET', 'BCA Entrance', 'BITSAT'],
    color: 'indigo',
    forClass: '12th',
    description: 'Technology and computer science programs for IT industry careers'
  }
];

export const CareerPaths: React.FC<CareerPathsProps> = ({ selectedClassLevel, selectedStream }) => {
  const [expandedStream, setExpandedStream] = useState<string | null>(null);

  let careerPaths;

  if (selectedClassLevel === '12th' && selectedStream) {
    careerPaths = allCareerPaths.filter(path =>
      path.forClass === '12th' &&
      path.stream.toLowerCase().includes(selectedStream.toLowerCase())
    );
  } else {
    careerPaths = allCareerPaths.filter(path =>
      path.forClass === 'both' ||
      path.forClass === selectedClassLevel ||
      selectedClassLevel === null
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; lightBg: string }> = {
      blue: { bg: 'bg-edu-blue', text: 'text-edu-blue', border: 'border-edu-blue', lightBg: 'bg-edu-blue-light' },
      green: { bg: 'bg-edu-green', text: 'text-edu-green', border: 'border-edu-green', lightBg: 'bg-edu-green-light' },
      purple: { bg: 'bg-edu-purple', text: 'text-edu-purple', border: 'border-edu-purple', lightBg: 'bg-edu-purple-light' },
      orange: { bg: 'bg-edu-orange', text: 'text-edu-orange', border: 'border-edu-orange', lightBg: 'bg-edu-orange-light' },
      red: { bg: 'bg-edu-red', text: 'text-edu-red', border: 'border-edu-red', lightBg: 'bg-edu-red-light' },
      indigo: { bg: 'bg-edu-indigo', text: 'text-edu-indigo', border: 'border-edu-indigo', lightBg: 'bg-edu-indigo-light' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {selectedClassLevel === '10th' ? 'Choose Your Stream for 11th-12th' :
              selectedClassLevel === '12th' ?
                (selectedStream ? `Career Opportunities for ${selectedStream} Stream Students` : 'Explore Degree Programs') :
                'Explore Career Pathways'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {selectedClassLevel === '10th' ? 'Select the right stream after 10th class to align with your career goals.' :
              selectedClassLevel === '12th' ?
                (selectedStream ? `Based on your ${selectedStream} background, here are the best opportunities for you.` : 'Choose the perfect degree program based on your 12th class background.') :
                'Discover the journey from choosing your stream to building a successful career.'}
          </p>

          {selectedClassLevel === '12th' && selectedStream && (
            <div className="mt-6 bg-gradient-hero rounded-xl p-6 max-w-3xl mx-auto border border-border">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-edu-blue text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedStream} Stream Graduate
                </div>
              </div>
              <p className="text-edu-blue font-semibold text-lg mb-2">
                🎓 Personalized Recommendations for {selectedStream} Students
              </p>
              <p className="text-muted-foreground text-sm">
                These programs are specifically curated based on your {selectedStream} background and current industry demands.
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {careerPaths.map((path, index) => {
            const colors = getColorClasses(path.color);
            return (
              <div
                key={index}
                className={`card-elevated border-2 transition-all cursor-pointer animate-fade-in ${expandedStream === path.stream
                    ? `${colors.border} shadow-glow transform scale-105`
                    : 'border-border hover:shadow-elevated'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setExpandedStream(expandedStream === path.stream ? null : path.stream)}
              >
                <div className={`${colors.bg} p-6 rounded-t-xl`}>
                  <h3 className="text-xl font-bold text-primary-foreground">{path.stream} Stream</h3>
                  <p className="text-primary-foreground/90 mt-2">{path.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <GraduationCap className={`w-5 h-5 ${colors.text}`} />
                        <h4 className="font-semibold text-foreground">Degree Options</h4>
                      </div>
                      <div className="space-y-2">
                        {path.degrees.slice(0, expandedStream === path.stream ? path.degrees.length : 3).map((degree, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-secondary text-foreground px-3 py-1 rounded-full text-sm mr-2 mb-2"
                          >
                            {degree}
                          </span>
                        ))}
                      </div>
                    </div>

                    {expandedStream === path.stream && (
                      <>
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Briefcase className={`w-5 h-5 ${colors.text}`} />
                            <h4 className="font-semibold text-foreground">Career Opportunities</h4>
                          </div>
                          <div className="space-y-2">
                            {path.careers.map((career, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{career}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <BookOpen className={`w-5 h-5 ${colors.text}`} />
                            <h4 className="font-semibold text-foreground">Competitive Exams</h4>
                          </div>
                          <div className="space-y-2">
                            {path.exams.map((exam, idx) => (
                              <span
                                key={idx}
                                className={`inline-block border ${colors.border} ${colors.text} px-3 py-1 rounded-full text-sm mr-2 mb-2`}
                              >
                                {exam}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-secondary rounded-xl p-8 max-w-4xl mx-auto border border-border">
            {selectedClassLevel === '10th' ? (
              <>
                <h3 className="text-2xl font-bold text-foreground mb-4">Need Personalized Guidance?</h3>
                <p className="text-muted-foreground mb-6">
                  Take our aptitude quiz to get customized recommendations based on your interests and strengths.
                </p>
                <button className="btn-primary inline-flex items-center space-x-2">
                  <span>Take Aptitude Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Take the Next Step?</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our college directory to find the best institutions for your chosen career path.
                </p>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('navigateToColleges', {
                    detail: { classLevel: selectedClassLevel, stream: selectedStream }
                  }))}
                  className="bg-edu-green text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium inline-flex items-center space-x-2"
                >
                  <span>Find Colleges</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
