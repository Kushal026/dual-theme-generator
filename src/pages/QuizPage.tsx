import React from 'react';
import { Header } from '../components/Header';
import { AptitudeQuiz } from '../components/AptitudeQuiz';
import { useSearchParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classLevel = searchParams.get('class') as '10th' | '12th' | null;

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <AptitudeQuiz
        selectedClassLevel={classLevel}
        selectedStream={null}
        onBack={() => navigate('/')}
        onStreamChange={() => {}}
      />
    </div>
  );
};

export default QuizPage;
