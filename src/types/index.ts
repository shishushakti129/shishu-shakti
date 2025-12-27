// Type definitions for the application

export type Mood = 
  | 'overwhelmed' 
  | 'tired' 
  | 'anxious' 
  | 'lonely' 
  | 'hopeful' 
  | 'calm';

export type UserRole = 'free' | 'subscriber';

export interface User {
  uid: string;
  email: string;
  createdAt: Date;
  role: UserRole;
  affirmationViews?: number;
  blogViews?: number;
  letterViews?: number;
}

export interface Affirmation {
  id: string;
  mood: Mood;
  imageUrl: string;
  title?: string;
  createdAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  isFree: boolean;
}

export interface Letter {
  id: string;
  title: string;
  content: string;
  week: number;
  createdAt: Date;
  isFree: boolean;
}

