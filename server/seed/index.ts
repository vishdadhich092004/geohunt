import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const locations = [
  {
    name: "New York City",
    lattitude: 40.7128,
    longitude: -74.006,
  },
  {
    name: "Los Angeles",
    lattitude: 34.0522,
    longitude: -118.2437,
  },
  {
    name: "Chicago",
    lattitude: 41.8781,
    longitude: -87.6298,
  },
  {
    name: "Houston",
    lattitude: 29.7604,
    longitude: -95.3698,
  },
  {
    name: "San Francisco",
    lattitude: 37.7749,
    longitude: -122.4194,
  },
];

export const seedLocation = async () => {
  for (const loc of locations) {
    await prisma.location.create({ data: loc });
  }
  console.log(`${locations.length} seeded`);
};

seedLocation()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => await prisma.$disconnect());
