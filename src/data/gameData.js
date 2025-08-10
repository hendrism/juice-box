export const parentGroupTypes = [
  {
    id: 'formerAthletes',
    name: '🏆 Former Athletes',
    description: 'Want real soccer training, tactics, and wins',
    reactions: {
      'Skill Drills': +8, 'Scrimmage': +5, 'Conditioning': +6, 'Fun Games': -3, 'Team Building': -5,
      'win': +10, 'loss': -8, 'tie': -2
    }
  },
  {
    id: 'funFirst',
    name: '🎉 Fun-First Families', 
    description: 'Just want kids to smile and make friends',
    reactions: {
      'Fun Games': +10, 'Team Building': +8, 'Scrimmage': +3, 'Skill Drills': -3, 'Conditioning': -6,
      'win': +3, 'loss': +2, 'tie': +5
    }
  },
  {
    id: 'helicopters',
    name: '🚁 Helicopter Squadron',
    description: 'Need detailed explanations for every decision',
    reactions: {
      'Skill Drills': +3, 'Conditioning': +2, 'Team Building': +1, 'Fun Games': -1,
      'crisis_resolved_well': +5, 'crisis_resolved_poorly': -8
    }
  },
  {
    id: 'fairPlay',
    name: '⚖️ Fair Play Advocates',
    description: 'Obsess over equal playing time and inclusion',
    reactions: {
      'Team Building': +8, 'Fun Games': +5, 'Scrimmage': +3,
      'win': +2, 'loss': +3, 'tie': +6
    }
  },
  {
    id: 'healthSafety',
    name: '🥗 Health & Safety Coalition',
    description: 'Worry about injuries, nutrition, weather',
    reactions: {
      'Conditioning': +6, 'Orange Slices': +5, 'Water': +4, 'Cookies': -4,
      'rainy_weather': -5, 'sunny_weather': +2
    }
  },
  {
    id: 'budgetHawks',
    name: '💰 Budget Hawks',
    description: 'Question every expense but appreciate good management',
    reactions: {
      'expensive_snacks': -6, 'cheap_snacks': +4, 'equipment_purchase': +3,
      'Orange Slices': +3, 'Water': +4, 'Cookies': -5
    }
  },
  {
    id: 'chaosEmbraces',
    name: '🎪 Chaos Embracers',
    description: 'Love silly moments and kid logic',
    reactions: {
      'Fun Games': +6, 'crisis_handled_creatively': +8, 'Team Building': +4,
      'crisis_handled_logically': -3
    }
  }
];

export const coachUpgrades = [
  {
    id: 'masterOrganizer',
    name: 'Master Organizer',
    cost: 15,
    description: 'Professional organization skills from years of experience',
    effect: 'All practices +2 organization, fewer chaotic incidents',
    category: 'equipment',
    bonus: { organization: 2 }
  },
  {
    id: 'skillDeveloper',
    name: 'Skill Developer',
    cost: 20,
    description: 'Expert at nurturing young talent',
    effect: 'All players develop 25% faster, +1 skill to training activities',
    category: 'coaching',
    bonus: { developmentBonus: 0.25, skillBonus: 1 }
  },
  {
    id: 'teamBuilder',
    name: 'Team Builder',
    cost: 18,
    description: 'Creates lasting team spirit and camaraderie',
    effect: 'Start each season with +15 base morale',
    category: 'coaching',
    bonus: { startingMorale: 15 }
  },
  {
    id: 'parentWhisperer',
    name: 'Parent Whisperer',
    cost: 25,
    description: 'Diplomatic master of parent relations',
    effect: 'Unlock diplomatic crisis responses, 50% slower parent satisfaction decay',
    category: 'social',
    bonus: { parentDecayReduction: 0.5, diplomaticOptions: true }
  },
  {
    id: 'kidPsychologist',
    name: 'Kid Psychology Expert',
    cost: 22,
    description: 'Understands the mysterious ways of 8-year-old minds',
    effect: 'See player development progress, predict availability issues',
    category: 'coaching',
    bonus: { showDevelopment: true, predictAvailability: true }
  },
  {
    id: 'crisisManager',
    name: 'Crisis Manager',
    cost: 30,
    description: 'Expert at preventing and handling kid logic situations',
    effect: '50% chance to prevent Kid Logic Crises through early intervention',
    category: 'social',
    bonus: { crisisPrevention: 0.5 }
  },
  {
    id: 'budgetMaster',
    name: 'Budget Master',
    cost: 20,
    description: 'Fundraising and financial management skills',
    effect: '+15 weekly budget, unlock fundraiser events',
    category: 'management',
    bonus: { weeklyBudgetBonus: 15, unlockFundraisers: true }
  },
  {
    id: 'weatherReader',
    name: 'Weather Reader',
    cost: 15,
    description: 'Always prepared for any weather condition',
    effect: 'See next week\'s weather, unlock weather-specific activities',
    category: 'management',
    bonus: { weatherPreview: true, weatherActivities: true }
  },
  {
    id: 'veteranCoach',
    name: 'Veteran Coach',
    cost: 25,
    description: 'Years of experience command respect',
    effect: 'Start with +10 parent satisfaction across all groups',
    category: 'social',
    bonus: { startingParentSatisfaction: 10 }
  }
];

