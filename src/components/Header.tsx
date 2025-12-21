import React, { useState } from 'react';
import { Search, Menu, X, GraduationCap, LogIn, LogOut, User, Heart, Home, BookOpen, Calendar } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onSectionChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    await signOut();
    onSectionChange('home');
  };

  const navItems = [
    { label: 'Home', section: 'home', icon: Home },
    { label: 'Colleges', section: 'colleges', icon: BookOpen },
    { label: 'Timeline', section: 'timeline', icon: Calendar },
    ...(isAuthenticated ? [{ label: 'Favorites', section: 'favorites', icon: Heart }] : []),
  ];

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onSectionChange('home')}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-edu-blue to-edu-purple bg-clip-text text-transparent">
                EduPath
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => onSectionChange(item.section)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-styled pl-10 w-64"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Auth buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{profile?.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-styled pl-10"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onSectionChange(item.section);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Auth */}
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{profile?.name || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
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
