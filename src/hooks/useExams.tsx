import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Exam {
  id: string;
  name: string;
  description: string | null;
  exam_date: string | null;
  registration_start: string | null;
  registration_end: string | null;
  website: string | null;
  streams: string[] | null;
  exam_type: string | null;
}

export const useExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchExams();
    }
  }, [isAuthenticated]);

  const fetchExams = async () => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('exam_date', { ascending: true, nullsFirst: false });

    if (data && !error) {
      setExams(data);
    }
    setLoading(false);
  };

  return {
    exams,
    loading,
    refetch: fetchExams,
  };
};
