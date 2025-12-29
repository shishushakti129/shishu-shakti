import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export type Letter = {
  id: string;
  title: string;
  week: string;
  content: string;
  author: string;
  publishedAt: string;
  isFree: boolean;
};

/**
 * Fetches all free letters from Firestore
 */
export const getFreeLetters = async (): Promise<Letter[]> => {
  try {
    const freeItemsRef = collection(db, 'letters', 'free', 'items');
    const q = query(freeItemsRef, orderBy('publishedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const letters: Letter[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      letters.push({
        id: doc.id,
        title: data.title,
        week: data.week,
        content: data.content,
        author: data.author,
        publishedAt: data.publishedAt instanceof Timestamp
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt || new Date().toISOString(),
        isFree: true,
      });
    });

    return letters;
  } catch (error) {
    console.error('Error fetching free letters:', error);
    return [];
  }
};

/**
 * Fetches all subscribed letters from Firestore
 */
export const getSubscribedLetters = async (): Promise<Letter[]> => {
  try {
    const subscribedItemsRef = collection(db, 'letters', 'subscribed', 'items');
    const q = query(subscribedItemsRef, orderBy('publishedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const letters: Letter[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      letters.push({
        id: doc.id,
        title: data.title,
        week: data.week,
        content: data.content,
        author: data.author,
        publishedAt: data.publishedAt instanceof Timestamp
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt || new Date().toISOString(),
        isFree: false,
      });
    });

    return letters;
  } catch (error) {
    console.error('Error fetching subscribed letters:', error);
    return [];
  }
};

/**
 * Fetches all letters (free + subscribed) based on authentication state
 */
export const getAllLetters = async (isAuthenticated: boolean): Promise<Letter[]> => {
  const freeLetters = await getFreeLetters();
  
  if (isAuthenticated) {
    const subscribedLetters = await getSubscribedLetters();
    return [...freeLetters, ...subscribedLetters].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }

  return freeLetters;
};

/**
 * Fetches a single letter by ID from Firestore
 */
export const getLetterById = async (letterId: string): Promise<Letter | null> => {
  try {
    // Try free letters first
    const freeItemsRef = collection(db, 'letters', 'free', 'items');
    const freeQuerySnapshot = await getDocs(freeItemsRef);
    
    let letterDoc = freeQuerySnapshot.docs.find(doc => doc.id === letterId);
    let isFree = true;

    // If not found in free, try subscribed
    if (!letterDoc) {
      const subscribedItemsRef = collection(db, 'letters', 'subscribed', 'items');
      const subscribedQuerySnapshot = await getDocs(subscribedItemsRef);
      letterDoc = subscribedQuerySnapshot.docs.find(doc => doc.id === letterId);
      isFree = false;
    }

    if (!letterDoc) {
      return null;
    }

    const data = letterDoc.data();
    return {
      id: letterDoc.id,
      title: data.title,
      week: data.week,
      content: data.content,
      author: data.author,
      publishedAt: data.publishedAt instanceof Timestamp
        ? data.publishedAt.toDate().toISOString()
        : data.publishedAt || new Date().toISOString(),
      isFree,
    };
  } catch (error) {
    console.error('Error fetching letter by ID:', error);
    return null;
  }
};

