import type { Blog } from '../types/blog';

export const mockBlogs: Blog[] = [
  {
    id: '1',
    slug: 'embracing-the-journey-of-motherhood',
    title: 'Embracing the Journey of Motherhood',
    quickSummary: 'A gentle guide to finding peace and presence in your daily moments as a new mother.',
    isFree: true,
    publisher: {
      name: 'Dr. Sarah Chen',
      role: 'Mindfulness Coach & Mother',
      bio: 'Sarah is a certified mindfulness coach with over 10 years of experience supporting new mothers through their journey.',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    readingTimeMinutes: 5,
    coverImage: {
      url: 'https://picsum.photos/800/400?random=1',
      alt: 'A peaceful moment of motherhood',
    },
    content: [
      { type: 'paragraph', text: 'Motherhood is a journey unlike any other. It\'s filled with moments of pure joy, overwhelming love, and yes, sometimes exhaustion and doubt. Today, I want to share with you some gentle reminders that have helped me and countless other mothers find peace in the beautiful chaos.' },
      { type: 'paragraph', text: 'Every mother\'s journey is unique. There\'s no perfect way to be a mother, and that\'s exactly what makes it beautiful. Your instincts, your love, your presence—these are the most important gifts you can give your child.' },
      { type: 'image', url: 'https://picsum.photos/600/400?random=2', alt: 'A mother and child sharing a quiet moment' },
      { type: 'paragraph', text: 'Remember to breathe. In those moments when everything feels too much, take a deep breath. You are doing enough. You are enough. This moment will pass, and you\'ll find your rhythm again.' },
      { type: 'paragraph', text: 'Self-care isn\'t selfish—it\'s essential. Taking time for yourself isn\'t taking away from your child; it\'s giving them a healthier, happier mother. Even five minutes of quiet can make a world of difference.' },
    ],
  },
  {
    id: '2',
    slug: 'finding-calm-in-chaos',
    title: 'Finding Calm in the Chaos',
    quickSummary: 'Practical strategies for managing stress and finding moments of peace during those overwhelming days.',
    isFree: true,
    publisher: {
      name: 'Emma Rodriguez',
      role: 'Wellness Expert',
      bio: 'Emma specializes in helping mothers navigate the emotional challenges of early motherhood with grace and self-compassion.',
    },
    publishedAt: '2024-01-20T14:30:00Z',
    readingTimeMinutes: 7,
    coverImage: {
      url: 'https://picsum.photos/800/400?random=3',
      alt: 'A serene moment of reflection',
    },
    content: [
      { type: 'paragraph', text: 'We\'ve all been there—those days when the laundry is piling up, the baby won\'t stop crying, and you haven\'t had a moment to yourself. In these moments, finding calm can feel impossible, but it\'s not.' },
      { type: 'paragraph', text: 'Start with acceptance. Accept that this moment is challenging. Accept that you\'re doing your best. Acceptance doesn\'t mean giving up; it means acknowledging reality without judgment.' },
      { type: 'image', url: 'https://picsum.photos/600/400?random=4', alt: 'A peaceful morning routine' },
      { type: 'paragraph', text: 'Create micro-moments of peace. You don\'t need hours of meditation. A few deep breaths while the baby naps, a moment of gratitude before bed, or simply noticing the warmth of your morning coffee—these small moments add up.' },
      { type: 'paragraph', text: 'Remember, chaos is temporary. This phase, these challenges, they will pass. And in the meantime, you\'re learning, growing, and becoming the mother your child needs you to be.' },
      { type: 'image', url: 'https://picsum.photos/600/400?random=5', alt: 'A mother finding peace in nature' },
      { type: 'paragraph', text: 'Be gentle with yourself. You\'re navigating one of life\'s most profound transitions. Give yourself the same compassion you would give a dear friend going through the same experience.' },
    ],
  },
  {
    id: '3',
    slug: 'the-power-of-self-compassion',
    title: 'The Power of Self-Compassion',
    quickSummary: 'Learn how treating yourself with kindness can transform your motherhood experience.',
    isFree: false,
    publisher: {
      name: 'Dr. Maya Patel',
      role: 'Clinical Psychologist',
      bio: 'Dr. Patel has dedicated her career to supporting maternal mental health and wellbeing.',
    },
    publishedAt: '2024-02-01T09:15:00Z',
    readingTimeMinutes: 6,
    coverImage: {
      url: 'https://picsum.photos/800/400?random=6',
      alt: 'A moment of self-reflection',
    },
    content: [
      { type: 'paragraph', text: 'Self-compassion might be the most important skill you can develop as a mother. It\'s not about being perfect or never making mistakes. It\'s about treating yourself with the same kindness and understanding you show your child.' },
      { type: 'paragraph', text: 'When you make a mistake—and you will, because you\'re human—self-compassion allows you to learn from it without spiraling into self-criticism. It helps you recognize that imperfection is part of the human experience, not a personal failing.' },
      { type: 'image', url: 'https://picsum.photos/600/400?random=7', alt: 'A mother practicing self-care' },
      { type: 'paragraph', text: 'Research shows that self-compassionate mothers experience less anxiety, depression, and stress. They\'re also more present and attuned to their children\'s needs. When you\'re kind to yourself, you have more emotional resources to give to your child.' },
      { type: 'paragraph', text: 'Try this: When you notice self-critical thoughts, pause and ask yourself: "What would I say to a friend in this situation?" Then, say those kind words to yourself. You deserve the same compassion you so freely give to others.' },
    ],
  },
  {
    id: '4',
    slug: 'building-your-support-network',
    title: 'Building Your Support Network',
    quickSummary: 'Why having a village matters and how to create one that truly supports you.',
    isFree: false,
    publisher: {
      name: 'Lisa Thompson',
      role: 'Community Builder',
      bio: 'Lisa helps mothers build meaningful connections and support systems in their communities.',
    },
    publishedAt: '2024-02-10T11:00:00Z',
    readingTimeMinutes: 8,
    coverImage: {
      url: 'https://picsum.photos/800/400?random=8',
      alt: 'A group of mothers supporting each other',
    },
    content: [
      { type: 'paragraph', text: 'They say it takes a village to raise a child, but it also takes a village to support a mother. Building a strong support network isn\'t a luxury—it\'s a necessity for your wellbeing and your child\'s.' },
      { type: 'paragraph', text: 'Your support network can include family, friends, other mothers, healthcare providers, and community resources. Each person plays a different role, and that\'s okay. Some might provide emotional support, others practical help, and some might just be there to listen.' },
      { type: 'image', url: 'https://picsum.photos/600/400?random=9', alt: 'Mothers connecting at a playgroup' },
      { type: 'paragraph', text: 'Don\'t be afraid to ask for help. Many mothers struggle with this, but remember: asking for help is a sign of strength, not weakness. It shows you understand your limits and are willing to prioritize your wellbeing.' },
      { type: 'paragraph', text: 'Start small. Reach out to one person. Join a local mothers\' group. Connect with other parents at the park. Building a support network takes time, but every connection matters.' },
    ],
  },
];

