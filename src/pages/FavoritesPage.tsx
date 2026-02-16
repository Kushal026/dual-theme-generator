import React, { useState } from 'react';
import { Header } from '../components/Header';
import { CollegeDirectory } from '../components/CollegeDirectory';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <CollegeDirectory showFavoritesOnly={true} />
    </div>
  );
};

export default FavoritesPage;
