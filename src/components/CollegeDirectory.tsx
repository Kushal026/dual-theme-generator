import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, Phone, Globe, GraduationCap, Award, Users, Heart, X, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  streams: string[];
  ranking: number | null;
  fees: string | null;
  website: string | null;
  description: string | null;
  image_url: string | null;
  courses: string[] | null;
}

interface CollegeDirectoryProps {
  selectedClassLevel?: '10th' | '12th' | null;
  selectedStream?: string | null;
  showClassSelection?: boolean;
  showFavoritesOnly?: boolean;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({
  selectedClassLevel,
  selectedStream,
  showClassSelection = true,
  showFavoritesOnly = false
}) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [streamFilter, setStreamFilter] = useState<string>(selectedStream || 'All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'ranking' | 'name'>('ranking');

  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('ranking', { ascending: true, nullsFirst: false });

    if (data && !error) {
      setColleges(data);
    }
    setLoading(false);
  };

  const displayedColleges = showFavoritesOnly 
    ? colleges.filter(c => favorites.includes(c.id))
    : colleges;

  const filteredColleges = displayedColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !selectedCourse || college.courses?.some(course =>
      course.toLowerCase().includes(selectedCourse.toLowerCase())
    );
    const matchesStream = streamFilter === 'All' || college.streams.includes(streamFilter);
    const matchesType = typeFilter === 'All' || college.type === typeFilter;

    return matchesSearch && matchesCourse && matchesStream && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'ranking') {
      return (a.ranking || 999) - (b.ranking || 999);
    }
    return a.name.localeCompare(b.name);
  });

  const allCourses = Array.from(new Set(colleges.flatMap(college => college.courses || [])));

  const stats = {
    total: filteredColleges.length,
    government: filteredColleges.filter(c => c.type === 'Government').length,
    private: filteredColleges.filter(c => c.type === 'Private').length,
  };


  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {showFavoritesOnly ? 'Your Favorite Colleges' : 'Discover Top Colleges'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {showFavoritesOnly 
              ? 'Colleges you\'ve saved for quick access'
              : 'Explore quality education opportunities across India with detailed information.'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="card-elevated p-4 text-center">
            <div className="text-2xl font-bold text-edu-blue">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Colleges</div>
          </div>
          <div className="card-elevated p-4 text-center">
            <div className="text-2xl font-bold text-edu-green">{stats.government}</div>
            <div className="text-sm text-muted-foreground">Government Colleges</div>
          </div>
          <div className="card-elevated p-4 text-center">
            <div className="text-2xl font-bold text-edu-purple">{stats.private}</div>
            <div className="text-sm text-muted-foreground">Private Colleges</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search colleges, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-styled pl-10"
              />
            </div>

            <select
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value)}
              className="input-styled lg:w-auto"
            >
              <option value="All">All Streams</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input-styled lg:w-auto"
            >
              <option value="All">All Types</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'ranking' | 'name')}
              className="input-styled lg:w-auto"
            >
              <option value="ranking">Sort by Ranking</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-edu-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading colleges...</p>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredColleges.map((college, index) => (
              <div
                key={college.id}
                className="card-elevated overflow-hidden hover:shadow-glow transition-all animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{college.name}</h3>
                        {college.ranking && (
                          <span className="badge-blue text-xs">Rank #{college.ranking}</span>
                        )}
                      </div>
                      <div className="flex items-center text-muted-foreground mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{college.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className={`font-medium ${college.type === 'Government' ? 'text-edu-green' : 'text-edu-purple'}`}>
                          {college.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => toggleFavorite(college.id)}
                        className={`p-2 rounded-full transition-colors ${
                          isFavorite(college.id) 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-500' 
                            : 'bg-secondary text-muted-foreground hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(college.id) ? 'fill-current' : ''}`} />
                      </button>
                      {college.fees && (
                        <div className="text-lg font-bold text-edu-green">{college.fees}</div>
                      )}
                    </div>
                  </div>

                  {college.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{college.description}</p>
                  )}

                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Streams</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.streams.map((stream, idx) => (
                        <span key={idx} className="badge-purple text-xs">{stream}</span>
                      ))}
                    </div>
                  </div>

                  {college.courses && college.courses.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.courses.slice(0, 4).map((course, idx) => (
                          <span key={idx} className="badge-blue text-xs">{course}</span>
                        ))}
                        {college.courses.length > 4 && (
                          <span className="badge-blue text-xs">+{college.courses.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedCollege(college)}
                      className="flex-1 btn-secondary text-sm"
                    >
                      View Details
                    </button>
                    {college.website && (
                      <a
                        href={college.website.startsWith('http') ? college.website : `https://${college.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-edu-blue text-primary-foreground rounded-lg hover:opacity-90 transition-all text-sm"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredColleges.length === 0 && (
          <div className="text-center py-12 card-elevated animate-fade-in">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {showFavoritesOnly ? 'No favorites yet' : 'No colleges found'}
            </h3>
            <p className="text-muted-foreground">
              {showFavoritesOnly 
                ? 'Start exploring and save colleges you like!' 
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        )}

        {/* College Detail Modal */}
        {selectedCollege && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="card-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedCollege.name}</h2>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{selectedCollege.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`badge-${selectedCollege.type === 'Government' ? 'green' : 'purple'}`}>
                    {selectedCollege.type}
                  </span>
                  {selectedCollege.ranking && (
                    <span className="badge-blue">NIRF Rank #{selectedCollege.ranking}</span>
                  )}
                </div>

                {selectedCollege.description && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">About</h4>
                    <p className="text-muted-foreground">{selectedCollege.description}</p>
                  </div>
                )}

                {selectedCollege.fees && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Fees</h4>
                    <p className="text-edu-green font-medium">{selectedCollege.fees}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Streams</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.streams.map((stream, idx) => (
                      <span key={idx} className="badge-purple">{stream}</span>
                    ))}
                  </div>
                </div>

                {selectedCollege.courses && selectedCollege.courses.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Available Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollege.courses.map((course, idx) => (
                        <span key={idx} className="badge-blue">{course}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => toggleFavorite(selectedCollege.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                      isFavorite(selectedCollege.id)
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-500'
                        : 'bg-secondary text-foreground hover:bg-accent'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(selectedCollege.id) ? 'fill-current' : ''}`} />
                    {isFavorite(selectedCollege.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  {selectedCollege.website && (
                    <a
                      href={selectedCollege.website.startsWith('http') ? selectedCollege.website : `https://${selectedCollege.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-edu-blue text-primary-foreground rounded-lg hover:opacity-90 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
