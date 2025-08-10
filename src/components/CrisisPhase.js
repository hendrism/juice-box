import React from 'react';

const CrisisPhase = ({ crisis, onCrisisResponse }) => {
  if (!crisis) return null;

  return (
    <div className="bg-red-100 border-2 border-red-400 p-6 rounded-lg mb-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          🚨 KID LOGIC CRISIS! 🚨
        </h2>
        <h3 className="text-xl font-semibold text-red-700 mb-3">{crisis.title}</h3>
        <p className="text-red-600">{crisis.description}</p>
      </div>
      
      <div className="space-y-3">
        <p className="font-semibold text-red-800">How do you handle this situation?</p>
        {crisis.responses.map((response, index) => (
          <button
            key={index}
            onClick={() => onCrisisResponse(response)}
            className="w-full p-3 text-left bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="font-medium text-red-800">{response.text}</div>
            <div className="text-sm text-red-600 mt-1">
              Effects: Morale {response.effect.morale > 0 ? '+' : ''}{response.effect.morale || 0}, 
              Skill {response.effect.skill > 0 ? '+' : ''}{response.effect.skill || 0}, 
              Energy {response.effect.energy > 0 ? '+' : ''}{response.effect.energy || 0}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CrisisPhase;
