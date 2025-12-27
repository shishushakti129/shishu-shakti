import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBlogs } from '../data/mockBlogs';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedPage, StaggerContainer, StaggerItem, FadeIn } from '../components/AnimatedPage';
import { SignInModal } from '../components/SignInModal';

export const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleBlogClick = (blog: typeof mockBlogs[0], e: React.MouseEvent) => {
    // If blog is free, allow navigation
    if (blog.isFree) {
      navigate(`/blogs/${blog.slug}`);
      return;
    }

    // If blog is locked and user is not authenticated, show sign-in modal
    if (!isAuthenticated) {
      e.preventDefault();
      setShowSignInModal(true);
      return;
    }

    // If authenticated, allow navigation
    navigate(`/blogs/${blog.slug}`);
  };

  const handleImageLoad = (blogId: string) => {
    setLoadedImages((prev) => new Set([...prev, blogId]));
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <FadeIn delay={0.1}>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-light text-neutral mb-4">
                Blogs
              </h1>
              <p className="text-neutral opacity-70 text-lg">
                Thoughtful articles on motherhood, self-care, and emotional wellness
              </p>
            </div>
          </FadeIn>

          {/* Blog List */}
          <StaggerContainer delay={0.1}>
            <div className="space-y-6">
              {mockBlogs.map((blog) => (
                <StaggerItem key={blog.id}>
                  <motion.div
                    className="card-gentle overflow-hidden cursor-pointer"
                    onClick={(e) => handleBlogClick(blog, e)}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                      {/* Cover Image */}
                      <div className="relative h-48 sm:h-64 overflow-hidden">
                        {/* Skeleton - shows while image is loading */}
                        {!loadedImages.has(blog.id) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0"
                          >
                            <div className="w-full h-full skeleton-gentle" />
                          </motion.div>
                        )}

                        {/* Image - fades in when loaded */}
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={blog.id}
                            src={blog.coverImage.url}
                            alt={blog.coverImage.alt}
                            className="w-full h-full object-cover"
                            onLoad={() => handleImageLoad(blog.id)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: loadedImages.has(blog.id) ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </AnimatePresence>

                        {/* Lock Icon */}
                        {!blog.isFree && !isAuthenticated && (
                          <div className="absolute top-4 right-4 z-20">
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
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-light text-neutral mb-3">
                          {blog.title}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral opacity-70 mb-4">
                          <span>{blog.publisher.name}</span>
                          <span>•</span>
                          <span>{formatDate(blog.publishedAt)}</span>
                          <span>•</span>
                          <span>{blog.readingTimeMinutes} min read</span>
                        </div>

                        <p className="text-neutral opacity-80 text-lg leading-relaxed">
                          {blog.quickSummary}
                        </p>

                        {blog.isFree && (
                          <div className="badge badge-primary badge-sm mt-4">
                            Free
                          </div>
                        )}
                      </div>
                    </motion.div> 
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Sign In Modal */}
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => setShowSignInModal(false)}
            message="Sign in to access this blog and continue your journey of mindful motherhood."
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

