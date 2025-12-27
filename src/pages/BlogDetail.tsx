import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockBlogs } from '../data/mockBlogs';
import { useAuth } from '../contexts/AuthContext';
import { AnimatedPage, FadeIn } from '../components/AnimatedPage';
import { SignInModal } from '../components/SignInModal';
import type { ContentBlock } from '../types/blog';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = React.useState(false);
  
  const blog = mockBlogs.find((b) => b.slug === slug);

  // Check if blog is locked and user is not authenticated
  useEffect(() => {
    if (blog && !blog.isFree && !isAuthenticated) {
      setShowSignInModal(true);
    }
  }, [blog, isAuthenticated]);

  // Redirect to blogs list if blog not found
  if (!blog) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-light text-neutral mb-4">Blog not found</h1>
            <Link to="/blogs" className="btn btn-primary">
              Back to Blogs
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

  const renderContentBlock = (block: ContentBlock, index: number) => {
    if (block.type === 'paragraph') {
      return (
        <motion.p
          key={index}
          className="text-lg text-neutral leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
        >
          {block.text}
        </motion.p>
      );
    }

    if (block.type === 'image') {
      return (
        <motion.div
          key={index}
          className="my-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
        >
          <img
            src={block.url}
            alt={block.alt}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
      );
    }

    return null;
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/blogs" className="btn btn-ghost btn-sm mb-6">
              ← Back to blogs
            </Link>
          </motion.div>

          {/* Publisher Info */}
          <FadeIn delay={0.1}>
            <div className="mb-8 pb-6 border-b border-base-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-medium text-neutral mb-1">
                    {blog.publisher.name}
                  </h3>
                  <p className="text-sm text-neutral opacity-70">
                    {blog.publisher.role}
                  </p>
                </div>
                <div className="text-sm text-neutral opacity-70">
                  <div>{formatDate(blog.publishedAt)}</div>
                  <div>{blog.readingTimeMinutes} min read</div>
                </div>
              </div>
              <p className="text-neutral opacity-80 leading-relaxed">
                {blog.publisher.bio}
              </p>
            </div>
          </FadeIn>

          {/* Blog Content - Only show if free or authenticated */}
          {blog.isFree || isAuthenticated ? (
            <article className="p-6 sm:p-8">
              {/* Cover Image */}
              <motion.img
                src={blog.coverImage.url}
                alt={blog.coverImage.alt}
                className="w-full h-auto rounded-lg mb-8"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Title */}
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {blog.title}
              </motion.h1>

              {/* Quick Summary */}
              <motion.p
                className="text-xl text-neutral opacity-80 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {blog.quickSummary}
              </motion.p>

              {/* Content Blocks */}
              <div className="prose prose-lg max-w-none">
                {blog.content.map((block, index) => renderContentBlock(block, index))}
              </div>
            </article>
          ) : (
            <motion.div
              className="card-gentle p-8 sm:p-12 text-center"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral mb-4">
                This blog requires sign-in
              </h2>
              <p className="text-neutral opacity-70 text-lg">
                Sign in to access this content.
              </p>
            </motion.div>
          )}

          {/* Sign In Modal for locked blogs */}
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => {
              setShowSignInModal(false);
              navigate('/blogs');
            }}
            message="Sign in to access this blog and continue your journey of mindful motherhood."
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

