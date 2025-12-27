import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/firebase';
import type { Blog } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useBlogLimit, incrementGuestView } from '../hooks/useUsageLimit';
import { SoftGate } from '../components/SoftGate';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { AnimatedPage, StaggerContainer, StaggerItem, FadeIn } from '../components/AnimatedPage';

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { user, incrementUsage } = useAuth();
  const { canView, remaining } = useBlogLimit();
  const [viewedBlogs, setViewedBlogs] = useState<Set<string>>(new Set());

  // Load blogs
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'blogs'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data: Blog[] = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Blog);
        });
        setBlogs(data);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const handleViewBlog = async (blog: Blog) => {
    if (!user && !blog.isFree && !canView) {
      return; // Soft gate will handle this
    }

    if (!viewedBlogs.has(blog.id)) {
      if (user) {
        await incrementUsage('blogViews');
      } else {
        incrementGuestView('blogViews');
      }
      setViewedBlogs((prev) => new Set([...prev, blog.id]));
    }

    setSelectedBlog(blog);
  };

  const isBlogLocked = (blog: Blog) => {
    if (user) return false;
    if (blog.isFree) return false;
    return !canView;
  };

  if (selectedBlog) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto">
            <motion.button
              onClick={() => setSelectedBlog(null)}
              className="btn btn-ghost btn-sm mb-6"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to blogs
            </motion.button>

            <SoftGate
              isLocked={isBlogLocked(selectedBlog)}
              message="Create a gentle space for yourself to continue reading."
            >
              <motion.article
                className="card-gentle p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {selectedBlog.imageUrl && (
                  <motion.img
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    className="w-full h-auto rounded-lg mb-6"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                )}
                <motion.h1
                  className="text-3xl sm:text-4xl font-light text-neutral mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {selectedBlog.title}
                </motion.h1>
                <motion.div
                  className="prose prose-lg max-w-none text-neutral"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <p className="text-lg opacity-80 mb-6">{selectedBlog.excerpt}</p>
                  <div
                    className="whitespace-pre-line leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                  />
                </motion.div>
              </motion.article>
            </SoftGate>
          </div>
        </div>
      </AnimatedPage>
    );
  }

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

        {/* Remaining Views (for guests) */}
        {!user && (
          <div className="alert alert-info mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              {remaining > 0
                ? `You have ${remaining} free blog${remaining !== 1 ? 's' : ''} remaining`
                : 'You\'ve viewed all free blogs'}
            </span>
          </div>
        )}

        {/* Blogs List */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral opacity-70 text-lg">
              No blogs available yet.
            </p>
          </div>
        ) : (
          <StaggerContainer delay={0.1}>
            <div className="space-y-6">
              {blogs.map((blog) => {
                const isLocked = isBlogLocked(blog);
                return (
                  <StaggerItem key={blog.id}>
                    <SoftGate
                      isLocked={isLocked}
                      message="Create a gentle space for yourself to continue reading."
                    >
                      <motion.div
                        className="card-gentle p-6 sm:p-8 cursor-pointer"
                        onClick={() => handleViewBlog(blog)}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                    {blog.imageUrl && (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h2 className="text-2xl sm:text-3xl font-light text-neutral mb-3">
                      {blog.title}
                    </h2>
                    <p className="text-neutral opacity-70 text-lg leading-relaxed">
                      {blog.excerpt}
                    </p>
                        {blog.isFree && (
                          <div className="badge badge-primary badge-sm mt-4">
                            Free
                          </div>
                        )}
                      </motion.div>
                    </SoftGate>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        )}
        </div>
      </div>
    </AnimatedPage>
  );
};

