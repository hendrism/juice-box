import { weatherTypes, randomEvents, kidLogicCrises } from '../data/gameData';
import { GAME_CONSTANTS, WEATHER_EFFECTS } from '../data/constants';

export const generateWeather = () => {
  return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
};

export const getWeatherEffects = (weather, player) => {
  let effects = { morale: 0, energy: 0, skill: 0 };
  
  switch (weather) {
    case 'rainy':
      if (player.name.includes('Lightning') || player.name.includes('Thunder')) {
        effects.morale = +5; 
        effects.energy = +3;
      } else if (player.name.includes('Sparkles')) {
        effects.morale = -8; 
        effects.energy = -5;
      }
      break;
    case 'windy':
      effects.skill = -2;
      if (player.quirk.includes('distracted')) {
        effects.morale = +5;
      }
      break;
    case 'cloudy':
      if (player.name.includes('Eagleye')) {
        effects.morale = +3;
      }
      break;
  }
  
  return effects;
};

export const calculateCoachingBonuses = (coachUpgrades) => {
  let bonuses = { 
    skill: 0, 
    energy: 0, 
    morale: 0, 
    organization: 0,
    developmentMultiplier: 1,
    weeklyBudgetBonus: 0
  };
  
  Object.entries(coachUpgrades).forEach(([upgradeId, owned]) => {
    if (!owned) return;
    
    switch (upgradeId) {
      case 'masterOrganizer':
        bonuses.organization += 2;
        break;
      case 'skillDeveloper':
        bonuses.skill += 1;
        bonuses.developmentMultiplier += 0.25;
        break;
      case 'teamBuilder':
        bonuses.morale += 5; // Applied at season start
        break;
      case 'budgetMaster':
        bonuses.weeklyBudgetBonus += 15;
        break;
    }
  });
  
  return bonuses;
};

export const checkPlayerDevelopment = (players, setPlayers, coachUpgrades) => {
  const news = [];
  const developmentMultiplier = coachUpgrades.skillDeveloper ? 1.25 : 1;
  
  setPlayers(prev => prev.map(player => {
    let newDevelopment = player.development + developmentMultiplier;
    let newQuirkSeverity = player.quirkSeverity;
    
    if (newDevelopment >= GAME_CONSTANTS.MAX_DEVELOPMENT_POINTS && player.quirkSeverity > 1) {
      newQuirkSeverity = Math.max(1, player.quirkSeverity - 1);
      newDevelopment = 0;
      
      const developmentMessages = {
        "Allergic to grass stains": "learned to embrace the mess!",
        "Only plays when wearing lucky socks": "is building confidence without the socks!",
        "Gets distracted by airplanes": "is staying more focused on the field!",
        "Goalkeeper who's afraid of the ball": "is getting braver in goal!",
        "Makes everyone laugh during serious moments": "is learning when to be serious!",
        "Runs in circles when excited": "is channeling excitement into better play!",
        "Kicks ball in wrong direction 20% of the time": "is improving their aim!",
        "Stops mid-game to tie shoes repeatedly": "is getting faster at shoe-tying!"
      };
      
      news.push(`${player.name} ${developmentMessages[player.quirk] || 'is improving!'}`);
    }
    
    return { ...player, development: newDevelopment, quirkSeverity: newQuirkSeverity };
  }));
  
  return news;
};

export const generateWeeklyEvent = () => {
  return randomEvents[Math.floor(Math.random() * randomEvents.length)];
};

export const shouldTriggerCrisis = (coachUpgrades) => {
  const baseCrisisChance = GAME_CONSTANTS.CRISIS_CHANCE;
  const preventionChance = coachUpgrades.crisisManager ? 0.5 : 0;
  
  return Math.random() < (baseCrisisChance - preventionChance);
};

export const generateKidLogicCrisis = () => {
  return kidLogicCrises[Math.floor(Math.random() * kidLogicCrises.length)];
};

