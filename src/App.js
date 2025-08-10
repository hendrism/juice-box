import React from 'react';
import { useGameState } from './hooks/useGameState';
import { 
  generateWeather, 
  getWeatherEffects, 
  checkPlayerDevelopment, 
  generateWeeklyEvent,
  shouldTriggerCrisis,
  generateKidLogicCrisis,
  updateParentSatisfaction,
  calculateGamePerformance,
  getWeatherSpecificEvents,
  calculateCoachingBonuses
} from './utils/gameLogic';
import { snacks, drinks, practiceActivities, weatherTypes } from './data/gameData';
import { GAME_PHASES, GAME_CONSTANTS } from './data/constants';
import { clamp } from './utils/helpers';

// Components
import GameStats from './components/GameStats';
import ParentGroups from './components/ParentGroups';
import PlayerRoster from './components/PlayerRoster';
import OffseasonPhase from './components/OffseasonPhase';
import PracticePhase from './components/PracticePhase';
import CrisisPhase from './components/CrisisPhase';
import GamePhase from './components/GamePhase';
import ResultsPhase from './components/ResultsPhase';

function App() {
  const {
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
  } = useGameState();

  const handleStartPractice = () => {
    if (!selectedSnack || !selectedDrink || !practiceActivity) {
      alert("Please select snack, drink, and practice activity!");
      return;
    }

    const snack = snacks.find(s => s.name === selectedSnack);
    const drink = drinks.find(d => d.name === selectedDrink);
    const activity = practiceActivities.find(a => a.name === practiceActivity);

    const totalCost = snack.cost + drink.cost;
    
    if (totalCost > gameState.budget) {
      alert("Not enough budget! Maybe ask parents to chip in?");
      return;
    }

    // Generate weather for this week
    const weather = generateWeather();
    const coachingBonuses = calculateCoachingBonuses(gameState.coachUpgrades);
    
    updateGameState({
      weather: weather.type,
      budget: gameState.budget - totalCost,
      teamMorale: clamp(
        gameState.teamMorale + (snack.morale || 0) + (drink.morale || 0) + activity.morale + coachingBonuses.morale, 
        0, 100
      )
    });

    // Apply weather effects to players
    setPlayers(prev => prev.map(player => {
      const weatherEffects = getWeatherEffects(weather.type, player);
      return {
        ...player,
        energy: clamp(player.energy + weatherEffects.energy + coachingBonuses.energy, 1, 10),
        skill: clamp(player.skill + weatherEffects.skill + coachingBonuses.skill, 1, 10)
      };
    }));

    // Update parent satisfaction
    const expensiveSnacks = snack.cost > 10 || drink.cost > 6;
    const { newSatisfaction, reactionMessages } = updateParentSatisfaction(gameState, 'practice', {
      activity: activity.name,
      snack: snack.name,
      drink: drink.name,
      weather: weather.type,
      expensive_snacks: expensiveSnacks,
      cheap_snacks: !expensiveSnacks
    });
    
    updateGameState({ groupSatisfaction: newSatisfaction });
    setParentReactions(reactionMessages);

    // Check player development
    const devNews = checkPlayerDevelopment(players, setPlayers, gameState.coachUpgrades);
    setDevelopmentNews(devNews);

    // Generate weekly event
    const weekEvent = generateWeeklyEvent();
    setWeeklyEvent(weekEvent);
    updateGameState({
      teamMorale: clamp(gameState.teamMorale + (weekEvent.effect.morale || 0), 0, 100)
    });

    // Check for crisis
    if (shouldTriggerCrisis(gameState.coachUpgrades)) {
      const crisis = generateKidLogicCrisis();
      updateGameState({ activeCrisis: crisis, currentPhase: GAME_PHASES.CRISIS });
    } else {
      updateGameState({ currentPhase: GAME_PHASES.GAME });
    }
  };

  const handleCrisisResponse = (response) => {
    const effects = response.effect;
    
    updateGameState({
      teamMorale: clamp(gameState.teamMorale + (effects.morale || 0), 0, 100),
      activeCrisis: null,
      currentPhase: GAME_PHASES.GAME
    });

    setPlayers(prev => prev.map(player => ({
      ...player,
      skill: clamp(player.skill + (effects.skill || 0), 1, 10),
      energy: clamp(player.energy + (effects.energy || 0), 1, 10)
    })));

    // Update parent satisfaction based on crisis handling
    const crisisType = response.type === 'creative' ? 'crisis_handled_creatively' : 
                      response.type === 'logical' ? 'crisis_handled_logically' : 'crisis_resolved_well';
    const { newSatisfaction, reactionMessages } = updateParentSatisfaction(gameState, crisisType);
    updateGameState({ groupSatisfaction: newSatisfaction });
    setParentReactions(prev => [...prev, ...reactionMessages]);
  };

  const handlePlayGame = () => {
    const snack = snacks.find(s => s.name === selectedSnack);
    const drink = drinks.find(d => d.name === selectedDrink);
    const activity = practiceActivities.find(a => a.name === practiceActivity);
    
    const gameResult = calculateGamePerformance(
      players, snack, drink, activity, gameState.weather, gameState
    );
    
    const weatherEvent = getWeatherSpecificEvents(gameState.weather);
    setGameEvents([weatherEvent]);
    
    updateGameState({
      wins: gameResult.won ? gameState.wins + 1 : gameState.wins,
      losses: !gameResult.won && !gameResult.tied ? gameState.losses + 1 : gameState.losses,
      teamMorale: clamp(
        gameState.teamMorale + (gameResult.won ? 10 : gameResult.tied ? 0 : -5), 
        0, 100
      ),
      currentPhase: GAME_PHASES.RESULTS,
      lastGameScore: `${gameResult.ourScore}-${gameResult.theirScore}`,
      lastGameResult: gameResult.result
    });

    // Update parent satisfaction based on game result
    const { newSatisfaction, reactionMessages } = updateParentSatisfaction(
      gameState, 
      gameResult.won ? 'win' : gameResult.tied ? 'tie' : 'loss'
    );
    updateGameState({ groupSatisfaction: newSatisfaction });
    setParentReactions(prev => [...prev, ...reactionMessages]);
  };

  const currentWeather = weatherTypes.find(w => w.type === gameState.weather) || weatherTypes[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          ⚽ Juice Box Tactics ⚽
        </h1>
        <p className="text-lg text-green-600">
          Where chaos meets cute and everyone gets a participation trophy!
        </p>
      </div>

      {/* Game Stats */}
      <GameStats gameState={gameState} />

      {/* Weather Display */}
      {gameState.currentPhase !== GAME_PHASES.OFFSEASON && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
          <div className="text-2xl mb-2">{currentWeather.icon} {currentWeather.name}</div>
          <div className="text-gray-600">{currentWeather.description}</div>
        </div>
      )}

      {/* Parent Groups */}
      <ParentGroups 
        gameState={gameState}
        parentReactions={parentReactions}
        averageParentSatisfaction={averageParentSatisfaction}
      />

      {/* Development News */}
      {developmentNews.length > 0 && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
          <h3 className="font-bold text-green-800 mb-2">🌟 Player Development News!</h3>
          {developmentNews.map((news, index) => (
            <p key={index} className="text-green-700">• {news}</p>
          ))}
        </div>
      )}

      {/* Weekly Event */}
      {weeklyEvent && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-800">📰 <strong>This Week:</strong> {weeklyEvent.text}</p>
        </div>
      )}

      {/* Phase-Specific Content */}
      {gameState.currentPhase === GAME_PHASES.OFFSEASON && (
        <OffseasonPhase 
          gameState={gameState}
          updateGameState={updateGameState}
          startNewSeason={startNewSeason}
        />
      )}

      {gameState.currentPhase === GAME_PHASES.CRISIS && (
        <CrisisPhase 
          crisis={gameState.activeCrisis}
          onCrisisResponse={handleCrisisResponse}
        />
      )}

      {gameState.currentPhase === GAME_PHASES.PLANNING && (
        <div className="space-y-6">
          <PlayerRoster players={players} gameState={gameState} />
          <PracticePhase 
            selectedSnack={selectedSnack}
            setSelectedSnack={setSelectedSnack}
            selectedDrink={selectedDrink}
            setSelectedDrink={setSelectedDrink}
            practiceActivity={practiceActivity}
            setPracticeActivity={setPracticeActivity}
            onStartPractice={handleStartPractice}
          />
        </div>
      )}

      {gameState.currentPhase === GAME_PHASES.GAME && (
        <GamePhase 
          gameState={gameState}
          onPlayGame={handlePlayGame}
        />
      )}

      {gameState.currentPhase === GAME_PHASES.RESULTS && (
        <ResultsPhase 
          gameState={gameState}
          gameEvents={gameEvents}
          averageParentSatisfaction={averageParentSatisfaction}
          onNextWeek={nextWeek}
        />
      )}
    </div>
  );
}

export default App;
