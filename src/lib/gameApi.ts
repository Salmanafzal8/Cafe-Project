import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE, // ✅ keep base only, do not append /bar-games here
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BarGame {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  available: boolean;
}

export const getAllBarGames = async (): Promise<BarGame[]> => {
  const response = await api.get<{ success: boolean; data: BarGame[] }>("/bar-games"); 
  return response.data.data;
};

export type CreateBarGameInput = Omit<BarGame, "id">;

export const createBarGame = async (data: CreateBarGameInput): Promise<BarGame> => {
  const response = await api.post<{ success: boolean; data: BarGame }>("/bar-games", data); 
  return response.data.data;
};

export const deleteBarGame = async (id: string): Promise<void> => {
  await api.delete(`/bar-games/${id}`); 
}
