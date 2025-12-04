import React from 'react';
import { User, MapPin, GraduationCap, Target } from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    class: string;
    stream: string;
    location: string;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8 mb-8 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-edu-blue rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Welcome, {user.name}!</h2>
                <p className="text-muted-foreground">Class {user.class} • {user.stream} Stream</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-edu-blue-light rounded-lg p-4">
                <MapPin className="w-6 h-6 text-edu-blue mb-2" />
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-semibold text-foreground">{user.location}</div>
              </div>
              <div className="bg-edu-green-light rounded-lg p-4">
                <GraduationCap className="w-6 h-6 text-edu-green mb-2" />
                <div className="text-sm text-muted-foreground">Stream</div>
                <div className="font-semibold text-foreground">{user.stream}</div>
              </div>
              <div className="bg-edu-purple-light rounded-lg p-4">
                <Target className="w-6 h-6 text-edu-purple mb-2" />
                <div className="text-sm text-muted-foreground">Profile</div>
                <div className="font-semibold text-foreground">Active</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">Explore career paths and colleges tailored for you</p>
          </div>
        </div>
      </div>
    </section>
  );
};
