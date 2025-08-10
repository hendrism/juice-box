import React from 'react';
import { Users } from 'lucide-react';

const PlayerRoster = ({ players, gameState }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        <Users className="inline w-6 h-6 mr-2" />
        Team Roster
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(player => (
          <div 
            key={player.id} 
            className={`p-3 rounded-lg border-2 ${
              player.available ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="font-semibold">{player.name}</div>
            <div className="text-sm text-gray-600">
              Skill: {player.skill}/10 | Energy: {player.energy}/10
            </div>
            <div className="text-xs italic text-blue-600">
              {player.quirk} {player.quirkSeverity > 1 && `(Level ${player.quirkSeverity})`}
            </div>
            {gameState.coachUpgrades.kidPsychologist && (
              <div className="text-xs text-purple-600">
                Development: {Math.floor(player.development)}/5 towards improvement
              </div>
            )}
            {!player.available && (
              <div className="text-xs text-red-600 font-semibold">
                UNAVAILABLE: Family beach trip
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRoster;
