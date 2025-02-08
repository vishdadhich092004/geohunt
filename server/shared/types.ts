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
  guesses: GuessType[];
  score: number;
  currentRoundScore: number;
  startedAt: Date;
  currentLocation: LocationType;
  finishedAt?: Date | null;
  continent?: string;
  country?: string;
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

export interface APIResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export type HintType = string;
