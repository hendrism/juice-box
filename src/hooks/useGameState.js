import { useState, useEffect } from 'react';
import { parentGroupTypes, initialPlayers } from '../data/gameData';
import { GAME_CONSTANTS, GAME_PHASES } from '../data/constants';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    season: 1,
    week: 1,
    wins: 0,
    losses: 0,
    teamMorale: GAME_CONSTANTS.STARTING_MORALE,
    budget: GAME_CONSTANTS.STARTING_BUDGET,
    currentPhase: GAME_PHASES.PLANNING,
    weather: 'sunny',
    activeCrisis: null,
    parentGroups: [],
    groupSatisfaction: {},
    coachUpgrades: {},
    experience: 0,
    lastGameScore: '',
    lastGameResult: ''
  });

  const [players, setPlayers] = useState(initialPlayers);
  const [selectedSnack, setSelectedSnack] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  const [practiceActivity, setPracticeActivity] = useState('');
  const [gameEvents, setGameEvents] = useState([]);
  const [weeklyEvent, setWeeklyEvent] = useState(null);
  const [developmentNews, setDevelopmentNews] = useState([]);
  const [parentReactions, setParentReactions] = useState([]);

  // Initialize parent groups on first load
  useEffect(() => {
    if (gameState.parentGroups.length === 0) {
      const shuffled = [...parentGroupTypes].sort(() => Math.random() - 0.5);
      const selectedGroups = shuffled.slice(0, GAME_CONSTANTS.PARENT_GROUPS_COUNT);
      const initialSatisfaction = {};
      
      selectedGroups.forEach(group => {
        initialSatisfaction[group.id] = GAME_CONSTANTS.STARTING_PARENT_SATISFACTION + 
          (gameState.coachUpgrades.veteranCoach ? 10 : 0);
      });
      
      setGameState(prev => ({
        ...prev,
        parentGroups: selectedGroups,
        groupSatisfaction: initialSatisfaction
      }));
    }
  }, [gameState.parentGroups.length, gameState.coachUpgrades.veteranCoach]);

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const resetWeeklySelections = () => {
    setSelectedSnack('');
    setSelectedDrink('');
    setPracticeActivity('');
    setGameEvents([]);
    setWeeklyEvent(null);
    setDevelopmentNews([]);
    setParentReactions([]);
  };

  const nextWeek = () => {
    // Check if season is over
    if (gameState.week >= GAME_CONSTANTS.SEASON_LENGTH) {
      // Calculate experience earned
      const winBonus = gameState.wins * 5;
      const satisfactionBonus = Math.floor(averageParentSatisfaction() / 10);
      const developmentBonus = players.reduce((sum, p) => sum + (5 - p.quirkSeverity), 0);
      const totalExperience = winBonus + satisfactionBonus + developmentBonus;

      updateGameState({
        currentPhase: GAME_PHASES.OFFSEASON,
        experience: gameState.experience + totalExperience
      });
    } else {
      // Random player availability changes
      setPlayers(prev => prev.map(player => ({
        ...player,
        available: Math.random() < GAME_CONSTANTS.PLAYER_AVAILABILITY_CHANCE
      })));

      updateGameState({
        week: gameState.week + 1,
        budget: gameState.budget + GAME_CONSTANTS.WEEKLY_BUDGET + 
               (gameState.coachUpgrades.budgetMaster ? 15 : 0),
        currentPhase: GAME_PHASES.PLANNING
      });

      resetWeeklySelections();
    }
  };

  const startNewSeason = () => {
    // Reset seasonal stats but keep upgrades and experience
    updateGameState({
      season: gameState.season + 1,
      week: 1,
      wins: 0,
      losses: 0,
      teamMorale: GAME_CONSTANTS.STARTING_MORALE + (gameState.coachUpgrades.teamBuilder ? 15 : 0),
      budget: GAME_CONSTANTS.STARTING_BUDGET,
      currentPhase: GAME_PHASES.PLANNING,
      weather: 'sunny',
      activeCrisis: null
    });

    // Reset players but keep some development
    setPlayers(prev => prev.map(player => ({
      ...player,
      available: true,
      energy: Math.min(10, player.energy + 1), // Slight improvement over seasons
      development: 0
    })));

    resetWeeklySelections();
  };

  const averageParentSatisfaction = () => {
    const values = Object.values(gameState.groupSatisfaction);
    return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  };

  return {
    gameState,
    players,
    selectedSnack,
    selectedDrink,
    practiceActivity,
    gameEvents,
    weeklyEvent,
    developmentNews,
    parentReactions,
    setPlayers,
    setSelectedSnack,
    setSelectedDrink,
    setPracticeActivity,
    setGameEvents,
    setWeeklyEvent,
    setDevelopmentNews,
    setParentReactions,
    updateGameState,
    nextWeek,
    startNewSeason,
    averageParentSatisfaction
  };
};
