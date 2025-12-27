import type { Mood } from '../types';

// Simplified Affirmation type for Phase-1 (using imageSrc instead of imageUrl)
export interface AffirmationData {
  id: string;
  mood: Mood;
  imageSrc: string;
}

/**
 * Returns affirmation data for a given mood.
 * Phase-1: Only 'overwhelmed' and 'tired' are unlocked with 5 placeholder images each.
 * All other moods return 'LOCKED'.
 */
export function getAffirmationsForMood(
  mood: Mood
): AffirmationData[] | 'LOCKED' {
  // Unlocked moods: overwhelmed and tired
  if (mood === 'overwhelmed' || mood === 'tired') {
    // Return 5 placeholder images (600x800)
    const affirmations: AffirmationData[] = [];
    for (let i = 0; i < 5; i++) {
      affirmations.push({
        id: `placeholder-${mood}-${i}`,
        mood,
        imageSrc: `https://picsum.photos/600/800?random=${mood}-${i}`,
      });
    }
    return affirmations;
  }

  // All other moods are locked
  return 'LOCKED';
}

