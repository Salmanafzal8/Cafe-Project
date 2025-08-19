// src/components/GameCard.tsx
import React from "react";
import { BarGame } from "@/lib/gameApi";

type GameCardProps = {
  game: BarGame;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 w-200  shadow-sm hover:shadow-md transition">
      {/* Name */}
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
            onClick={() => onEdit?.(game.id)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(game.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
