import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE, 
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BarGame {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  available: boolean;
}

export type CreateBarGameInput = Omit<BarGame, "id">;

export const getAllBarGames = async (): Promise<BarGame[]> => {
  const { data } = await api.get("/bar-games");
  return data.data;
};

export const createBarGame = async (game: CreateBarGameInput): Promise<BarGame> => {
  const { data } = await api.post("/bar-games", game);
  return data.data;
};

export const deleteBarGame = async (_id: string): Promise<void> => {
  console.log("Deleting bar game with id:", _id); 
  await api.delete(`/bar-games/${_id}`); 
};

// export const updateBarGame = async (_id: string, data: CreateBarGameInput): Promise<BarGame> =>{
//   const response = await api.put(`/bar-games/${_id}`, data)
//   return response.data.data;
// }

export const updateBarGame = async (_id: string, data: CreateBarGameInput): Promise<BarGame> => {
  const { data: res } = await api.put<{ success: boolean; data: BarGame }>(`/bar-games/${_id}`, data);
  return res.data;
};