export const updateParentSatisfaction = (gameState, eventType, eventData = {}) => {
  const reactions = {};
  
  gameState.parentGroups.forEach(group => {
    let change = 0;
    
    // Check for specific event reactions
    if (group.reactions[eventType]) {
      change += group.reactions[eventType];
    }
    
    // Check for activity-specific reactions
    if (eventData.activity && group.reactions[eventData.activity]) {
      change += group.reactions[eventData.activity];
    }
    
    // Check for snack reactions
    if (eventData.snack && group.reactions[eventData.snack]) {
      change += group.reactions[eventData.snack];
    }
    
    // Check for drink reactions  
    if (eventData.drink && group.reactions[eventData.drink]) {
      change += group.reactions[eventData.drink];
    }
    
    // Weather reactions
    if (eventData.weather && group.reactions[`${eventData.weather}_weather`]) {
      change += group.reactions[`${eventData.weather}_weather`];
    }
    
    // Apply parent whisperer effect
    if (change < 0 && gameState.coachUpgrades.parentWhisperer) {
      change = Math.floor(change * 0.5);
    }
    
    reactions[group.id] = change;
  });
  
  const newSatisfaction = Object.fromEntries(
    Object.entries(gameState.groupSatisfaction).map(([groupId, satisfaction]) => [
      groupId,
      Math.max(0, Math.min(100, satisfaction + (reactions[groupId] || 0)))
    ])
  );
  
  // Generate parent reaction messages
  const reactionMessages = [];
  Object.entries(reactions).forEach(([groupId, change]) => {
    const group = gameState.parentGroups.find(g => g.id === groupId);
    if (Math.abs(change) >= 3) {
      const emoji = change > 0 ? '😊' : '😠';
      reactionMessages.push(`${emoji} ${group.name}: ${change > 0 ? '+' : ''}${change}`);
    }
  });
  
  return { newSatisfaction, reactionMessages };
};

export const calculateGamePerformance = (players, snack, drink, activity, weather, gameState) => {
  const availablePlayers = players.filter(p => p.available);
  const coachingBonuses = calculateCoachingBonuses(gameState.coachUpgrades);
  
  let teamSkill = availablePlayers.reduce((sum, p) => sum + p.skill, 0) / availablePlayers.length;
  let teamEnergy = availablePlayers.reduce((sum, p) => sum + p.energy, 0) / availablePlayers.length;
  
  // Apply snack and drink bonuses
  teamEnergy += (snack?.energy || 0) + (drink?.energy || 0) + coachingBonuses.energy;
  teamSkill += (activity?.skill || 0) + coachingBonuses.skill;
  
  // Apply weather effects
  const weatherBonus = WEATHER_EFFECTS[weather]?.bonus || 0;
  teamSkill += weatherBonus;
  
  // Add morale bonus
  const moraleBonus = gameState.teamMorale > 75 ? 5 : gameState.teamMorale < 25 ? -5 : 0;
  teamSkill += moraleBonus;

  // Apply quirk penalties based on severity
  const quirkPenalty = availablePlayers.reduce((sum, p) => sum + p.quirkSeverity, 0) / availablePlayers.length;
  teamSkill -= quirkPenalty / 2;

  // Random opponent strength
  const opponentStrength = Math.random() * 15 + 5;
  
  const ourScore = Math.max(0, Math.floor((teamSkill + teamEnergy) / 4 + Math.random() * 3));
  const theirScore = Math.floor(opponentStrength / 3 + Math.random() * 3);
  
  const won = ourScore > theirScore;
  const tied = ourScore === theirScore;
  
  return {
    ourScore,
    theirScore,
    won,
    tied,
    result: won ? 'Win!' : tied ? 'Tie!' : 'Loss'
  };
};

export const getWeatherSpecificEvents = (weather) => {
  const weatherEvents = {
    sunny: [
      "The sunshine gave everyone extra energy - they're practically glowing!",
      "Perfect weather means perfect plays... well, mostly perfect."
    ],
    rainy: [
      "Half the team made mud angels during halftime!",
      "The ball became a slippery soap bar - chaos ensued!",
      "Lily discovered that sliding in mud is the best thing ever."
    ],
    windy: [
      "The wind turned every kick into a mystery - even Owen looked confused!",
      "Max got so distracted by leaves blowing around he forgot which goal was which.",
      "The wind helped Owen's backwards kick actually go forwards for once!"
    ],
    cloudy: [
      "The dramatic clouds made Emma feel like a superhero goalkeeper!",
      "The mysterious weather brought out everyone's inner soccer detective."
    ]
  };

  const events = weatherEvents[weather] || weatherEvents.sunny;
  return events[Math.floor(Math.random() * events.length)];
};
