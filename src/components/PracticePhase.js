import React from 'react';
import { snacks, drinks, practiceActivities } from '../data/gameData';
import { formatCurrency } from '../utils/helpers';

const PracticePhase = ({ 
  selectedSnack, 
  setSelectedSnack, 
  selectedDrink, 
  setSelectedDrink, 
  practiceActivity, 
  setPracticeActivity, 
  onStartPractice 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Practice Planning</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Snack Choice</label>
          <select 
            value={selectedSnack} 
            onChange={(e) => setSelectedSnack(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose snack...</option>
            {snacks.map(snack => (
              <option key={snack.name} value={snack.name}>
                {snack.name} - {formatCurrency(snack.cost)} ({snack.description})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Drink Choice</label>
          <select 
            value={selectedDrink} 
            onChange={(e) => setSelectedDrink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose drink...</option>
            {drinks.map(drink => (
              <option key={drink.name} value={drink.name}>
                {drink.name} - {formatCurrency(drink.cost)} ({drink.description})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Practice Activity</label>
          <select 
            value={practiceActivity} 
            onChange={(e) => setPracticeActivity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose activity...</option>
            {practiceActivities.map(activity => (
              <option key={activity.name} value={activity.name}>
                {activity.name} ({activity.description})
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={onStartPractice}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Hold Practice & Prepare for Game! 🏃‍♂️
        </button>
      </div>
    </div>
  );
};

export default PracticePhase;
