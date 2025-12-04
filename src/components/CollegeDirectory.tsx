import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, Phone, Globe, GraduationCap, Award, Users } from 'lucide-react';
import { realColleges, type RealCollege } from '../data/realColleges';

interface College {
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  courses: string[];
  fees: string;
  cutoff: string;
  facilities: string[];
  phone: string;
  website: string;
  type: 'Government' | 'Aided' | 'Private';
  forClass: '10th' | '12th' | 'both';
  stream?: 'Science' | 'Commerce' | 'Arts' | 'All';
  category?: string;
  established: string;
  accreditation: string;
  placement: string;
  hostel: boolean;
  scholarships: string[];
  city?: string;
  state?: string;
}

const mockColleges: College[] = [
  {
    id: 1,
    name: "Government Higher Secondary School - Science Wing",
    location: "Mumbai, Maharashtra",
    distance: "2.1 km",
    rating: 4.3,
    courses: ["Science Stream (PCM)", "Science Stream (PCB)", "Science Stream (PCMB)"],
    fees: "₹12,000/year",
    cutoff: "75%",
    facilities: ["Science Labs", "Library", "Computer Lab", "Sports Ground", "Canteen"],
    phone: "+91-22-12345678",
    website: "www.ghss-mumbai-science.edu.in",
    type: "Government",
    forClass: "10th",
    stream: "All",
    category: "PU College",
    established: "1985",
    accreditation: "CBSE Affiliated",
    placement: "95% students get admission in top colleges",
    hostel: false,
    scholarships: ["Merit Scholarship", "SC/ST Scholarship", "Minority Scholarship"]
  },
  {
    id: 2,
    name: "Government Engineering College",
    location: "Mumbai, Maharashtra",
    distance: "8.2 km",
    rating: 4.6,
    courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Civil", "B.Tech Electrical"],
    fees: "₹45,000/year",
    cutoff: "85%",
    facilities: ["Advanced Labs", "Research Center", "Hostel", "Placement Cell", "Library"],
    phone: "+91-22-12345678",
    website: "www.gec-mumbai.edu.in",
    type: "Government",
    forClass: "12th",
    stream: "Science",
    category: "Engineering",
    established: "1960",
    accreditation: "NAAC A+ Grade",
    placement: "95% placement with avg package ₹8 LPA",
    hostel: true,
    scholarships: ["Merit Scholarship", "Research Fellowship"]
  },
  {
    id: 3,
    name: "Government Commerce College",
    location: "Mumbai, Maharashtra",
    distance: "5.8 km",
    rating: 4.2,
    courses: ["B.Com", "BBA", "B.Com (Hons)", "BMS"],
    fees: "₹12,000/year",
    cutoff: "75%",
    facilities: ["Computer Lab", "Library", "Auditorium", "Placement Cell"],
    phone: "+91-22-12345678",
    website: "www.gcc-mumbai.edu.in",
    type: "Government",
    forClass: "12th",
    stream: "Commerce",
    category: "Business",
    established: "1962",
    accreditation: "UGC Recognized",
    placement: "88% placement with avg package ₹4.5 LPA",
    hostel: false,
    scholarships: ["Commerce Merit Award"]
  },
  {
    id: 4,
    name: "Government Law College",
    location: "Delhi, Delhi",
    distance: "7.8 km",
    rating: 4.5,
    courses: ["LLB", "B.A. LLB", "LLM"],
    fees: "₹18,000/year",
    cutoff: "80%",
    facilities: ["Moot Court", "Law Library", "Legal Aid Clinic", "Seminar Halls"],
    phone: "+91-11-87654321",
    website: "www.glc-delhi.edu.in",
    type: "Government",
    forClass: "12th",
    stream: "Arts",
    category: "Law",
    established: "1924",
    accreditation: "BCI Approved",
    placement: "95% placement in legal sector",
    hostel: true,
    scholarships: ["Legal Excellence Award"]
  }
];

