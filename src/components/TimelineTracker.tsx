import React, { useState } from 'react';
import { Calendar, Clock, Bell, ExternalLink, ArrowLeft, Filter } from 'lucide-react';

interface TimelineTrackerProps {
  onBack?: () => void;
}

export const TimelineTracker: React.FC<TimelineTrackerProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const events = [
    {
      date: "Dec 15, 2024 - Jan 31, 2025",
      title: "JEE Main 2025 Session 1 Registration",
      category: "Engineering",
      description: "Registration for Joint Entrance Examination (Main) for admission to NITs, IIITs and other engineering colleges",
      link: "https://jeemain.nta.nic.in/",
      status: "upcoming",
      examDate: "January 22-31, 2025"
    },
    {
      date: "Dec 9, 2024 - Jan 9, 2025",
      title: "NEET 2025 Registration",
      category: "Medical",
      description: "National Eligibility cum Entrance Test for admission to MBBS, BDS and other medical courses across India",
      link: "https://neet.nta.nic.in/",
      status: "active",
      examDate: "May 4, 2025"
    },
    {
      date: "Jan 2025",
      title: "CBSE Class 12 Board Exams",
      category: "Board Exams",
      description: "Central Board of Secondary Education Class 12 annual examinations",
      link: "https://www.cbse.gov.in/",
      status: "upcoming",
      examDate: "February-March 2025"
    },
    {
      date: "Dec 2024 - Jan 2025",
      title: "CLAT 2025 Registration",
      category: "Law",
      description: "Common Law Admission Test for admission to National Law Universities",
      link: "https://consortiumofnlus.ac.in/",
      status: "active",
      examDate: "December 1, 2024"
    },
    {
      date: "Nov 2024 - Jan 2025",
      title: "NIFT 2025 Registration",
      category: "Design",
      description: "National Institute of Fashion Technology entrance exam for design programs",
      link: "https://www.nift.ac.in/",
      status: "active",
      examDate: "January 12, 2025"
    },
    {
      date: "Dec 2024",
      title: "CUET 2025 Registration Opens",
      category: "University",
      description: "Common University Entrance Test for admission to central universities",
      link: "https://cuet.samarth.ac.in/",
      status: "active",
      examDate: "May 2025"
    }
  ];

  const categories = ['All', 'Engineering', 'Medical', 'Law', 'Design', 'Board Exams', 'University'];

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'badge-blue',
      'Medical': 'badge-red',
      'Law': 'badge-purple',
      'Design': 'badge-orange',
      'Board Exams': 'badge-orange',
      'University': 'badge-indigo'
    };
    return colors[category] || 'badge-blue';
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-edu-blue hover:text-edu-blue-dark mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        )}

        <div className="text-center mb-12 animate-fade-in">
          <Calendar className="w-12 h-12 text-edu-blue mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Important Dates & Deadlines</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Never miss an important competitive exam date. Track all major entrance exams,
            registrations, and deadlines for 2024-2025 academic year.
          </p>
        </div>

        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-center mb-4">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            <span className="text-foreground font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                    ? 'bg-edu-blue text-primary-foreground shadow-lg'
                    : 'bg-secondary text-foreground hover:bg-accent border border-border'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-blue text-primary-foreground rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">{events.filter(e => e.status === 'active').length}</div>
            <div className="opacity-90">Active Registrations</div>
          </div>
          <div className="bg-gradient-green text-primary-foreground rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">{events.filter(e => e.status === 'upcoming').length}</div>
            <div className="opacity-90">Upcoming Deadlines</div>
          </div>
          <div className="bg-gradient-purple text-primary-foreground rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">{filteredEvents.length}</div>
            <div className="opacity-90">Total Events</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="card-elevated p-6 hover:shadow-glow transition-all border-l-4 border-edu-blue animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-edu-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-8 h-8 text-edu-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-foreground text-lg">{event.title}</h3>
                          <span className={getCategoryColor(event.category)}>
                            {event.category}
                          </span>
                          {event.status === 'active' && (
                            <span className="badge-green animate-pulse">
                              Open Now
                            </span>
                          )}
                        </div>
                        <p className="text-foreground font-medium mb-2">{event.date}</p>
                        <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Exam: {event.examDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-edu-blue text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium whitespace-nowrap"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 card-elevated animate-fade-in">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try selecting a different category</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-edu-yellow-light border border-edu-yellow/30 rounded-xl p-6 max-w-5xl mx-auto animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-edu-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-edu-yellow" />
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2">Important Notes:</h4>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Dates are subject to change. Always verify with official websites</li>
                <li>• Register early to avoid last-minute technical issues</li>
                <li>• Keep all required documents ready before starting registration</li>
                <li>• Save application numbers and passwords securely</li>
                <li>• Check eligibility criteria carefully before applying</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
