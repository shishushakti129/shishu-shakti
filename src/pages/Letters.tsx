import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockLetters } from '../data/mockLetters';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedPage, StaggerContainer, StaggerItem, FadeIn } from '../components/AnimatedPage';
import { SignInModal } from '../components/SignInModal';

export const Letters: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLetterClick = (letter: typeof mockLetters[0], e: React.MouseEvent) => {
    // If letter is free, allow navigation
    if (letter.isFree) {
      navigate(`/letters/${letter.id}`);
      return;
    }

    // If letter is locked and user is not authenticated, show sign-in modal
    if (!isAuthenticated) {
      e.preventDefault();
      setShowSignInModal(true);
      return;
    }

    // If authenticated, allow navigation
    navigate(`/letters/${letter.id}`);
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <FadeIn delay={0.1}>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-light text-neutral mb-4">
                Letters to Moms
              </h1>
              <p className="text-neutral opacity-70 text-lg">
                Weekly letters filled with warmth, understanding, and gentle guidance
              </p>
            </div>
          </FadeIn>

          {/* Letters List */}
          <StaggerContainer delay={0.1}>
            <div className="space-y-6">
              {mockLetters.map((letter) => (
                <StaggerItem key={letter.id}>
                  <motion.div
                    className="card-gentle p-6 sm:p-8 cursor-pointer relative"
                    onClick={(e) => handleLetterClick(letter, e)}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Lock Icon - Top Right Corner */}
                    {!letter.isFree && !isAuthenticated && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-base-100/90 backdrop-blur-sm rounded-full p-2">
                          <svg
                            className="w-6 h-6 text-neutral"
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
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <span className="badge badge-primary badge-sm">
                        {letter.week}
                      </span>
                      {letter.isFree && (
                        <span className="badge badge-secondary badge-sm">
                          Free
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light text-neutral mb-3">
                      {letter.title}
                    </h2>
                    <p className="text-neutral opacity-70 text-sm">
                      {letter.author} • {formatDate(letter.publishedAt)}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Sign In Modal */}
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => setShowSignInModal(false)}
            message="Sign in to read this letter and continue your journey of mindful motherhood."
          />
        </div>
      </div>
    </AnimatedPage>
  );
};
