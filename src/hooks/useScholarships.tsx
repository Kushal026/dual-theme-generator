import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Scholarship {
  id: string;
  name: string;
  description: string | null;
  eligibility: string | null;
  amount: string | null;
  deadline: string | null;
  website: string | null;
  streams: string[] | null;
}

export const useScholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchScholarships();
    }
  }, [isAuthenticated]);

  const fetchScholarships = async () => {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .order('deadline', { ascending: true, nullsFirst: false });

    if (data && !error) {
      setScholarships(data);
    }
    setLoading(false);
  };

  return {
    scholarships,
    loading,
    refetch: fetchScholarships,
  };
};
