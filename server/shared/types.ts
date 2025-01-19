export type LocationType = {
  id?: string;
  latitude: number;
  longitude: number;
  name?: string;
  description?: string;
  guess?: GuessType;
  game?: GameType;
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
  startedAt: Date;
  currentLocation: LocationType;
  finishedAt?: Date | null;
};

export type GuessType = {
  id: string;
  userId: string;
  gameId: string;
  latitude: number;
  longitude: number;
  distance: number;
  createdAt: Date;
};

export interface APIResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export type HintType = string;
