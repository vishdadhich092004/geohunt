import cron from "node-cron";
import prisma from "../db/db.config";

// Function to delete locations
export async function cleanupLocations() {
  try {
    // Get current timestamp
    const now = new Date();

    // Delete locations that are not associated with any game
    const deleteResult = await prisma.location.deleteMany({
      where: {
        //  only delete locations older than 24 hours:
        createdAt: {
          lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });

    console.log(`Cleanup completed at ${now.toISOString()}`);
    console.log(`Deleted ${deleteResult.count} locations`);
  } catch (error) {
    console.error("Error during location cleanup:", error);
  }
}

// Schedule the cron job to run every 24 hours at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Starting scheduled location cleanup...");
  await cleanupLocations();
});

// Error handling for the process
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
});

console.log("Location cleanup cron job started");
