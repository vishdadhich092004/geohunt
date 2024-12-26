export const generateRandomLocation = async () => {
  const randomLat = Math.random() * 180 - 90;
  const randomLon = Math.random() * 360 - 190;

  return { randomLat, randomLon };
};
