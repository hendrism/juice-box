import React from 'react';
import { Star, Trophy } from 'lucide-react';
import { coachUpgrades } from '../data/gameData';
import { UPGRADE_CATEGORIES } from '../data/constants';
import { getUpgradeCategoryIcon, getUpgradeCategoryColor, formatCurrency } from '../utils/helpers';

const OffseasonPhase = ({ gameState, updateGameState, startNewSeason }) => {
  const purchaseUpgrade = (upgradeId) => {
    const upgrade = coachUpgrades.find(u => u.id === upgradeId);
    if (upgrade && gameState.experience >= upgrade.cost && !gameState.coachUpgrades[upgradeId]) {
      updateGameState({
        experience: gameState.experience - upgrade.cost,
        coachUpgrades: { ...gameState.coachUpgrades, [upgradeId]: true }
      });
    }
  };

  const groupedUpgrades = coachUpgrades.reduce((acc, upgrade) => {
    if (!acc[upgrade.category]) acc[upgrade.category] = [];
    acc[upgrade.category].push(upgrade);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Season Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-800">
          <Trophy className="inline w-8 h-8 mr-2" />
          Season {gameState.season} Complete!
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{gameState.wins}</div>
            <div className="text-sm text-green-800">Wins</div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{gameState.losses}</div>
            <div className="text-sm text-red-800">Losses</div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{gameState.experience}</div>
            <div className="text-sm text-purple-800">Experience Points</div>
          </div>
        </div>
        <p className="text-lg text-gray-700 mb-4">
          Time to invest in your coaching development for next season!
        </p>
      </div>

      {/* Coach Upgrade Shop */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
          <Star className="inline w-6 h-6 mr-2" />
          Coach Development Center
        </h2>
        <p className="text-gray-600 mb-6">
          Experience Points Available: <span className="font-bold text-purple-600">{gameState.experience}</span>
        </p>

        {Object.entries(groupedUpgrades).map(([category, upgrades]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {getUpgradeCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)} Upgrades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upgrades.map(upgrade => {
                const owned = gameState.coachUpgrades[upgrade.id];
                const canAfford = gameState.experience >= upgrade.cost;
                
                return (
                  <div 
                    key={upgrade.id} 
                    className={`p-4 rounded-lg border-2 ${
                      owned ? 'bg-green-100 border-green-300' : 
                      canAfford ? `${getUpgradeCategoryColor(upgrade.category)} border-2` : 
                      'bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="font-semibold text-lg">{upgrade.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{upgrade.description}</div>
                    <div className="text-xs text-blue-600 mb-3">{upgrade.effect}</div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-purple-600">{upgrade.cost} XP</span>
                      {owned ? (
                        <span className="text-green-600 font-semibold">✓ Owned</span>
                      ) : (
                        <button
                          onClick={() => purchaseUpgrade(upgrade.id)}
                          disabled={!canAfford}
                          className={`px-3 py-1 rounded ${
                            canAfford 
                              ? 'bg-purple-600 text-white hover:bg-purple-700' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-8">
          <button
            onClick={startNewSeason}
            className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
          >
            Start Season {gameState.season + 1}! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffseasonPhase;
