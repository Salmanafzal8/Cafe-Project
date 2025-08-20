// src/components/GameCard.tsx
import React, { useState } from "react";
import { BarGame, deleteBarGame } from "@/lib/gameApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DialogBox from "./DialogBox";
import { openCreate, openEdit } from "@/lib/store/barGameModalSlice";
import { useDispatch } from "react-redux";
import BarGameModal from "./BarGameModal";

type GameCardProps = {
  game: BarGame;
  onEdit?: (id: string) => void;
  isOpen?: boolean;
};

export default function GameCard({ game }: GameCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deleteMutation = useMutation({
    mutationFn: deleteBarGame,
    onSuccess: () => {
      toast.success("Game deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["bar-Games"] });
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["bar-Games"] });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete game");
    },
  });

  return (
    <>
      <div className="flex items-center justify-between border rounded-lg p-4 w-200 shadow-sm hover:shadow-md transition">
        <div className="flex gap-1">
          <h1 className="font-bold">Name:</h1>
          <p className="font-extralight">{game.name}</p>
        </div>

        <select
          className="border rounded-md px-4 py-2 text-sm"
          defaultValue={game.available ? "available" : "unavailable"}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">
            ${game.pricePerHour}/hr
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => dispatch(openEdit(game))}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <DialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => deleteMutation.mutate(game._id)}
        title="Delete Bar Game"
        message={`Are you sure you want to delete "${game.name}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
      <BarGameModal />
    </>
  );
}
