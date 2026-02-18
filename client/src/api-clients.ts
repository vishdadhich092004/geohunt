import { GameType } from "../../server/shared/types";
import { UserFormData } from "./components/User/UserForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const newUser = async (formData: UserFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.error);
  }
  return responseBody;
};

export const newGame = async (
  continent?: string,
  country?: string,
  gameModeId?: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/games?continent=${continent}&country=${country}&gameModeId=${gameModeId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const newGuess = async (
  gameId: string,
  latitude: number,
  longitude: number
): Promise<GameType | null> => {
  const response = await fetch(`${API_BASE_URL}/api/guesses/${gameId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latitude, longitude }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Error Validating Token");
  }
  const data = await response.json();
  return data;
};

export const fetchGameByGameId = async (gameId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/games/${gameId}`, {
    credentials: "include",
    method: "GET",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const fetchLeaderboard = async (
  page: number = 1,
  limit: number = 15
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/leaderboard?page=${page}&limit=${limit}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const body = await response.json();
  if (!response.ok) throw new Error(body.error);
  return body;
};

export const fetchHints = async (lat?: number, lng?: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hints?lat=${lat}&lng=${lng}`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const getAnalytics = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/analytics/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error Fetching analytics");
  }
  return body;
};

export const fetchGameModes = async () => {
  const response = await fetch(`${API_BASE_URL}/api/game-modes`, {
    credentials: "include",
    method: "GET",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const fetchGameModeById = async (gameModeId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/game-modes/${gameModeId}`, {
    credentials: "include",
    method: "GET",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error);
  }
  return body;
};

export const fetchPublicStats = async (): Promise<{
  totalUsers: number;
  totalGames: number;
  totalGuesses: number;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    method: "GET",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error ?? "Failed to fetch stats");
  }
  return body;
};

export const fetchGameHistory = async (
  userId: string,
  page = 1,
  limit = 10
): Promise<{
  games: {
    id: string;
    score: number;
    continent: string | null;
    country: string | null;
    startedAt: string;
    finishedAt: string;
    lives: number;
    gameMode: { name: string };
    _count: { guesses: number };
  }[];
  meta: { page: number; limit: number; total: number; pages: number };
}> => {
  const response = await fetch(
    `${API_BASE_URL}/api/games/history/${userId}?page=${page}&limit=${limit}`,
    { method: "GET", credentials: "include" }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error ?? "Failed to fetch game history");
  }
  return body;
};
