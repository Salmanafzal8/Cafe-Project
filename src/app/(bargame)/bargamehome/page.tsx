"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBarGames, BarGame } from "@/lib/gameApi";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import GameCard from "@/components/GameCard";

export default function BarGamesPage() {
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">(
    "all"
  );
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["barGames"],
    queryFn: getAllBarGames,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="p-4">Loading games...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load games.</p>;

  const filteredGames =
    filter === "all"
      ? data
      : data?.filter((game) =>
          filter === "available" ? game.available : !game.available
        );
     
  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Bar Games</h1>
        <button className="px-6 py-3 text-sm bg-green-700 text-white rounded hover:bg-green-500" onClick={() => router.push(Routes.CREATE_BAR_GAME)}>Add a bar game</button>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-3  items-center space-x-4 mb-4">
          {filteredGames?.map((game: BarGame) =>(
            <GameCard
            key={game.id}
            game={game}
            onEdit={(id) => router.push(`${Routes.EDIT_BAR_GAME}/${id}`)}
            onDelete={(id) => {
              // Handle delete logic here
              console.log(`Delete game with id: ${id}`);
            }}
          />
          ))}
          </div>
      </div>
      </div>
  );
}

