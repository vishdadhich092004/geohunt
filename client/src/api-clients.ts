import { GameType } from "../../server/shared/types";
import { NewUserFormData } from "./components/User/NewUser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const newUser = async (formData: NewUserFormData) => {
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

export const newGame = async (continent?: string, country?: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/games?continent=${continent}&country=${country}`,
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

export const fetchLeaderboard = async () => {
  const response = await fetch(`${API_BASE_URL}/api/leaderboard`, {
    credentials: "include",
    method: "GET",
  });
  const body = await response.json();
  if (!response.ok) throw new ErrorEvent(body.error);
  return body;
};

export const fetchHints = async (lat?: number, lng?: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hints?lat=${lat}&lng=${lng}`,
    {
      credentials: "include",
      method: "POST",
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
