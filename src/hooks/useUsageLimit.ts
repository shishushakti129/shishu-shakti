import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UsageLimit {
  canView: boolean;
  remaining: number;
  hasReachedLimit: boolean;
}

const FREE_AFFIRMATION_LIMIT = 10;
const FREE_BLOG_LIMIT = 2;
const FREE_LETTER_LIMIT = 1;

export const useAffirmationLimit = (): UsageLimit => {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageLimit>({
    canView: true,
    remaining: FREE_AFFIRMATION_LIMIT,
    hasReachedLimit: false,
  });

  useEffect(() => {
    const updateUsage = () => {
      if (user) {
        // Logged-in users have unlimited access
        setUsage({
          canView: true,
          remaining: Infinity,
          hasReachedLimit: false,
        });
      } else {
        // Guest users: check local storage for view count
        const viewCount = parseInt(
          localStorage.getItem('affirmationViews') || '0',
          10
        );
        const remaining = Math.max(0, FREE_AFFIRMATION_LIMIT - viewCount);
        
        setUsage({
          canView: remaining > 0,
          remaining,
          hasReachedLimit: viewCount >= FREE_AFFIRMATION_LIMIT,
        });
      }
    };

    updateUsage();

    // Listen for storage changes (when incrementGuestView is called)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'affirmationViews') {
        updateUsage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    const handleCustomStorage = () => updateUsage();
    window.addEventListener('affirmationViewsUpdated', handleCustomStorage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('affirmationViewsUpdated', handleCustomStorage);
    };
  }, [user]);

  return usage;
};

export const useBlogLimit = (): UsageLimit => {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageLimit>({
    canView: true,
    remaining: FREE_BLOG_LIMIT,
    hasReachedLimit: false,
  });

  useEffect(() => {
    const updateUsage = () => {
      if (user) {
        setUsage({
          canView: true,
          remaining: Infinity,
          hasReachedLimit: false,
        });
      } else {
        const viewCount = parseInt(
          localStorage.getItem('blogViews') || '0',
          10
        );
        const remaining = Math.max(0, FREE_BLOG_LIMIT - viewCount);
        
        setUsage({
          canView: remaining > 0,
          remaining,
          hasReachedLimit: viewCount >= FREE_BLOG_LIMIT,
        });
      }
    };

    updateUsage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'blogViews') {
        updateUsage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const handleCustomStorage = () => updateUsage();
    window.addEventListener('blogViewsUpdated', handleCustomStorage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('blogViewsUpdated', handleCustomStorage);
    };
  }, [user]);

  return usage;
};

export const useLetterLimit = (): UsageLimit => {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageLimit>({
    canView: true,
    remaining: FREE_LETTER_LIMIT,
    hasReachedLimit: false,
  });

  useEffect(() => {
    const updateUsage = () => {
      if (user) {
        setUsage({
          canView: true,
          remaining: Infinity,
          hasReachedLimit: false,
        });
      } else {
        const viewCount = parseInt(
          localStorage.getItem('letterViews') || '0',
          10
        );
        const remaining = Math.max(0, FREE_LETTER_LIMIT - viewCount);
        
        setUsage({
          canView: remaining > 0,
          remaining,
          hasReachedLimit: viewCount >= FREE_LETTER_LIMIT,
        });
      }
    };

    updateUsage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'letterViews') {
        updateUsage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const handleCustomStorage = () => updateUsage();
    window.addEventListener('letterViewsUpdated', handleCustomStorage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('letterViewsUpdated', handleCustomStorage);
    };
  }, [user]);

  return usage;
};

// Helper to increment guest view count
export const incrementGuestView = (type: 'affirmationViews' | 'blogViews' | 'letterViews') => {
  const key = type === 'affirmationViews' ? 'affirmationViews' :
              type === 'blogViews' ? 'blogViews' : 'letterViews';
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, (current + 1).toString());
  
  // Dispatch custom event to update hooks in same tab
  window.dispatchEvent(new Event(`${key}Updated`));
};

