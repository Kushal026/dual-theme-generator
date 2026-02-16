import React from 'react';
import { Header } from '../components/Header';
import { LearnMore } from '../components/LearnMore';
import { useNavigate } from 'react-router-dom';

const LearnMorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <LearnMore onBack={() => navigate('/')} />
    </div>
  );
};

export default LearnMorePage;
