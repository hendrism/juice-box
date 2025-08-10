import React from 'react';
import { formatPercentage } from '../utils/helpers';

const ResultsPhase = ({ gameState, gameEvents, averageParentSatisfaction, onNextWeek }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Game Results! 📊</h2>
      <div className="text-4xl font-bold mb-4">
        <span className={
          gameState.lastGameResult === 'Win!' ? 'text-green-600' : 
          gameState.lastGameResult === 'Tie!' ? 'text-yellow-600' : 'text-red-600'
        }>
          {gameState.lastGameResult}
        </span>
      </div>
      <div className="text-2xl mb-4">Final Score: {gameState.lastGameScore}</div>
      
      {gameEvents.map((event, index) => (
        <div key={index} className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-blue-800">🎬 <strong>Game Highlight:</strong> {event}</p>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-pink-800">Team Morale</div>
          <div className="text-2xl font-bold text-pink-600">
            {formatPercentage(gameState.teamMorale)}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-purple-800">Average Parent Satisfaction</div>
          <div className="text-2xl font-bold text-purple-600">
            {formatPercentage(averageParentSatisfaction())}
          </div>
        </div>
      </div>

      <button 
        onClick={onNextWeek}
        className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
      >
        Next Week! 📅
      </button>
    </div>
  );
};

export default ResultsPhase;
