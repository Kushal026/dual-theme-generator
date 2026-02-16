import React, { useState } from 'react';
import { Search, Menu, X, GraduationCap, LogIn, LogOut, User, Heart, Home, BookOpen, Calendar, Sparkles, Scale, LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Colleges', path: '/colleges', icon: BookOpen },
    { label: 'Timeline', path: '/timeline', icon: Calendar },
    { label: 'AI Advisor', path: '/ai-advisor', icon: Sparkles },
    { label: 'Compare', path: '/compare', icon: Scale },
    ...(isAuthenticated ? [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Favorites', path: '/favorites', icon: Heart },
    ] : []),
  ];

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-edu-blue to-edu-purple bg-clip-text text-transparent">
                EduPath
              </span>
            </div>

            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'bg-edu-blue/10 text-edu-blue font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search colleges, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-styled pl-10 w-56"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{profile?.name || 'User'}</span>
                  </div>
                  <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button onClick={() => navigate('/auth')} className="flex items-center space-x-2 btn-primary">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
            
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="xl:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
              {showMobileMenu ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="xl:hidden pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-styled pl-10" />
              </div>
            </form>

            <nav className="flex flex-col space-y-1 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setShowMobileMenu(false); }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-edu-blue/10 text-edu-blue font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{profile?.name || 'User'}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center space-x-2 w-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('/auth')} className="btn-primary w-full flex items-center justify-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
