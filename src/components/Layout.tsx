import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../hooks/useTheme';
import logoImage from '../assets/shishu-shakti-logo.png';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { theme, changeTheme, themes } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const isActive = (path: string) => {
    // Exact match
    if (location.pathname === path) return true;
    // Check if pathname starts with the path followed by a slash (for detail pages)
    // e.g., '/blogs' should match '/blogs/some-slug'
    return location.pathname.startsWith(path + '/');
  };

  const handleThemeSelect = (selectedTheme: typeof theme) => {
    changeTheme(selectedTheme);
    setIsThemeMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Navigation */}
      <nav className="navbar bg-base-100 border-b border-base-300 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Logo */}
          <div className="flex-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/">
                <img 
                  src={logoImage} 
                  alt="Shishu Shakti" 
                  className="h-12 sm:h-16 w-auto"
                />
              </Link>
            </motion.div>
          </div>
          
          <div className="flex-none gap-2">
            <div className="hidden sm:flex gap-1 items-center">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/affirmations"
                  className={`btn btn-ghost ${isActive('/affirmations') ? 'btn-active' : ''}`}
                >
                  Affirmations
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/blogs"
                  className={`btn btn-ghost ${isActive('/blogs') ? 'btn-active' : ''}`}
                >
                  Blogs
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/letters"
                  className={`btn btn-ghost ${isActive('/letters') ? 'btn-active' : ''}`}
                >
                  Letters
                </Link>
              </motion.div>
              
              {/* Theme Selector Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  <span className="hidden lg:inline ml-2 capitalize">{theme}</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow-lg border border-base-300"
                >
                  {themes.map((themeOption) => (
                    <li key={themeOption}>
                      <button
                        onClick={() => changeTheme(themeOption)}
                        className={`flex items-center justify-between ${
                          theme === themeOption ? 'active' : ''
                        }`}
                      >
                        <span className="capitalize">{themeOption}</span>
                        {theme === themeOption && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost"
                >
                  {user.name}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow-lg border border-base-300"
                >
                  <li>
                    <button onClick={signOut} className="text-error">
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <span className="btn btn-secondary btn-sm sm:btn-md">Sign In</span>
              </Link>
            )}
            </div>
            <div className="sm:hidden flex items-center gap-2">
              {/* Mobile Theme Switcher - Always visible */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="btn btn-ghost btn-circle btn-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Theme switcher"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </motion.button>

                {/* Theme Options Menu */}
                <AnimatePresence>
                  {isThemeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-12 right-0 w-40 bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {themes.map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => handleThemeSelect(themeOption)}
                            className={`
                              w-full flex items-center justify-between px-4 py-3 rounded-lg
                              transition-colors duration-200
                              ${
                                theme === themeOption
                                  ? 'bg-primary text-primary-content'
                                  : 'hover:bg-base-200 text-neutral'
                              }
                            `}
                          >
                            <span className="capitalize font-medium">{themeOption}</span>
                            {theme === themeOption && (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User/Sign In for Mobile */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-sm"
                  >
                    {user.name}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow-lg border border-base-300"
                  >
                    <li>
                      <button onClick={signOut} className="text-error">
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <span className="btn btn-secondary btn-sm">Sign In</span>
                </Link>
              )}
            </div>
          </div>
            
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-10">
        <div className="grid grid-cols-3 py-2">
          <Link
            to="/affirmations"
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all ${
              isActive('/affirmations')
                ? 'bg-primary/10 text-primary font-semibold shadow-[0_4px_20px_0_rgba(99,102,241,0.10)]'
                : 'text-neutral opacity-80 hover:text-primary'
            }`}
          >
            <span className={`mb-1 flex items-center justify-center w-7 h-7 rounded-full ${
              isActive('/affirmations') ? 'bg-primary/20' : 'bg-neutral/10'
            }`}>
              {/* Heart/Love SVG (from Home) */}
              <svg
                className={`w-5 h-5 ${
                  isActive('/affirmations') ? 'text-primary' : 'text-neutral'
                }`}
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
            </span>
            <span className="text-xs">Affirmations</span>
          </Link>
          <Link
            to="/blogs"
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all ${
              isActive('/blogs')
                ? 'bg-secondary/10 text-secondary font-semibold shadow-[0_4px_20px_0_rgba(34,197,94,0.10)]'
                : 'text-neutral opacity-80 hover:text-secondary'
            }`}
          >
            <span className={`mb-1 flex items-center justify-center w-7 h-7 rounded-full ${
              isActive('/blogs') ? 'bg-secondary/20' : 'bg-neutral/10'
            }`}>
              {/* Book SVG (from Home) */}
              <svg
                className={`w-5 h-5 ${
                  isActive('/blogs') ? 'text-secondary' : 'text-neutral'
                }`}
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
            </span>
            <span className="text-xs">Blogs</span>
          </Link>
          <Link
            to="/letters"
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all ${
              isActive('/letters')
                ? 'bg-accent/10 text-accent font-semibold shadow-[0_4px_20px_0_rgba(236,72,153,0.10)]'
                : 'text-neutral opacity-80 hover:text-accent'
            }`}
          >
            <span className={`mb-1 flex items-center justify-center w-7 h-7 rounded-full ${
              isActive('/letters') ? 'bg-accent/20' : 'bg-neutral/10'
            }`}>
              {/* Envelope SVG (from Home) */}
              <svg
                className={`w-5 h-5 ${
                  isActive('/letters') ? 'text-accent' : 'text-neutral'
                }`}
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
            </span>
            <span className="text-xs">Letters</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 sm:pb-0">
        {children}
      </main>

      {/* Backdrop to close theme menu when clicking outside (mobile) */}
      <AnimatePresence>
        {isThemeMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 z-40"
            onClick={() => setIsThemeMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

