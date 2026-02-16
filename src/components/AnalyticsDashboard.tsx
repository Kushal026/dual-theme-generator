import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, GraduationCap, Target, Heart, Calendar, Award, TrendingUp, BarChart3, Sparkles, ArrowRight, Scale } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  streams: string[];
  ranking: number | null;
  fees: string | null;
}

export const AnalyticsDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { favorites } = useFavorites();
  const [colleges, setColleges] = useState<College[]>([]);
  const [examCount, setExamCount] = useState(0);
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [collegesRes, examsRes, scholarshipsRes] = await Promise.all([
        supabase.from('colleges').select('*'),
        supabase.from('exams').select('id'),
        supabase.from('scholarships').select('id'),
      ]);
      if (collegesRes.data) setColleges(collegesRes.data);
      if (examsRes.data) setExamCount(examsRes.data.length);
      if (scholarshipsRes.data) setScholarshipCount(scholarshipsRes.data.length);
    };
    fetchData();
  }, []);

  const favoriteColleges = colleges.filter(c => favorites.includes(c.id));

  // Analytics data
  const typeData = [
    { name: 'Government', value: colleges.filter(c => c.type === 'Government').length },
    { name: 'Private', value: colleges.filter(c => c.type === 'Private').length },
  ].filter(d => d.value > 0);

  const streamData = ['Science', 'Commerce', 'Arts'].map(stream => ({
    name: stream,
    colleges: colleges.filter(c => c.streams.includes(stream)).length,
  }));

  const COLORS = ['hsl(142, 76%, 36%)', 'hsl(263, 70%, 50%)', 'hsl(217, 91%, 60%)'];

  if (!profile) {
    return (
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-edu-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-hero min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome */}
          <div className="card-elevated p-6 mb-6 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-edu-blue rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Welcome, {profile.name}!</h2>
                <p className="text-muted-foreground">Class {profile.class} • {profile.stream} Stream</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-edu-blue-light dark:bg-edu-blue/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-edu-blue">{colleges.length}</div>
                <div className="text-xs text-muted-foreground">Colleges</div>
              </div>
              <div className="bg-edu-green-light dark:bg-edu-green/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-edu-green">{examCount}</div>
                <div className="text-xs text-muted-foreground">Exams</div>
              </div>
              <div className="bg-edu-purple-light dark:bg-edu-purple/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-edu-purple">{scholarshipCount}</div>
                <div className="text-xs text-muted-foreground">Scholarships</div>
              </div>
              <div className="bg-edu-orange-light dark:bg-edu-orange/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-edu-orange">{favorites.length}</div>
                <div className="text-xs text-muted-foreground">Saved</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button onClick={() => navigate('/colleges')} className="card-elevated p-4 text-left hover:shadow-glow transition-all animate-fade-in">
              <GraduationCap className="w-8 h-8 text-edu-blue mb-2" />
              <h3 className="font-bold text-foreground text-sm">Colleges</h3>
            </button>
            <button onClick={() => navigate('/timeline')} className="card-elevated p-4 text-left hover:shadow-glow transition-all animate-fade-in">
              <Calendar className="w-8 h-8 text-edu-green mb-2" />
              <h3 className="font-bold text-foreground text-sm">Timeline</h3>
            </button>
            <button onClick={() => navigate('/ai-advisor')} className="card-elevated p-4 text-left hover:shadow-glow transition-all animate-fade-in">
              <Sparkles className="w-8 h-8 text-edu-purple mb-2" />
              <h3 className="font-bold text-foreground text-sm">AI Advisor</h3>
            </button>
            <button onClick={() => navigate('/compare')} className="card-elevated p-4 text-left hover:shadow-glow transition-all animate-fade-in">
              <Scale className="w-8 h-8 text-edu-orange mb-2" />
              <h3 className="font-bold text-foreground text-sm">Compare</h3>
            </button>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* College Type Distribution */}
            <div className="card-elevated p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-edu-blue" />
                College Type Distribution
              </h3>
              {typeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, value }) => `${name}: ${value}`}>
                      {typeData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">No data available</p>
              )}
            </div>

            {/* Colleges by Stream */}
            <div className="card-elevated p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-edu-green" />
                Colleges by Stream
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={streamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="colleges" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Favorites */}
          {favoriteColleges.length > 0 ? (
            <div className="card-elevated p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Your Favorites</h3>
                <button onClick={() => navigate('/favorites')} className="text-edu-blue hover:underline text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {favoriteColleges.slice(0, 4).map((college) => (
                  <div key={college.id} className="p-3 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground text-sm">{college.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />{college.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card-elevated p-8 text-center animate-fade-in">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">No Favorites Yet</h3>
              <p className="text-muted-foreground text-sm mb-4">Start exploring and save colleges!</p>
              <button onClick={() => navigate('/colleges')} className="btn-primary text-sm">Browse Colleges</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
