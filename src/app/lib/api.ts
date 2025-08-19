import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

export interface BarGame {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  available: boolean
}

export const getAllBarGames = async (): Promise<BarGame[]> => {
  const response = await api.get<{ success: boolean; data: BarGame[] }>("/bar-games");
  return response.data.data;
  
};
