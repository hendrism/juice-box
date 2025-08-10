export const GAME_CONSTANTS = {
  SEASON_LENGTH: 10,
  STARTING_BUDGET: 150,
  WEEKLY_BUDGET: 25,
  STARTING_MORALE: 75,
  STARTING_PARENT_SATISFACTION: 60,
  MAX_DEVELOPMENT_POINTS: 5,
  CRISIS_CHANCE: 0.3,
  PLAYER_AVAILABILITY_CHANCE: 0.85,
  PARENT_GROUPS_COUNT: 3
};

export const GAME_PHASES = {
  PLANNING: 'planning',
  PRACTICE: 'practice', 
  GAME: 'game',
  RESULTS: 'results',
  CRISIS: 'crisis',
  OFFSEASON: 'offseason'
};

export const WEATHER_EFFECTS = {
  sunny: { bonus: 2, description: 'Perfect conditions boost performance' },
  rainy: { bonus: -1, description: 'Slippery conditions cause chaos' },
  windy: { bonus: -3, description: 'Strong winds affect ball control' },
  cloudy: { bonus: 0, description: 'Neutral weather' }
};

export const UPGRADE_CATEGORIES = {
  EQUIPMENT: 'equipment',
  COACHING: 'coaching', 
  SOCIAL: 'social',
  MANAGEMENT: 'management'
};
