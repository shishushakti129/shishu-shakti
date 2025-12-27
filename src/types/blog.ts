// Blog type definitions

export interface Publisher {
  name: string;
  role: string;
  bio: string;
}

export interface CoverImage {
  url: string;
  alt: string;
}

export type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'image'; url: string; alt: string };

export interface Blog {
  id: string;
  slug: string;
  title: string;
  quickSummary: string;
  isFree: boolean;
  publisher: Publisher;
  publishedAt: string; // ISO date string
  readingTimeMinutes: number;
  coverImage: CoverImage;
  content: ContentBlock[];
}

