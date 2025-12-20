import React from 'react';
import { User, MapPin, GraduationCap, Target, Heart, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useColleges } from '@/hooks/useColleges';

interface DashboardProps {
  onSectionChange?: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { profile } = useAuth();
  const { favorites } = useFavorites();
  const { colleges } = useColleges();

  const favoriteColleges = colleges.filter(c => favorites.includes(c.id));

  if (!profile) {
    return (
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Welcome Card */}
          <div className="card-elevated p-8 mb-8 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-edu-blue rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Welcome, {profile.name}!</h2>
                <p className="text-muted-foreground">Class {profile.class} • {profile.stream} Stream</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-edu-blue-light dark:bg-edu-blue/20 rounded-lg p-4">
                <MapPin className="w-6 h-6 text-edu-blue mb-2" />
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-semibold text-foreground">{profile.location || 'Not set'}</div>
              </div>
              <div className="bg-edu-green-light dark:bg-edu-green/20 rounded-lg p-4">
                <GraduationCap className="w-6 h-6 text-edu-green mb-2" />
                <div className="text-sm text-muted-foreground">Stream</div>
                <div className="font-semibold text-foreground">{profile.stream}</div>
              </div>
              <div className="bg-edu-purple-light dark:bg-edu-purple/20 rounded-lg p-4">
                <Heart className="w-6 h-6 text-edu-purple mb-2" />
                <div className="text-sm text-muted-foreground">Saved Colleges</div>
                <div className="font-semibold text-foreground">{favorites.length}</div>
              </div>
              <div className="bg-edu-orange-light dark:bg-edu-orange/20 rounded-lg p-4">
                <Target className="w-6 h-6 text-edu-orange mb-2" />
                <div className="text-sm text-muted-foreground">Profile Status</div>
                <div className="font-semibold text-foreground">Active</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => onSectionChange?.('colleges')}
              className="card-elevated p-6 text-left hover:shadow-glow transition-all animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <GraduationCap className="w-10 h-10 text-edu-blue mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Explore Colleges</h3>
              <p className="text-muted-foreground text-sm">Browse colleges based on your stream and preferences</p>
            </button>

            <button
              onClick={() => onSectionChange?.('timeline')}
              className="card-elevated p-6 text-left hover:shadow-glow transition-all animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <Calendar className="w-10 h-10 text-edu-green mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Exam Timeline</h3>
              <p className="text-muted-foreground text-sm">Track important exam dates and deadlines</p>
            </button>

            <button
              onClick={() => onSectionChange?.('careers')}
              className="card-elevated p-6 text-left hover:shadow-glow transition-all animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <Award className="w-10 h-10 text-edu-purple mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Career Paths</h3>
              <p className="text-muted-foreground text-sm">Discover career options for {profile.stream} stream</p>
            </button>
          </div>

          {/* Favorite Colleges */}
          {favoriteColleges.length > 0 && (
            <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Your Favorite Colleges</h3>
                <button
                  onClick={() => onSectionChange?.('favorites')}
                  className="text-edu-blue hover:underline text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {favoriteColleges.slice(0, 4).map((college) => (
                  <div key={college.id} className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">{college.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {college.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {college.streams.slice(0, 2).map((stream, idx) => (
                        <span key={idx} className="badge-blue text-xs">{stream}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {favorites.length === 0 && (
            <div className="card-elevated p-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Favorites Yet</h3>
              <p className="text-muted-foreground mb-4">Start exploring colleges and save your favorites!</p>
              <button
                onClick={() => onSectionChange?.('colleges')}
                className="btn-primary"
              >
                Browse Colleges
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
