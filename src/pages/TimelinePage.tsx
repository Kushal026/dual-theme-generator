import React, { useState } from 'react';
import { Header } from '../components/Header';
import { TimelineTracker } from '../components/TimelineTracker';
import { SearchResults } from '../components/SearchResults';
import { useNavigate } from 'react-router-dom';

const TimelinePage = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={(q) => { setSearchQuery(q); setShowSearchResults(true); }} />
      <TimelineTracker onBack={() => navigate('/')} />
      <SearchResults isOpen={showSearchResults} onClose={() => setShowSearchResults(false)} results={[]} searchQuery={searchQuery} onNavigate={(s) => navigate(`/${s === 'home' ? '' : s}`)} />
    </div>
  );
};

export default TimelinePage;
