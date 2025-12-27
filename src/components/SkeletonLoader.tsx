import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'image';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  variant = 'card',
}) => {
  if (variant === 'card') {
    return (
      <div className={`skeleton-gentle ${className}`}>
        <div className="h-64 w-full"></div>
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={`skeleton-gentle aspect-square ${className}`}></div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-3">
        <div className={`skeleton-gentle h-4 w-3/4 ${className}`}></div>
        <div className={`skeleton-gentle h-4 w-full ${className}`}></div>
        <div className={`skeleton-gentle h-4 w-5/6 ${className}`}></div>
      </div>
    );
  }

  return <div className={`skeleton-gentle ${className}`}></div>;
};

