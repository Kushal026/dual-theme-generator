import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, ExternalLink, ArrowLeft, Filter, Award, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { format, parseISO, isAfter, isBefore } from 'date-fns';

interface Exam {
  id: string;
  name: string;
  description: string | null;
  exam_date: string | null;
  registration_start: string | null;
  registration_end: string | null;
  website: string | null;
  streams: string[] | null;
  exam_type: string | null;
}

interface Scholarship {
  id: string;
  name: string;
  description: string | null;
  eligibility: string | null;
  amount: string | null;
  deadline: string | null;
  website: string | null;
  streams: string[] | null;
}

interface TimelineTrackerProps {
  onBack?: () => void;
}

export const TimelineTracker: React.FC<TimelineTrackerProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'exams' | 'scholarships'>('exams');
  const [exams, setExams] = useState<Exam[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, profile } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [examsRes, scholarshipsRes] = await Promise.all([
      supabase.from('exams').select('*').order('exam_date', { ascending: true, nullsFirst: false }),
      supabase.from('scholarships').select('*').order('deadline', { ascending: true, nullsFirst: false })
    ]);

    if (examsRes.data) setExams(examsRes.data);
    if (scholarshipsRes.data) setScholarships(scholarshipsRes.data);
    setLoading(false);
  };

  const getExamStatus = (exam: Exam) => {
    const now = new Date();
    if (exam.registration_start && exam.registration_end) {
      const start = parseISO(exam.registration_start);
      const end = parseISO(exam.registration_end);
      if (isAfter(now, start) && isBefore(now, end)) return 'active';
      if (isBefore(now, start)) return 'upcoming';
    }
    return 'upcoming';
  };

  const categories = ['All', 'Science', 'Commerce', 'Arts', 'entrance', 'competitive'];

  const filteredExams = exams.filter(exam => {
    if (selectedCategory === 'All') return true;
    if (['entrance', 'competitive'].includes(selectedCategory)) {
      return exam.exam_type === selectedCategory;
    }
    return exam.streams?.includes(selectedCategory);
  });

  const filteredScholarships = scholarships.filter(scholarship => {
    if (selectedCategory === 'All') return true;
    if (['entrance', 'competitive'].includes(selectedCategory)) return true;
    return scholarship.streams?.includes(selectedCategory);
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Science': 'badge-blue',
      'Commerce': 'badge-green',
      'Arts': 'badge-purple',
      'entrance': 'badge-orange',
      'competitive': 'badge-indigo'
    };
    return colors[category] || 'badge-blue';
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'TBA';
    try {
      return format(parseISO(dateStr), 'MMM d, yyyy');
    } catch {
      return dateStr;
    }
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Important Dates & Opportunities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track competitive exams, entrance tests, and scholarship deadlines for 2024-2025.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="bg-secondary rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'exams' 
                  ? 'bg-edu-blue text-primary-foreground shadow-lg' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Exams ({exams.length})
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'scholarships' 
                  ? 'bg-edu-blue text-primary-foreground shadow-lg' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <Award className="w-5 h-5" />
              Scholarships ({scholarships.length})
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center mb-4">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            <span className="text-foreground font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-edu-blue text-primary-foreground shadow-lg'
                    : 'bg-secondary text-foreground hover:bg-accent border border-border'
                }`}
              >
                {category === 'entrance' ? 'Entrance Exams' : 
                 category === 'competitive' ? 'Competitive Exams' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-blue text-primary-foreground rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">
              {activeTab === 'exams' 
                ? exams.filter(e => getExamStatus(e) === 'active').length
                : scholarships.filter(s => s.deadline && isAfter(parseISO(s.deadline), new Date())).length}
            </div>
            <div className="opacity-90">{activeTab === 'exams' ? 'Active Registrations' : 'Open Scholarships'}</div>
          </div>
          <div className="bg-gradient-green text-primary-foreground rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">
              {activeTab === 'exams' ? filteredExams.length : filteredScholarships.length}
            </div>
            <div className="opacity-90">Filtered Results</div>
          </div>
          <div className="bg-gradient-purple text-primary-foreground rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">
              {activeTab === 'exams' ? exams.length : scholarships.length}
            </div>
            <div className="opacity-90">Total {activeTab === 'exams' ? 'Exams' : 'Scholarships'}</div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-edu-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}

        {/* Exams List */}
        {!loading && activeTab === 'exams' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredExams.map((exam, index) => {
              const status = getExamStatus(exam);
              return (
                <div
                  key={exam.id}
                  className="card-elevated p-6 hover:shadow-glow transition-all border-l-4 border-edu-blue animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-edu-blue-light dark:bg-edu-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-8 h-8 text-edu-blue" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-bold text-foreground text-lg">{exam.name}</h3>
                            {exam.exam_type && (
                              <span className={getCategoryColor(exam.exam_type)}>
                                {exam.exam_type === 'entrance' ? 'Entrance' : 'Competitive'}
                              </span>
                            )}
                            {status === 'active' && (
                              <span className="badge-green animate-pulse">Open Now</span>
                            )}
                          </div>
                          {exam.description && (
                            <p className="text-muted-foreground text-sm mb-3">{exam.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm">
                            {exam.registration_start && exam.registration_end && (
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>Registration: {formatDate(exam.registration_start)} - {formatDate(exam.registration_end)}</span>
                              </div>
                            )}
                            {exam.exam_date && (
                              <div className="flex items-center text-foreground font-medium">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>Exam: {formatDate(exam.exam_date)}</span>
                              </div>
                            )}
                          </div>
                          {exam.streams && exam.streams.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {exam.streams.map((stream, idx) => (
                                <span key={idx} className="badge-purple text-xs">{stream}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {exam.website && (
                      <a
                        href={exam.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-edu-blue text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium whitespace-nowrap"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Scholarships List */}
        {!loading && activeTab === 'scholarships' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredScholarships.map((scholarship, index) => {
              const isOpen = scholarship.deadline ? isAfter(parseISO(scholarship.deadline), new Date()) : true;
              return (
                <div
                  key={scholarship.id}
                  className="card-elevated p-6 hover:shadow-glow transition-all border-l-4 border-edu-green animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-edu-green-light dark:bg-edu-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-8 h-8 text-edu-green" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-bold text-foreground text-lg">{scholarship.name}</h3>
                            {isOpen ? (
                              <span className="badge-green">Open</span>
                            ) : (
                              <span className="badge-red">Closed</span>
                            )}
                          </div>
                          {scholarship.description && (
                            <p className="text-muted-foreground text-sm mb-2">{scholarship.description}</p>
                          )}
                          {scholarship.eligibility && (
                            <p className="text-sm text-foreground mb-2">
                              <strong>Eligibility:</strong> {scholarship.eligibility}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm">
                            {scholarship.amount && (
                              <div className="text-edu-green font-semibold">
                                Amount: {scholarship.amount}
                              </div>
                            )}
                            {scholarship.deadline && (
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>Deadline: {formatDate(scholarship.deadline)}</span>
                              </div>
                            )}
                          </div>
                          {scholarship.streams && scholarship.streams.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {scholarship.streams.map((stream, idx) => (
                                <span key={idx} className="badge-purple text-xs">{stream}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {scholarship.website && (
                      <a
                        href={scholarship.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-edu-green text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium whitespace-nowrap"
                      >
                        <span>Apply Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && ((activeTab === 'exams' && filteredExams.length === 0) || 
          (activeTab === 'scholarships' && filteredScholarships.length === 0)) && (
          <div className="text-center py-12 card-elevated animate-fade-in">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-12 bg-edu-yellow-light dark:bg-edu-yellow/10 border border-edu-yellow/30 rounded-xl p-6 max-w-5xl mx-auto animate-fade-in">
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
