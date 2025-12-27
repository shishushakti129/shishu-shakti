import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedPage, StaggerContainer, StaggerItem, FadeIn } from '../components/AnimatedPage';

export const Home: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <FadeIn delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral mb-6 leading-tight"
            >
              Welcome to Shishu Shakti
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-neutral opacity-80 mb-8 leading-relaxed"
            >
              A gentle space for mindful motherhood and emotional wellbeing. 
              Find affirmations, wisdom, and support tailored to how you're feeling right now.
            </motion.p>
          </div>
        </FadeIn>

        {/* Feature Cards */}
        <StaggerContainer delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Affirmations Card */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  to="/affirmations"
                  className="card-gentle p-6 sm:p-8 block"
                >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral mb-4">
              Affirmations
            </h2>
            <p className="text-neutral opacity-70 text-base sm:text-lg leading-relaxed">
              Mood-aware affirmations to support you through every moment
                </p>
              </div>
                </Link>
              </motion.div>
            </StaggerItem>

            {/* Blogs Card */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  to="/blogs"
                  className="card-gentle p-6 sm:p-8 block"
                >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-secondary/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral mb-4">
              Blogs
            </h2>
            <p className="text-neutral opacity-70 text-base sm:text-lg leading-relaxed">
              Thoughtful articles on motherhood, self-care, and emotional wellness
                </p>
              </div>
                </Link>
              </motion.div>
            </StaggerItem>

            {/* Letters Card */}
            <StaggerItem>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  to="/letters"
                  className="card-gentle p-6 sm:p-8 block"
                >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-accent/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral mb-4">
              Letters to Moms
            </h2>
            <p className="text-neutral opacity-70 text-base sm:text-lg leading-relaxed">
              Weekly letters filled with warmth, understanding, and gentle guidance
                </p>
              </div>
                </Link>
              </motion.div>
            </StaggerItem>
          </div>
        </StaggerContainer>

        {/* CTA Section */}
        <FadeIn delay={0.6}>
          <div className="text-center max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-neutral opacity-80 mb-6 text-lg"
            >
              Begin your journey of mindful motherhood today
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/affirmations">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </AnimatedPage>
  );
};

