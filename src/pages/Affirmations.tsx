import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Mood } from '../types';
import { getAffirmationsForMood, type AffirmationData } from '../utils/getAffirmationsForMood';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedPage, FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedPage';
import { AffirmationCarousel } from '../components/AffirmationCarousel';
import { SignInModal } from '../components/SignInModal';

const MOODS: { value: Mood; label: string; emoji: string }[] = [
  { value: 'overwhelmed', label: 'Overwhelmed', emoji: '🌊' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'anxious', label: 'Anxious', emoji: '💭' },
  { value: 'lonely', label: 'Lonely', emoji: '🌙' },
  { value: 'hopeful', label: 'Hopeful', emoji: '🌱' },
  { value: 'calm', label: 'Calm', emoji: '✨' },
];

export const Affirmations: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleMoodSelect = (mood: Mood) => {
    // Check if mood is locked
    const affirmationResult = getAffirmationsForMood(mood);
    
    // If mood is locked and user is not authenticated, show sign-in modal
    if (affirmationResult === 'LOCKED' && !isAuthenticated) {
      setShowSignInModal(true);
      return;
    }

    // Allow selection if unlocked or authenticated
    setSelectedMood(mood);
  };

  // Get affirmations for selected mood
  // If authenticated and mood is locked, show placeholders (for now)
  const getAffirmations = () => {
    if (!selectedMood) return null;
    
    const result = getAffirmationsForMood(selectedMood);
    
    // If locked but authenticated, return placeholder affirmations
    if (result === 'LOCKED' && isAuthenticated) {
      // Return placeholder affirmations for locked moods when authenticated
      const placeholders: AffirmationData[] = [];
      for (let i = 0; i < 5; i++) {
        placeholders.push({
          id: `placeholder-${selectedMood}-${i}`,
          mood: selectedMood,
          imageSrc: `https://picsum.photos/600/800?random=${selectedMood}-${i}`,
        });
      }
      return placeholders;
    }
    
    return result;
  };

  const affirmationResult = getAffirmations();

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
                <StaggerContainer delay={0.1}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
                    {MOODS.map((mood) => (
                      <StaggerItem key={mood.value}>
                        <motion.button
                          onClick={() => handleMoodSelect(mood.value)}
                          className="card-gentle p-6 sm:p-8 text-center w-full"
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <motion.div
                            className="text-4xl sm:text-5xl mb-3"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            {mood.emoji}
                          </motion.div>
                          <div className="text-lg font-medium text-neutral">{mood.label}</div>
                        </motion.button>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
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

                {/* Content based on lock status */}
                {affirmationResult === 'LOCKED' ? (
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
                ) : affirmationResult && Array.isArray(affirmationResult) ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <AffirmationCarousel affirmations={affirmationResult} />
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
