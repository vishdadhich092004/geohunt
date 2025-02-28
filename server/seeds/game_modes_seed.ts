import prisma from "../db/db.config";

async function main() {
  // await prisma.gameMode.deleteMany({});

  const gameModes = await Promise.all([
    // Classic Modes
    prisma.gameMode.upsert({
      where: { name: "Classic" },
      update: {
        description:
          "Traditional mode with 5 lives. Take your time and aim for accuracy!",
        timeLimit: null,
        maxLives: 5,
        maxLocations: 5,
      },
      create: {
        name: "Classic",
        description:
          "Traditional mode with 5 lives. Take your time and aim for accuracy!",
        timeLimit: null,
        maxLives: 5,
        maxLocations: 5,
      },
    }),
    // Time-based Modes
    prisma.gameMode.upsert({
      where: { name: "Blitz" },
      update: {
        description:
          "120 seconds to score as many points as possible! Quick thinking required!",
        timeLimit: 120,
        maxLives: 3,
        maxLocations: null,
      },
      create: {
        name: "Blitz",
        description:
          "120 seconds to score as many points as possible! Quick thinking required! 3 lives",
        timeLimit: 120,
        maxLives: 3,
        maxLocations: null,
      },
    }),
    prisma.gameMode.upsert({
      where: { name: "Time Attack" },
      update: {
        description:
          "3 minutes to achieve your highest score. Balance speed and accuracy! 3 lives",
        timeLimit: 180,
        maxLives: 3,
        maxLocations: null,
      },
      create: {
        name: "Time Attack",
        description:
          "3 minutes to achieve your highest score. Balance speed and accuracy! 3 lives",
        timeLimit: 180,
        maxLives: 3,
        maxLocations: null,
      },
    }),

    // Challenge Modes
    prisma.gameMode.upsert({
      where: { name: "Hardcore" },
      update: {
        description:
          "One life, no time limit. One mistake and game over! 1 life",
        timeLimit: null,
        maxLives: 1,
        maxLocations: null,
      },
      create: {
        name: "Hardcore",
        description: "One life, no time limit. One mistake and game over!",
        timeLimit: null,
        maxLives: 1,
        maxLocations: null,
      },
    }),
    // prisma.gameMode.upsert({
    //   where: { name: "Speed Run" },
    //   update: {
    //     description:
    //       "5 locations, 2 minutes, 3 lives. How fast can you complete it?",
    //     timeLimit: 120,
    //     maxLives: 3,
    //     maxLocations: 5,
    //   },
    //   create: {
    //     name: "Speed Run",
    //     description:
    //       "5 locations, 2 minutes, 3 lives. How fast can you complete it?",
    //     timeLimit: 120,
    //     maxLives: 3,
    //     maxLocations: 5,
    //   },
    // }),
    prisma.gameMode.upsert({
      where: { name: "Precision Master" },
      update: {
        description:
          "3 lives but need higher accuracy for points. For experts!",
        timeLimit: null,
        maxLives: 3,
        maxLocations: null,
      },
      create: {
        name: "Precision Master",
        description:
          "3 lives but need higher accuracy for points. For experts!",
        timeLimit: null,
        maxLives: 3,
        maxLocations: null,
      },
    }),

    // Learning Modes
    // prisma.gameMode.upsert({
    //   where: { name: "Practice" },
    //   update: {
    //     description:
    //       "Unlimited lives, hints enabled, and detailed feedback after each guess",
    //     timeLimit: null,
    //     maxLives: null,
    //     maxLocations: null,
    //   },
    //   create: {
    //     name: "Practice",
    //     description:
    //       "Unlimited lives, hints enabled, and detailed feedback after each guess",
    //     timeLimit: null,
    //     maxLives: null,
    //     maxLocations: null,
    //   },
    // }),
  ]);

  console.log("Created/Updated game modes:", gameModes);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
