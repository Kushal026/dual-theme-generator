import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AptitudeQuiz } from '../components/AptitudeQuiz';
import { CareerPaths } from '../components/CareerPaths';
import { CollegeDirectory } from '../components/CollegeDirectory';
import { TimelineTracker } from '../components/TimelineTracker';
import { Dashboard } from '../components/Dashboard';
import { AuthModal } from '../components/AuthModal';
import { LearnMore } from '../components/LearnMore';
import { SearchResults } from '../components/SearchResults';
import { realColleges } from '../data/realColleges';

const courses = [
  { name: "B.Tech Computer Science", stream: "Science", category: "Engineering", website: "https://www.aicte-india.org/" },
  { name: "MBBS", stream: "Science", category: "Medical", website: "https://www.nmc.org.in/" },
  { name: "B.Com", stream: "Commerce", category: "Business", website: "https://www.ugc.ac.in/" },
  { name: "LLB", stream: "Arts", category: "Law", website: "https://www.barcouncilofindia.org/" },
  { name: "BBA", stream: "Commerce", category: "Management", website: "https://www.aicte-india.org/" },
  { name: "B.A. English", stream: "Arts", category: "Liberal Arts", website: "https://www.ugc.ac.in/" },
];

const careers = [
  { name: "Software Engineer", stream: "Science", field: "Technology", website: "https://www.indeed.com/career/software-engineer/salaries" },
  { name: "Doctor", stream: "Science", field: "Medical", website: "https://www.nmc.org.in/" },
  { name: "Chartered Accountant", stream: "Commerce", field: "Finance", website: "https://www.icai.org/" },
  { name: "Lawyer", stream: "Arts", field: "Legal", website: "https://www.barcouncilofindia.org/" },
];

const scholarships = [
  { name: "National Scholarship Portal", eligibility: "All streams", amount: "₹50,000", website: "https://scholarships.gov.in/" },
  { name: "PM Scholarship Scheme", eligibility: "All streams", amount: "₹2,500/month", website: "https://www.desw.gov.in/" },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedClassLevel, setSelectedClassLevel] = useState<'10th' | '12th' | null>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({
    name: 'Priya Sharma',
    class: '12',
    stream: 'Science',
    location: 'Mumbai, Maharashtra'
  });

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentSection('dashboard');
    setShowAuthModal(false);
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      setCurrentSection('dashboard');
    } else {
      setCurrentSection('quiz');
    }
  };

  const handleClassSelection = (classLevel: '10th' | '12th', stream?: string) => {
    setSelectedClassLevel(classLevel);
    if (stream) {
      setSelectedStream(stream);
    }
    if (classLevel === '12th' && stream) {
      setCurrentSection('careers');
    } else {
      setCurrentSection('quiz');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const results: any[] = [];

    realColleges.forEach(college => {
      if (
        college.name.toLowerCase().includes(lowerQuery) ||
        college.location.toLowerCase().includes(lowerQuery) ||
        college.city.toLowerCase().includes(lowerQuery) ||
        college.state.toLowerCase().includes(lowerQuery) ||
        college.category?.toLowerCase().includes(lowerQuery) ||
        college.stream?.toLowerCase().includes(lowerQuery) ||
        college.courses.some(course => course.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          type: 'college',
          title: college.name,
          description: `${college.category} college in ${college.city}, ${college.state}`,
          website: `https://${college.website}`,
          details: {
            location: `${college.city}, ${college.state}`,
            fees: college.fees,
            rating: college.rating,
            type: college.type
          }
        });
      }
    });

    courses.forEach(course => {
      if (
        course.name.toLowerCase().includes(lowerQuery) ||
        course.category.toLowerCase().includes(lowerQuery) ||
        course.stream.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'course',
          title: course.name,
          description: `${course.stream} stream - ${course.category} program`,
          website: course.website
        });
      }
    });

    careers.forEach(career => {
      if (
        career.name.toLowerCase().includes(lowerQuery) ||
        career.field.toLowerCase().includes(lowerQuery) ||
        career.stream.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'career',
          title: career.name,
          description: `${career.field} career for ${career.stream} students`,
          website: career.website
        });
      }
    });

    scholarships.forEach(scholarship => {
      if (
        scholarship.name.toLowerCase().includes(lowerQuery) ||
        scholarship.eligibility.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'scholarship',
          title: scholarship.name,
          description: `${scholarship.eligibility} - Up to ${scholarship.amount}`,
          website: scholarship.website
        });
      }
    });

    setSearchResults(results);
    setShowSearchResults(true);
  };

  useEffect(() => {
    const handleNavigateToColleges = () => {
      setCurrentSection('colleges');
    };

    window.addEventListener('navigateToColleges', handleNavigateToColleges as EventListener);
    return () => window.removeEventListener('navigateToColleges', handleNavigateToColleges as EventListener);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} onClassSelection={handleClassSelection} onSectionChange={setCurrentSection} />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard user={user} /> : <Hero onGetStarted={handleGetStarted} onClassSelection={handleClassSelection} onSectionChange={setCurrentSection} />;
      case 'quiz':
        return <AptitudeQuiz
          selectedClassLevel={selectedClassLevel}
          selectedStream={selectedStream}
          onBack={() => setCurrentSection('home')}
          onStreamChange={(stream) => setSelectedStream(stream)}
        />;
      case 'careers':
        return <CareerPaths selectedClassLevel={selectedClassLevel} selectedStream={selectedStream} />;
      case 'colleges':
        return <CollegeDirectory
          selectedClassLevel={selectedClassLevel}
          selectedStream={selectedStream}
        />;
      case 'timeline':
        return <TimelineTracker onBack={() => setCurrentSection('home')} />;
      case 'learnmore':
        return <LearnMore onBack={() => setCurrentSection('home')} />;
      default:
        return <Hero onGetStarted={handleGetStarted} onClassSelection={handleClassSelection} onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowAuthModal(true)}
        user={user}
        onSearch={handleSearch}
      />
      {renderSection()}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      <SearchResults
        isOpen={showSearchResults}
        onClose={() => setShowSearchResults(false)}
        results={searchResults}
        searchQuery={searchQuery}
        onNavigate={(section) => setCurrentSection(section)}
      />

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-edu-blue to-edu-purple bg-clip-text text-transparent mb-4">EduPath</h3>
              <p className="text-muted-foreground">
                Your trusted guide to making informed career and education decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setCurrentSection('quiz')}>Aptitude Assessment</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setCurrentSection('careers')}>Career Guidance</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setCurrentSection('colleges')}>College Directory</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setCurrentSection('timeline')}>Timeline Tracker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => setCurrentSection('learnmore')}>Learn More</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: edupath@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 EduPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
