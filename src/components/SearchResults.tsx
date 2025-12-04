import React from 'react';
import { X, GraduationCap, ExternalLink, Building, BookOpen, Briefcase, Award } from 'lucide-react';

interface SearchResult {
  type: 'college' | 'course' | 'career' | 'scholarship';
  title: string;
  description: string;
  website: string;
  details?: {
    location?: string;
    fees?: string;
    rating?: number;
    type?: string;
  };
}

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  searchQuery: string;
  onNavigate: (section: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  isOpen,
  onClose,
  results,
  searchQuery,
  onNavigate
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'college':
        return Building;
      case 'course':
        return BookOpen;
      case 'career':
        return Briefcase;
      case 'scholarship':
        return Award;
      default:
        return GraduationCap;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'college':
        return 'badge-blue';
      case 'course':
        return 'badge-green';
      case 'career':
        return 'badge-purple';
      case 'scholarship':
        return 'badge-orange';
      default:
        return 'badge-blue';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4 z-50 animate-fade-in">
      <div className="card-elevated max-w-3xl w-full max-h-[70vh] overflow-hidden">
        <div className="sticky top-0 bg-card p-6 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground">Search Results</h2>
            <p className="text-muted-foreground text-sm">
              Found {results.length} results for "{searchQuery}"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(70vh-100px)]">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => {
                const Icon = getIcon(result.type);
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-edu-blue hover:shadow-md transition-all bg-secondary/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-edu-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-edu-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-foreground">{result.title}</h3>
                          <span className={getTypeColor(result.type)}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{result.description}</p>
                        {result.details && (
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                            {result.details.location && (
                              <span>📍 {result.details.location}</span>
                            )}
                            {result.details.fees && (
                              <span>💰 {result.details.fees}</span>
                            )}
                            {result.details.rating && (
                              <span>⭐ {result.details.rating}</span>
                            )}
                          </div>
                        )}
                        <a
                          href={result.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-edu-blue hover:text-edu-blue-dark text-sm font-medium transition-colors"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching with different keywords
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('colleges');
                }}
                className="btn-primary"
              >
                Browse All Colleges
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
