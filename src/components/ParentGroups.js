import React from 'react';
import { getProgressBarColor, formatPercentage, getParentMoodText } from '../utils/helpers';

const ParentGroups = ({ gameState, parentReactions, averageParentSatisfaction }) => {
  if (gameState.parentGroups.length === 0) return null;

  return (
    <>
      {/* Parent Groups Display */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Parent Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gameState.parentGroups.map(group => {
            const satisfaction = gameState.groupSatisfaction[group.id] || 60;
            return (
              <div key={group.id} className="border border-gray-200 rounded-lg p-3">
                <div className="font-semibold text-lg">{group.name}</div>
                <div className="text-sm text-gray-600 mb-2">{group.description}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(satisfaction)}`}
                    style={{ width: `${satisfaction}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm font-semibold mt-1">
                  {formatPercentage(satisfaction)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parent Reactions */}
      {parentReactions.length > 0 && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="font-bold text-blue-800 mb-2">📱 Parent Group Reactions:</h3>
          {parentReactions.map((reaction, index) => (
            <p key={index} className="text-blue-700 text-sm">• {reaction}</p>
          ))}
        </div>
      )}

      {/* Overall Parent Satisfaction Meter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Parent WhatsApp Group Mood 📱</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full transition-all duration-500 ${getProgressBarColor(averageParentSatisfaction())}`}
            style={{ width: `${averageParentSatisfaction()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {getParentMoodText(averageParentSatisfaction())}
        </p>
      </div>
    </>
  );
};

export default ParentGroups;
