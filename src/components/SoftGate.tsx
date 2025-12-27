import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SoftGateProps {
  children: React.ReactNode;
  isLocked: boolean;
  onUnlock?: () => void;
  message?: string;
}

/**
 * SoftGate component - Gentle overlay for content gating
 * Never uses aggressive language, always warm and inviting
 */
export const SoftGate: React.FC<SoftGateProps> = ({
  children,
  isLocked,
  onUnlock,
  message = "Create a gentle space for yourself to continue.",
}) => {
  const { signInWithGoogle, user } = useAuth();

  const handleContinue = async () => {
    if (!user) {
      try {
        await signInWithGoogle();
        if (onUnlock) onUnlock();
      } catch (error) {
        console.error('Sign in error:', error);
      }
    } else if (onUnlock) {
      onUnlock();
    }
  };

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="blur-sm pointer-events-none select-none opacity-50">
        {children}
      </div>

      {/* Gentle overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-base-100/80 backdrop-blur-sm rounded-2xl">
        <div className="text-center px-6 py-8 max-w-md">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-primary opacity-60"
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
          
          <p className="text-lg text-neutral mb-6 leading-relaxed">
            {message}
          </p>
          
          <button
            onClick={handleContinue}
            className="btn-gentle btn-primary w-full sm:w-auto"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

