import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Favorite {
  id: string;
  college_id: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('favorites')
      .select('college_id')
      .eq('user_id', user.id);

    if (data && !error) {
      setFavorites(data.map(f => f.college_id));
    }
    setLoading(false);
  };

  const addFavorite = async (collegeId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save favorites",
        variant: "destructive",
      });
      return false;
    }

    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, college_id: collegeId });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already saved",
          description: "This college is already in your favorites",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add favorite",
          variant: "destructive",
        });
      }
      return false;
    }

    setFavorites(prev => [...prev, collegeId]);
    toast({
      title: "Added to favorites",
      description: "College saved to your favorites",
    });
    return true;
  };

  const removeFavorite = async (collegeId: string) => {
    if (!user) return false;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('college_id', collegeId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive",
      });
      return false;
    }

    setFavorites(prev => prev.filter(id => id !== collegeId));
    toast({
      title: "Removed from favorites",
      description: "College removed from your favorites",
    });
    return true;
  };

  const toggleFavorite = async (collegeId: string) => {
    if (favorites.includes(collegeId)) {
      return removeFavorite(collegeId);
    } else {
      return addFavorite(collegeId);
    }
  };

  const isFavorite = (collegeId: string) => favorites.includes(collegeId);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