export const weatherTypes = [
  { type: 'sunny', icon: '☀️', name: 'Sunny', description: 'Perfect soccer weather!' },
  { type: 'rainy', icon: '🌧️', name: 'Rainy', description: 'Puddles everywhere!' },
  { type: 'windy', icon: '💨', name: 'Windy', description: 'The ball has a mind of its own!' },
  { type: 'cloudy', icon: '☁️', name: 'Cloudy', description: 'Mysterious and dramatic!' }
];

export const kidLogicCrises = [
  {
    id: 'quicksand',
    title: "The Quicksand Conspiracy",
    description: "The entire team has decided that the center circle is actually quicksand and refuses to go near it.",
    responses: [
      { text: "Play along and make it a 'rescue mission' game", effect: { morale: +15, skill: +2, energy: -2 }, type: 'creative' },
      { text: "Logically explain that it's just paint on grass", effect: { morale: -5, skill: +3, energy: 0 }, type: 'logical' },
      { text: "Declare yourself the 'Quicksand Expert' and demonstrate safety", effect: { morale: +8, skill: +1, parentBonus: +5 }, type: 'authoritative' }
    ]
  },
  {
    id: 'robot_opponents',
    title: "Robot Soccer Invasion",
    description: "Your team is convinced the opposing team are actually robots sent to steal their soccer skills.",
    responses: [
      { text: "Develop 'anti-robot' strategies and secret signals", effect: { morale: +12, skill: +3, energy: +2 }, type: 'creative' },
      { text: "Suggest they're friendly robots who just want to play", effect: { morale: +5, skill: 0, energy: 0 }, type: 'diplomatic' },
      { text: "Ignore the conspiracy and focus on regular soccer", effect: { morale: -8, skill: +2, energy: -3 }, type: 'logical' }
    ]
  },
  {
    id: 'goalkeeper_uprising',
    title: "The Great Goalkeeper Rebellion",
    description: "Everyone wants to be the goalkeeper at the same time. ALL of them. They're forming a goalkeeper union.",
    responses: [
      { text: "Create a rotation system where everyone gets 2 minutes in goal", effect: { morale: +10, skill: -2, energy: -1 }, type: 'diplomatic' },
      { text: "Hold 'goalkeeper tryouts' with ridiculous challenges", effect: { morale: +8, skill: +1, energy: +3 }, type: 'creative' },
      { text: "Explain that having 8 goalkeepers might be overkill", effect: { morale: -3, skill: +2, parentBonus: -2 }, type: 'logical' }
    ]
  },
  {
    id: 'invisible_opponent',
    title: "The Invisible Player Problem",
    description: "The team insists there's an invisible player on the field who keeps stealing the ball. They want to protest to the referee.",
    responses: [
      { text: "Assign someone to 'mark' the invisible player", effect: { morale: +14, skill: +1, energy: +1 }, type: 'creative' },
      { text: "Teach them 'anti-invisibility' soccer techniques", effect: { morale: +9, skill: +4, energy: 0 }, type: 'creative' },
      { text: "Suggest maybe they just need to focus more", effect: { morale: -6, skill: +1, energy: -2 }, type: 'logical' }
    ]
  },
  {
    id: 'ball_rebellion',
    title: "The Ball Has Feelings",
    description: "Your team has decided the soccer ball has feelings and is sad because everyone keeps kicking it. They want to comfort it instead of playing.",
    responses: [
      { text: "Explain that the ball loves being kicked - it's its purpose!", effect: { morale: +7, skill: +2, energy: 0 }, type: 'logical' },
      { text: "Have a team meeting to 'ask the ball' what it wants", effect: { morale: +11, skill: 0, energy: +2 }, type: 'creative' },
      { text: "Suggest gentle 'ball therapy' through careful dribbling", effect: { morale: +13, skill: +3, energy: +1 }, type: 'creative' }
    ]
  }
];

