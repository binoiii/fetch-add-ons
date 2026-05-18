export const BASE_SCORE = 10

export const ADDONS = [
  {
    id: 'dental',
    label: 'Dental Care',
    emoji: '🦷',
    description: 'Sparkling clean teeth, every time',
    scoreBoost: 10,
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    emoji: '🥗',
    description: 'Optimised diet for a glossy coat',
    scoreBoost: 10,
  },
  {
    id: 'preventative',
    label: 'Preventative Care',
    emoji: '💊',
    description: 'Stop illness before it starts',
    scoreBoost: 12,
  },
  {
    id: 'vaccinations',
    label: 'Vaccinations',
    emoji: '🛡️',
    description: 'Full protection, guaranteed',
    scoreBoost: 12,
  },
  {
    id: 'emergency',
    label: 'Emergency Cover',
    emoji: '🚑',
    description: 'Peace of mind when it matters most',
    scoreBoost: 14,
  },
  {
    id: 'wellness',
    label: 'Wellness',
    emoji: '❤️',
    description: 'Holistic health checks, inside and out',
    scoreBoost: 11,
  },
  {
    id: 'grooming',
    label: 'Grooming',
    emoji: '✂️',
    description: 'Looking their best, always',
    scoreBoost: 10,
  },
  {
    id: 'mental',
    label: 'Mental Health',
    emoji: '🧠',
    description: 'A happy mind makes a happy pet',
    scoreBoost: 11,
  },
]
// Total boosts: 10+10+12+12+14+11+10+11 = 90, BASE_SCORE 10 → max 100
