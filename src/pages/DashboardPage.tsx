import React from 'react';
import { Header } from '../components/Header';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <AnalyticsDashboard />
    </div>
  );
};

export default DashboardPage;
