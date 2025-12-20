import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AptitudeQuiz } from '../components/AptitudeQuiz';
import { CareerPaths } from '../components/CareerPaths';
import { CollegeDirectory } from '../components/CollegeDirectory';
import { TimelineTracker } from '../components/TimelineTracker';
import { Dashboard } from '../components/Dashboard';
import { LearnMore } from '../components/LearnMore';
import { SearchResults } from '../components/SearchResults';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedClassLevel, setSelectedClassLevel] = useState<'10th' | '12th' | null>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, profile } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
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
    setSearchResults([]);
    setShowSearchResults(true);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} onClassSelection={handleClassSelection} onSectionChange={setCurrentSection} />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard onSectionChange={setCurrentSection} /> : <Hero onGetStarted={handleGetStarted} onClassSelection={handleClassSelection} onSectionChange={setCurrentSection} />;
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
        return <CollegeDirectory selectedClassLevel={selectedClassLevel} selectedStream={selectedStream} />;
      case 'favorites':
        return <CollegeDirectory showFavoritesOnly={true} />;
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
      <Header onSearch={handleSearch} onSectionChange={setCurrentSection} />
      {renderSection()}

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
              <p className="text-muted-foreground">Your trusted guide to making informed career and education decisions.</p>
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
