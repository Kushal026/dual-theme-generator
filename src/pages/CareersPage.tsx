import React, { useState } from 'react';
import { Header } from '../components/Header';
import { CareerPaths } from '../components/CareerPaths';
import { useSearchParams, useNavigate } from 'react-router-dom';

const CareersPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classLevel = searchParams.get('class') as '10th' | '12th' | null;
  const stream = searchParams.get('stream');

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <CareerPaths selectedClassLevel={classLevel} selectedStream={stream} />
    </div>
  );
};

export default CareersPage;