interface CollegeDirectoryProps {
  selectedClassLevel?: '10th' | '12th' | null;
  selectedStream?: string | null;
  showClassSelection?: boolean;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({
  selectedClassLevel,
  selectedStream,
  showClassSelection = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [classFilter, setClassFilter] = useState<'10th' | '12th' | 'all'>(selectedClassLevel || 'all');
  const [streamFilter, setStreamFilter] = useState<'Science' | 'Commerce' | 'Arts' | 'All'>((selectedStream as 'Science' | 'Commerce' | 'Arts') || 'All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'fees'>('rating');

  const colleges = [...realColleges, ...mockColleges] as College[];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !selectedCourse || college.courses.some(course =>
      course.toLowerCase().includes(selectedCourse.toLowerCase())
    );
    const matchesClass = classFilter === 'all' || college.forClass === classFilter || college.forClass === 'both';
    const matchesStream = streamFilter === 'All' || college.stream === streamFilter || college.stream === 'All';
    const matchesCategory = categoryFilter === 'All' || college.category === categoryFilter;

    return matchesSearch && matchesCourse && matchesClass && matchesStream && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'fees':
        return parseInt(a.fees.replace(/[^\d]/g, '')) - parseInt(b.fees.replace(/[^\d]/g, ''));
      default:
        return 0;
    }
  });

  const allCourses = Array.from(new Set(colleges.flatMap(college => college.courses)));

  const getAvailableCategories = () => {
    const filtered = colleges.filter(college => {
      const matchesClass = classFilter === 'all' || college.forClass === classFilter || college.forClass === 'both';
      const matchesStream = streamFilter === 'All' || college.stream === streamFilter || college.stream === 'All';
      return matchesClass && matchesStream;
    });
    return Array.from(new Set(filtered.map(college => college.category).filter((cat): cat is string => Boolean(cat))));
  };

  const getCollegeStats = () => {
    const total = filteredColleges.length;
    const government = filteredColleges.filter(c => c.type === 'Government').length;
    const withHostel = filteredColleges.filter(c => c.hostel).length;

    return { total, government, withHostel };
  };