export const snacks = [
  { name: "Orange Slices", cost: 5, morale: +5, energy: +3, description: "Classic and healthy!" },
  { name: "Juice Boxes", cost: 10, morale: +8, energy: +5, description: "Sugar rush incoming!" },
  { name: "Granola Bars", cost: 8, morale: +3, energy: +7, description: "Nutritious but not exciting" },
  { name: "Cookies", cost: 15, morale: +15, energy: +2, description: "Pure joy, zero nutrition" },
  { name: "Fruit Gummies", cost: 12, morale: +10, energy: +4, description: "Technically fruit?" }
];

export const drinks = [
  { name: "Water", cost: 2, energy: +5, description: "Boring but necessary" },
  { name: "Sports Drink", cost: 8, energy: +8, morale: +3, description: "Makes them feel professional" },
  { name: "Chocolate Milk", cost: 6, energy: +6, morale: +7, description: "Post-practice favorite" },
  { name: "Capri Sun", cost: 5, energy: +4, morale: +10, description: "Impossible to open pouches" }
];

export const practiceActivities = [
  { name: "Scrimmage", skill: +2, energy: -3, morale: +5, description: "Fun but chaotic" },
  { name: "Skill Drills", skill: +5, energy: -5, morale: -2, description: "Boring but effective" },
  { name: "Fun Games", skill: +1, energy: -1, morale: +8, description: "Red light, green light soccer!" },
  { name: "Conditioning", skill: +1, energy: +3, morale: -5, description: "They'll hate you but thank you later" },
  { name: "Team Building", skill: 0, energy: 0, morale: +10, description: "Trust falls and friendship bracelets" }
];

export const initialPlayers = [
  { id: 1, name: "Timmy Thunder", skill: 7, energy: 8, available: true, 
    quirk: "Allergic to grass stains", quirkSeverity: 3, development: 0 },
  { id: 2, name: "Sophie Sparkles", skill: 9, energy: 6, available: true, 
    quirk: "Only plays when wearing lucky socks", quirkSeverity: 4, development: 0 },
  { id: 3, name: "Max Mayhem", skill: 5, energy: 10, available: true, 
    quirk: "Gets distracted by airplanes", quirkSeverity: 3, development: 0 },
  { id: 4, name: "Emma Eagleye", skill: 8, energy: 7, available: true, 
    quirk: "Goalkeeper who's afraid of the ball", quirkSeverity: 5, development: 0 },
  { id: 5, name: "Jake Jokester", skill: 6, energy: 9, available: true, 
    quirk: "Makes everyone laugh during serious moments", quirkSeverity: 2, development: 0 },
  { id: 6, name: "Lily Lightning", skill: 8, energy: 8, available: true, 
    quirk: "Runs in circles when excited", quirkSeverity: 3, development: 0 },
  { id: 7, name: "Owen Oops", skill: 4, energy: 6, available: true, 
    quirk: "Kicks ball in wrong direction 20% of the time", quirkSeverity: 4, development: 0 },
  { id: 8, name: "Zoe Zoom", skill: 7, energy: 9, available: true, 
    quirk: "Stops mid-game to tie shoes repeatedly", quirkSeverity: 3, development: 0 }
];

export const randomEvents = [
  { text: "Timmy's mom brought homemade cookies for everyone!", effect: { morale: +10 } },
  { text: "A player is out because they have a dentist appointment during the game.", effect: { teamMorale: -5 } },
  { text: "Jake told such a good joke that practice dissolved into giggles for 15 minutes.", effect: { morale: +8, skill: -2 } },
  { text: "Emma finally caught the ball! The team erupts in celebration.", effect: { morale: +12, skill: +3 } },
  { text: "Max got distracted by a butterfly and wandered off the field.", effect: { energy: -3 } },
  { text: "Sophie forgot her lucky socks and refuses to play.", effect: { skill: -5, morale: -3 } },
  { text: "The team found a four-leaf clover and believes they're invincible now.", effect: { morale: +15 } },
  { text: "Owen kicked the ball into his own goal during practice. Everyone thinks it's hilarious.", effect: { morale: +5, skill: -1 } },
  { text: "Lily ran so many victory laps she got dizzy and fell over.", effect: { energy: -2, morale: +3 } }
];
