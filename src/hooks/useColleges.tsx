import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

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

export const useColleges = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchColleges();
    }
  }, [isAuthenticated]);

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

  return {
    colleges,
    loading,
    refetch: fetchColleges,
  };
};