  const stats = getCollegeStats();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {selectedClassLevel === '10th' ? 'Find Schools for Stream Selection' :
              selectedClassLevel === '12th' ?
                (selectedStream ? `${selectedStream} Stream Colleges` : 'Find Degree Colleges') :
                'Discover Colleges'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {selectedClassLevel === '10th' ? 'Choose the right school for your 11th-12th stream selection.' :
              selectedClassLevel === '12th' ?
                (selectedStream ? `Explore top colleges offering ${selectedStream} stream programs.` : 'Find the perfect college for your degree program.') :
                'Explore quality education opportunities in colleges with detailed information.'}
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
            <div className="text-2xl font-bold text-edu-purple">{stats.withHostel}</div>
            <div className="text-sm text-muted-foreground">With Hostel</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search colleges, locations, or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-styled pl-10"
              />
            </div>

            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="input-styled lg:w-auto"
            >
              <option value="">All Courses</option>
              {allCourses.slice(0, 20).map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Filters</span>
            </button>
          </div>

          {/* Class and Stream Selection */}
          {showClassSelection && (
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Class:</span>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value as '10th' | '12th' | 'all')}
                  className="input-styled py-2"
                >
                  <option value="all">All Classes</option>
                  <option value="10th">After 10th</option>
                  <option value="12th">After 12th</option>
                </select>
              </div>

              {classFilter === '12th' && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">Stream:</span>
                  <select
                    value={streamFilter}
                    onChange={(e) => setStreamFilter(e.target.value as 'Science' | 'Commerce' | 'Arts' | 'All')}
                    className="input-styled py-2"
                  >
                    <option value="All">All Streams</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Category Selection */}
          {classFilter === '12th' && streamFilter !== 'All' && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-3">College Categories:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === 'All'
                      ? 'bg-edu-blue text-primary-foreground shadow-lg'
                      : 'bg-secondary text-foreground hover:bg-accent'
                    }`}
                >
                  All Categories
                </button>
                {getAvailableCategories().map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === category
                        ? 'bg-edu-blue text-primary-foreground shadow-lg'
                        : 'bg-secondary text-foreground hover:bg-accent'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* View Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'fees')}
                className="input-styled py-2"
              >
                <option value="rating">Rating</option>
                <option value="fees">Fees</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Fees Range</label>
                  <select className="input-styled">
                    <option>Under ₹10,000</option>
                    <option>₹10,000 - ₹25,000</option>
                    <option>₹25,000 - ₹50,000</option>
                    <option>Above ₹50,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Rating</label>
                  <select className="input-styled">
                    <option>All ratings</option>
                    <option>4.0+ stars</option>
                    <option>3.5+ stars</option>
                    <option>3.0+ stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Facilities</label>
                  <select className="input-styled">
                    <option>All facilities</option>
                    <option>With Hostel</option>
                    <option>With Labs</option>
                    <option>With Placement</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
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
                      {college.forClass === '10th' && (
                        <span className="badge-blue text-xs">After 10th</span>
                      )}
                      {college.forClass === '12th' && (
                        <span className="badge-green text-xs">After 12th</span>
                      )}
                      {college.stream && college.stream !== 'All' && (
                        <span className="badge-purple text-xs">{college.stream}</span>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{college.location} • {college.distance}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-edu-yellow fill-current mr-1" />
                        <span className="font-medium text-foreground">{college.rating}</span>
                      </div>
                      <span>Est. {college.established}</span>
                      <span className="text-edu-green font-medium">{college.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-edu-green">{college.fees}</div>
                    <div className="text-sm text-muted-foreground">Cutoff: {college.cutoff}</div>
                    {college.hostel && (
                      <div className="text-xs text-edu-blue font-medium">Hostel Available</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Available Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.courses.slice(0, 3).map((course, idx) => (
                      <span key={idx} className="badge-blue text-xs">{course}</span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="text-sm text-muted-foreground">+{college.courses.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Accreditation:</span>
                      <span className="ml-1 font-medium text-foreground">{college.accreditation}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Placement:</span>
                      <span className="ml-1 font-medium text-foreground">{college.placement.slice(0, 30)}...</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {college.facilities.slice(0, 4).map((facility, idx) => (
                    <span key={idx} className="bg-secondary text-foreground px-2 py-1 rounded text-xs">
                      {facility}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCollege(college)}
                    className="flex-1 btn-primary text-sm py-2"
                  >
                    View Details
                  </button>
                  <a
                    href={`https://${college.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12 card-elevated animate-fade-in">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* College Detail Modal */}
        {selectedCollege && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="card-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{selectedCollege.name}</h2>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedCollege.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCollege(null)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <span className="text-2xl text-muted-foreground">×</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">College Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium text-foreground">{selectedCollege.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Established:</span>
                        <span className="font-medium text-foreground">{selectedCollege.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="font-medium text-foreground flex items-center">
                          <Star className="w-4 h-4 text-edu-yellow fill-current mr-1" />
                          {selectedCollege.rating}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fees:</span>
                        <span className="font-medium text-edu-green">{selectedCollege.fees}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{selectedCollege.phone}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Globe className="w-4 h-4 mr-2" />
                        <a href={`https://${selectedCollege.website}`} target="_blank" rel="noopener noreferrer" className="text-edu-blue hover:underline">
                          {selectedCollege.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Courses Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.courses.map((course, idx) => (
                      <span key={idx} className="badge-blue">{course}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.facilities.map((facility, idx) => (
                      <span key={idx} className="bg-secondary text-foreground px-3 py-1 rounded text-sm">{facility}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Scholarships</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.scholarships.map((scholarship, idx) => (
                      <span key={idx} className="badge-green">{scholarship}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-edu-blue-light rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Placement</h4>
                  <p className="text-muted-foreground">{selectedCollege.placement}</p>
                </div>

                <a
                  href={`https://${selectedCollege.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Visit College Website
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
