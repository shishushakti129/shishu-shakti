import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Mood } from '../types';
import { getAffirmationsForMood, type AffirmationData } from '../utils/getAffirmationsForMood';
import { getMoods, type MoodData } from '../utils/getMoods';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedPage';
import { AffirmationCarousel } from '../components/AffirmationCarousel';
import { SignInModal } from '../components/SignInModal';

export const Affirmations: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [affirmations, setAffirmations] = useState<AffirmationData[] | 'LOCKED' | null>(null);
  const [loading, setLoading] = useState(false);
  const [moods, setMoods] = useState<MoodData[]>([]);
  const [moodsLoading, setMoodsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Fetch moods from Firebase on mount
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setMoodsLoading(true);
        const fetchedMoods = await getMoods();
        // Sort by order
        fetchedMoods.sort((a, b) => a.order - b.order);
        setMoods(fetchedMoods);
      } catch (error) {
        console.error('Error fetching moods:', error);
      } finally {
        setMoodsLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const handleMoodSelect = async (moodKey: string) => {
    // Find the mood data to check if it's free
    const moodData = moods.find((m) => m.key === moodKey);
    if (!moodData) return;

    // If mood is locked and user is not authenticated, show sign-in modal
    if (!moodData.isFree && !isAuthenticated) {
      setShowSignInModal(true);
      return;
    }

    // Set selected mood and fetch affirmations
    setSelectedMood(moodKey);
    setLoading(true);
    
    try {
      // Use mood key as Mood type (may need to cast)
      const result = await getAffirmationsForMood(moodKey as Mood);
      setAffirmations(result);
    } catch (error) {
      console.error('Error loading affirmations:', error);
      setAffirmations([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch affirmations when user signs in and a locked mood is selected
  useEffect(() => {
    if (selectedMood && isAuthenticated) {
      const moodData = moods.find((m) => m.key === selectedMood);
      
      // If mood was locked but user just signed in, fetch affirmations
      if (moodData && !moodData.isFree && affirmations === 'LOCKED') {
        setLoading(true);
        getAffirmationsForMood(selectedMood as Mood)
          .then((result) => {
            setAffirmations(result);
          })
          .catch((error) => {
            console.error('Error loading affirmations:', error);
            setAffirmations([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [isAuthenticated, selectedMood, affirmations, moods]);

  // Close modal when user signs in
  useEffect(() => {
    if (isAuthenticated) {
      setShowSignInModal(false);
    }
  }, [isAuthenticated]);

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <FadeIn delay={0.1}>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-light text-neutral mb-4">
                How are you feeling right now?
              </h1>
              <p className="text-neutral opacity-70 text-lg">
                Choose a mood to see affirmations tailored for you
              </p>
            </div>
          </FadeIn>

          {/* Mood Selector */}
          <AnimatePresence mode="wait">
            {!selectedMood ? (
              <motion.div
                key="mood-selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {moodsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : (
                  <StaggerContainer delay={0.1}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
                      {moods.map((mood) => (
                        <StaggerItem key={mood.key}>
                          <motion.button
                            onClick={() => handleMoodSelect(mood.key)}
                            className="card-gentle p-6 sm:p-8 text-center w-full relative"
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            {!mood.isFree && !isAuthenticated && (
                              <div className="absolute top-2 right-2">
                                <svg
                                  className="w-5 h-5 text-neutral opacity-70"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                  />
                                </svg>
                              </div>
                            )}
                            <motion.div
                              className="text-4xl sm:text-5xl mb-3"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              {mood.emoji || '💫'}
                            </motion.div>
                            <div className="text-lg font-medium text-neutral">{mood.label}</div>
                          </motion.button>
                        </StaggerItem>
                      ))}
                    </div>
                  </StaggerContainer>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="affirmations-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Back Button */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => setSelectedMood(null)}
                    className="btn btn-ghost btn-sm"
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Choose a different mood
                  </motion.button>
                </motion.div>

                {/* Content based on lock status and loading state */}
                {loading ? (
                  <motion.div
                    className="card-gentle p-8 sm:p-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="text-neutral opacity-70 text-lg mt-4">
                      Loading affirmations...
                    </p>
                  </motion.div>
                ) : affirmations === 'LOCKED' ? (
                  <motion.div
                    className="card-gentle p-8 sm:p-12 text-center"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl sm:text-3xl font-light text-neutral mb-4">
                      This space opens after sign-in
                    </h2>
                    <p className="text-neutral opacity-70 text-lg">
                      Create a gentle account to continue.
                    </p>
                  </motion.div>
                ) : affirmations && Array.isArray(affirmations) && affirmations.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <AffirmationCarousel affirmations={affirmations} />
                  </motion.div>
                ) : affirmations && Array.isArray(affirmations) && affirmations.length === 0 ? (
                  <motion.div
                    className="card-gentle p-8 sm:p-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-neutral opacity-70 text-lg">
                      No affirmations available for this mood yet.
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Modal */}
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => setShowSignInModal(false)}
            message="Sign in to access these affirmations and continue your journey of mindful motherhood."
          />
        </div>
      </div>
    </AnimatedPage>
  );
};
