-- Create GameMode table first
CREATE TABLE "GameMode" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeLimit" INTEGER,
    "maxLives" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on name
CREATE UNIQUE INDEX "GameMode_name_key" ON "GameMode"("name");

-- Insert default game mode
INSERT INTO "GameMode" (
    "id",
    "name",
    "description",
    "maxLives",
    "updatedAt"
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'Classic',
    'Classic game mode with 5 lives',
    5,
    CURRENT_TIMESTAMP
);

-- Add nullable gameModeId column first
ALTER TABLE "Game" ADD COLUMN "gameModeId" UUID;

-- Update existing records
UPDATE "Game" SET "gameModeId" = '00000000-0000-0000-0000-000000000000';

-- Make the column required
ALTER TABLE "Game" ALTER COLUMN "gameModeId" SET NOT NULL;

-- Add foreign key constraint
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameModeId_fkey" 
    FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;