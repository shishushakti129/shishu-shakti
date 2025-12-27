import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface MoodData {
  key: string;
  label: string;
  description: string;
  isFree: boolean;
  order: number;
  emoji?: string; // Optional emoji field
}

// Emoji mapping for moods (fallback if not in Firebase)
const emojiMap: Record<string, string> = {
  overwhelmed: '🌊',
  exhausted: '😴',
  tired: '😴',
  guilty: '😔',
  lonely: '🌙',
  anxious: '💭',
  doubting: '🤔',
  raw: '💔',
  disconnected: '🌫️',
  strong_tired: '💪',
  hopeful_unsure: '🌱',
  hopeful: '🌱',
  calm: '✨',
};

/**
 * Fetches moods from Firebase
 */
export async function getMoods(): Promise<MoodData[]> {
  try {
    const moodsDoc = await getDoc(doc(db, 'affirmations', 'moods'));
    
    if (!moodsDoc.exists()) {
      console.warn('Moods document not found in Firebase');
      return [];
    }

    const data = moodsDoc.data();
    const moods: MoodData[] = data.moods || [];

    // Add emoji if not present in Firebase data
    return moods.map((mood) => ({
      ...mood,
      emoji: mood.emoji || emojiMap[mood.key] || '💫',
    }));
  } catch (error) {
    console.error('Error fetching moods:', error);
    return [];
  }
}

