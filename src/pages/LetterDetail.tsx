import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getLetterById } from '../utils/getLetters';
import type { Letter } from '../utils/getLetters';
import { AnimatedPage, FadeIn } from '../components/AnimatedPage';
import { SignInModal } from '../components/SignInModal';

export const LetterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch letter from Firebase
  useEffect(() => {
    const fetchLetter = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const fetchedLetter = await getLetterById(id);
        setLetter(fetchedLetter);
      } catch (error) {
        console.error('Error fetching letter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [id]);

  // Check if letter is locked and user is not authenticated
  useEffect(() => {
    if (letter && !letter.isFree && !isAuthenticated) {
      setShowSignInModal(true);
    }
  }, [letter, isAuthenticated]);

  // Show loading state
  if (loading) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-12">
            <span className="loading loading-spinner loading-lg mb-4"></span>
            <p className="text-neutral opacity-70">Loading letter...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  // Redirect to letters list if letter not found
  if (!letter) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-light text-neutral mb-4">Letter not found</h1>
            <Link to="/letters" className="btn btn-primary">
              Back to Letters
            </Link>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Split content into paragraphs for better rendering
  const paragraphs = letter.content.split('\n\n').filter((p) => p.trim());

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/letters"
              className="btn btn-ghost btn-sm"
            >
              ← Back to letters
            </Link>
          </motion.div>

          {/* Letter Content - Personal Note Layout */}
          {!letter.isFree && !isAuthenticated ? (
            <motion.div
              className="card-gentle p-8 sm:p-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral mb-4">
                This letter opens after sign-in
              </h2>
              <p className="text-neutral opacity-70 text-lg">
                Create a gentle account to continue reading.
              </p>
            </motion.div>
          ) : (
            <motion.article
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Week Badge */}
              <FadeIn delay={0.1}>
                <div>
                  <span className="badge badge-primary badge-sm">
                    {letter.week}
                  </span>
                </div>
              </FadeIn>

              {/* Title */}
              <FadeIn delay={0.2}>
                <h1 className="text-3xl sm:text-4xl font-light text-neutral leading-tight">
                  {letter.title}
                </h1>
              </FadeIn>

              {/* Author and Date */}
              <FadeIn delay={0.3}>
                <div className="text-neutral opacity-70 text-sm">
                  {letter.author} • {formatDate(letter.publishedAt)}
                </div>
              </FadeIn>

              {/* Letter Content */}
              <FadeIn delay={0.4}>
                <div className="space-y-6">
                  {paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="text-neutral text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </FadeIn>

              {/* Closing Signature */}
              <FadeIn delay={0.8}>
                <motion.div
                  className="mt-12 pt-8 border-t border-base-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1 }}
                >
                  <p className="text-neutral text-lg font-light italic">
                    With warmth,
                  </p>
                  <p className="text-neutral text-lg font-light mt-2">
                    Shishu Shakti
                  </p>
                </motion.div>
              </FadeIn>
            </motion.article>
          )}

          {/* Sign In Modal */}
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => {
              setShowSignInModal(false);
              // Redirect to letters list if user closes modal without signing in
              if (!isAuthenticated) {
                navigate('/letters');
              }
            }}
            message="Sign in to read this letter and continue your journey of mindful motherhood."
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

