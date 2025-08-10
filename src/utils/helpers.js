export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

export const getProgressBarColor = (value, thresholds = [25, 50, 75]) => {
  if (value > thresholds[2]) return 'bg-green-500';
  if (value > thresholds[1]) return 'bg-yellow-500';
  if (value > thresholds[0]) return 'bg-orange-500';
  return 'bg-red-500';
};

export const formatCurrency = (amount) => {
  return `$${amount}`;
};

export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

export const getParentMoodText = (satisfaction) => {
  if (satisfaction > 75) return "😊 'Coach is amazing! Little Timmy loves soccer now!'";
  if (satisfaction > 50) return "😐 'Could be better, but at least they're having fun.'";
  if (satisfaction > 25) return "😕 'Why isn't my child the star player yet?'";
  return "😠 'We demand a coaching change! This is unacceptable!'";
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getUpgradeCategoryIcon = (category) => {
  const icons = {
    equipment: '⚽',
    coaching: '📋',
    social: '👥',
    management: '💼'
  };
  return icons[category] || '📦';
};

export const getUpgradeCategoryColor = (category) => {
  const colors = {
    equipment: 'border-blue-300 bg-blue-50',
    coaching: 'border-green-300 bg-green-50',
    social: 'border-purple-300 bg-purple-50',
    management: 'border-yellow-300 bg-yellow-50'
  };
  return colors[category] || 'border-gray-300 bg-gray-50';
};
