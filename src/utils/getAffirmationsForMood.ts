import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Mood } from '../types';

// Affirmation type matching Firebase structure
export interface AffirmationData {
  id: string;
  mood: Mood;
  imageSrc: string; // Maps to imageUrl from Firebase
}

/**
 * Fetches affirmation data for a given mood from Firebase.
 * Note: Lock checking is now done by the caller based on mood.isFree from Firebase.
 * This function always attempts to fetch affirmations if called.
 */
export async function getAffirmationsForMood(
  mood: string
): Promise<AffirmationData[] | 'LOCKED'> {
  try {
    // Fetch affirmations from Firebase
    const affirmationsRef = collection(db, 'affirmations');
    const q = query(
      affirmationsRef,
      where('mood', '==', mood),
      orderBy('createdAt', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // If no affirmations found, return empty array
      return [];
    }

    // Map Firebase documents to AffirmationData
    const affirmations: AffirmationData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      affirmations.push({
        id: doc.id,
        mood: data.mood as Mood,
        imageSrc: data.imageUrl || '', // Map imageUrl to imageSrc
      });
    });

    return affirmations;
  } catch (error) {
    console.error('Error fetching affirmations:', error);
    // Return empty array on error
    return [];
  }
}

