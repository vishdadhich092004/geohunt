export const getScoreMessage = (score: number) => {
  if (score === 5000) {
    return "Perfect! You got a full score! 🎉";
  } else if (score > 4000) {
    return "Great job! Almost perfect! 💪";
  } else if (score > 3000) {
    return "Good effort, but there's room for improvement! 👍";
  } else if (score > 2000) {
    return "Nice try! Keep going! 🫡";
  } else {
    return "Don't give up! You can do better! 🤷‍♂️";
  }
};
