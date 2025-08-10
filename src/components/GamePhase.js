import React from 'react';
import { weatherTypes } from '../data/gameData';

const GamePhase = ({ gameState, onPlayGame }) => {
  const currentWeather = weatherTypes.find(w => w.type === gameState.weather) || weatherTypes[0];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Game Day! 🏟️</h2>
      <p className="text-lg mb-2">The Mighty Munchkins vs The Awesome Opposers</p>
      <p className="mb-6">Weather: {currentWeather.icon} {currentWeather.name}</p>
      <p className="mb-6">Your team is pumped up from practice! Time to see how they perform...</p>
      <button 
        onClick={onPlayGame}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
      >
        KICK OFF! ⚽
      </button>
    </div>
  );
};

export default GamePhase;
