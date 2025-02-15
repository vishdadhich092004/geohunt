const calculateScore = (distance: number, scoreFactor: number = 1000) => {
  // Perfect score only for extremely accurate guesses (within 10 meters)
  if (distance * 1000 < 10) {
    return 5000;
  }

  // Calculate score using exponential decay with steeper curve
  const score = 5000 * Math.exp(-distance / scoreFactor);

  // Return rounded score, ensuring it's between 0 and 5000
  return Math.max(0, Math.round(score));
};

export default calculateScore;
