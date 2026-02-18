export type LocationType = {
  id?: string;
  latitude: number;
  longitude: number;
  guess?: GuessType;
  game?: GameType;
  createdAt: Date;
};
export type UserType = {
  id: string;
  username: string;
  games: GameType[];
  createdAt: Date;
  updatedAt: Date;
  guess: GuessType[];
};

export type GameType = {
  id: string;
  userId?: string;
  gameModeId?: string;
  guesses: GuessType[];
  score: number;
  currentRoundScore: number;
  lives: number;
  maxLocations: number;
  timeLimit: number;
  timeRemaining: number;
  startedAt: string;
  currentLocation: LocationType;
  finishedAt?: Date | null;
  continent?: string;
  country?: string;
  gameMode: GameModeType;
};

export type GuessType = {
  id: string;
  userId: string;
  gameId: string;
  latitude: number;
  longitude: number;
  score: number;
  distance: number;
  createdAt: Date;
};
export type GameModeType = {
  id: string;
  name: string;
  description: string;
  maxLives: number | null;
  timeLimit?: number | null;
  maxLocations?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface APIResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export type HintType = string;

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};
