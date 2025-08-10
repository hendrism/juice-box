import React from 'react';
import { Calendar, Trophy, Star, Coffee } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/helpers';

const GameStats = ({ gameState }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
        <div className="text-2xl font-bold text-blue-600">
          S{gameState.season} W{gameState.week}
        </div>
        <div className="text-sm text-gray-600">Season Progress</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
        <div className="text-2xl font-bold text-yellow-600">
          {gameState.wins}W - {gameState.losses}L
        </div>
        <div className="text-sm text-gray-600">Record</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Star className="w-6 h-6 mx-auto mb-2 text-pink-500" />
        <div className="text-2xl font-bold text-pink-600">
          {formatPercentage(gameState.teamMorale)}
        </div>
        <div className="text-sm text-gray-600">Team Morale</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <Coffee className="w-6 h-6 mx-auto mb-2 text-green-500" />
        <div className="text-2xl font-bold text-green-600">
          {formatCurrency(gameState.budget)}
        </div>
        <div className="text-sm text-gray-600">Budget</div>
      </div>
    </div>
  );
};

export default GameStats;
