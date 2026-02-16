import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Plus, MapPin, GraduationCap, Award, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

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
  courses: string[] | null;
}

export const CollegeComparison: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSelector, setShowSelector] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      const { data } = await supabase.from('colleges').select('*').order('ranking', { ascending: true, nullsFirst: false });
      if (data) setColleges(data);
    };
    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter(c =>
    !selected.find(s => s.id === c.id) &&
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addCollege = (college: College) => {
    if (selected.length < 3) {
      setSelected([...selected, college]);
      setShowSelector(false);
      setSearchTerm('');
    }
  };

  const removeCollege = (id: string) => {
    setSelected(selected.filter(c => c.id !== id));
  };

  const comparisonFields = [
    { label: 'Location', key: 'location', icon: MapPin },
    { label: 'Type', key: 'type', icon: GraduationCap },
    { label: 'Ranking', key: 'ranking', icon: Award },
    { label: 'Fees', key: 'fees', icon: Award },
  ];

  return (
    <section className="py-8 bg-background min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/colleges')}
          className="flex items-center space-x-2 text-edu-blue hover:text-edu-blue-dark mb-4 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Colleges</span>
        </button>

        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">Compare Colleges</h2>
          <p className="text-muted-foreground">Select up to 3 colleges to compare side by side</p>
        </div>

        {/* Selection slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="card-elevated p-4 min-h-[120px] flex items-center justify-center">
              {selected[idx] ? (
                <div className="w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{selected[idx].name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />{selected[idx].location}
                      </p>
                    </div>
                    <button onClick={() => removeCollege(selected[idx].id)} className="p-1 hover:bg-secondary rounded">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowSelector(true)}
                  className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-8 h-8" />
                  <span className="text-sm">Add College</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* College selector modal */}
        {showSelector && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="card-elevated max-w-lg w-full max-h-[70vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-foreground">Select a College</h3>
                <button onClick={() => { setShowSelector(false); setSearchTerm(''); }} className="p-1 hover:bg-secondary rounded">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-styled"
                  autoFocus
                />
              </div>
              <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2">
                {filteredColleges.map(college => (
                  <button
                    key={college.id}
                    onClick={() => addCollege(college)}
                    className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-accent border border-border transition-colors"
                  >
                    <div className="font-semibold text-foreground text-sm">{college.name}</div>
                    <div className="text-xs text-muted-foreground">{college.location} • {college.type}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comparison table */}
        {selected.length >= 2 && (
          <div className="card-elevated overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary">
                    <th className="p-4 text-left text-foreground font-semibold">Feature</th>
                    {selected.map(c => (
                      <th key={c.id} className="p-4 text-left text-foreground font-semibold">{c.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map(field => (
                    <tr key={field.key} className="border-t border-border">
                      <td className="p-4 text-foreground font-medium flex items-center gap-2">
                        <field.icon className="w-4 h-4 text-muted-foreground" />
                        {field.label}
                      </td>
                      {selected.map(c => (
                        <td key={c.id} className="p-4 text-muted-foreground">
                          {field.key === 'ranking'
                            ? (c.ranking ? `#${c.ranking}` : 'N/A')
                            : (c as any)[field.key] || 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="p-4 text-foreground font-medium">Streams</td>
                    {selected.map(c => (
                      <td key={c.id} className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {c.streams.map((s, i) => (
                            <span key={i} className="badge-purple text-xs">{s}</span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-foreground font-medium">Courses</td>
                    {selected.map(c => (
                      <td key={c.id} className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {(c.courses || []).slice(0, 5).map((course, i) => (
                            <span key={i} className="badge-blue text-xs">{course}</span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4 text-foreground font-medium">Website</td>
                    {selected.map(c => (
                      <td key={c.id} className="p-4">
                        {c.website ? (
                          <a href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-edu-blue hover:underline text-sm flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Visit
                          </a>
                        ) : 'N/A'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selected.length < 2 && (
          <div className="text-center py-12 card-elevated animate-fade-in">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Select at least 2 colleges</h3>
            <p className="text-muted-foreground">Add colleges above to see a detailed comparison</p>
          </div>
        )}
      </div>
    </section>
  );
};
