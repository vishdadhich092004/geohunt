import { GameType } from "../../server/shared/types";
import { NewUserFormData } from "./components/NewUser";

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

export const newGame = async () => {
  const response = await fetch(`${API_BASE_URL}/api/games`, {
    method: "POST",
    credentials: "include",
  });
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