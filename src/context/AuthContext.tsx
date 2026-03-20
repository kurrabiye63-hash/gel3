import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
  user: User | null;
  credits: number | null;
  loading: boolean;
  refreshCredits: () => Promise<void>;
  deductCredits: (amount: number) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCredits(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCredits(session.user.id);
      } else {
        setCredits(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCredits = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          // Get user details from auth to include email
          const { data: { user: authUser } } = await supabase.auth.getUser();
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .upsert({ 
              id: userId, 
              email: authUser?.email,
              credits: 10 
            }) // Give 10 free credits for new users
            .select()
            .single();
          
          if (!createError) setCredits(newProfile.credits);
        }
      } else {
        setCredits(data.credits);
      }
    } catch (err) {
      console.error('Error fetching credits:', err);
    }
  };

  const refreshCredits = async () => {
    if (user) await fetchCredits(user.id);
  };

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (!user || credits === null || credits < amount) return false;

    const newCredits = credits - amount;
    
    const { error } = await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', user.id);

    if (error) {
      console.error('Error deducting credits:', error);
      return false;
    }

    setCredits(newCredits);
    return true;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, credits, loading, refreshCredits, deductCredits, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
