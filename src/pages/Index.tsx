import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { SearchResults } from '../components/SearchResults';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults([]);
    setShowSearchResults(true);
  };

  const handleGetStarted = () => {
    navigate('/quiz');
  };

  const handleClassSelection = (classLevel: '10th' | '12th', stream?: string) => {
    if (classLevel === '12th' && stream) {
      navigate(`/careers?class=${classLevel}&stream=${stream}`);
    } else {
      navigate(`/quiz?class=${classLevel}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <Hero onGetStarted={handleGetStarted} onClassSelection={handleClassSelection} onSectionChange={(section) => navigate(`/${section === 'home' ? '' : section}`)} />

      <SearchResults
        isOpen={showSearchResults}
        onClose={() => setShowSearchResults(false)}
        results={searchResults}
        searchQuery={searchQuery}
        onNavigate={(section) => navigate(`/${section === 'home' ? '' : section}`)}
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
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/quiz')}>Aptitude Assessment</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/careers')}>Career Guidance</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/colleges')}>College Directory</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/timeline')}>Timeline Tracker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/learnmore')}>Learn More</li>
                <li className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/ai-advisor')}>AI Career Advisor</li>
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
