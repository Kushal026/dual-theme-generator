import React from 'react';
import { Header } from '../components/Header';
import { AICareerAdvisor } from '../components/AICareerAdvisor';

const AIAdvisorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <AICareerAdvisor />
    </div>
  );
};

export default AIAdvisorPage;
