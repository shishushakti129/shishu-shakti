import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AffirmationData } from '../utils/getAffirmationsForMood';

interface AffirmationCarouselProps {
  affirmations: AffirmationData[];
}

/**
 * Carousel component for displaying affirmation images one at a time.
 * Features smooth navigation, loading states, and gentle animations.
 */
export const AffirmationCarousel: React.FC<AffirmationCarouselProps> = ({
  affirmations,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const currentAffirmation = affirmations[currentIndex];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < affirmations.length - 1;

  // Reset loading state when index changes
  useEffect(() => {
    if (loadedImages.has(currentIndex)) {
      setImageLoading(false);
    } else {
      setImageLoading(true);
    }
  }, [currentIndex, loadedImages]);

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setLoadedImages((prev) => new Set([...prev, currentIndex]));
  };

  // Preload next image
  useEffect(() => {
    if (currentIndex < affirmations.length - 1) {
      const nextImage = new Image();
      nextImage.src = affirmations[currentIndex + 1].imageSrc;
    }
  }, [currentIndex, affirmations]);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
      {/* Carousel Container */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-base-200 shadow-sm">
        {/* Skeleton - shows while image is loading */}
        {imageLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <div className="w-full h-full skeleton-gentle rounded-2xl" />
          </motion.div>
        )}

        {/* Image - fades in when loaded */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentAffirmation.id}
            src={currentAffirmation.imageSrc}
            // alt={`Affirmation for ${currentAffirmation.mood}`}
            className="w-full h-full object-cover rounded-2xl"
            onLoad={handleImageLoad}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-between mt-6">
        {/* Previous Button */}
        <motion.button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          aria-label="Previous affirmation"
          className={`
            flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
            rounded-full bg-base-100 border border-base-300
            text-neutral shadow-sm
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
          whileHover={canGoPrevious ? { scale: 1.1, backgroundColor: '#f3f4f6' } : {}}
          whileTap={canGoPrevious ? { scale: 0.95 } : {}}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>

        {/* Image Counter */}
        <div className="text-sm text-neutral opacity-70">
          {currentIndex + 1} / {affirmations.length}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Next affirmation"
          className={`
            flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
            rounded-full bg-base-100 border border-base-300
            text-neutral shadow-sm
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
          whileHover={canGoNext ? { scale: 1.1, backgroundColor: '#f3f4f6' } : {}}
          whileTap={canGoNext ? { scale: 0.95 } : {}}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

