import React from 'react';
import { Header } from '../components/Header';
import { CollegeComparison } from '../components/CollegeComparison';

const ComparePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <CollegeComparison />
    </div>
  );
};

export default ComparePage;
