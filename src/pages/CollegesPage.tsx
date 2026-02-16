import React, { useState } from 'react';
import { Header } from '../components/Header';
import { CollegeDirectory } from '../components/CollegeDirectory';
import { SearchResults } from '../components/SearchResults';
import { useNavigate } from 'react-router-dom';

const CollegesPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={(q) => { setSearchQuery(q); setShowSearchResults(true); }} />
      <CollegeDirectory />
      <SearchResults isOpen={showSearchResults} onClose={() => setShowSearchResults(false)} results={searchResults} searchQuery={searchQuery} onNavigate={(s) => navigate(`/${s === 'home' ? '' : s}`)} />
    </div>
  );
};

export default CollegesPage;
