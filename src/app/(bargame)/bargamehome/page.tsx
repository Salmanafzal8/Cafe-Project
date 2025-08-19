"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBarGames, BarGame } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function BarGamesPage() {
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">(
    "all"
  );
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["barGames"],
    queryFn: getAllBarGames,
    staleTime: 1000 * 60 * 5, // 5 minutes
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
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Bar Games</h1>
        <button className="px-6 py-3 text-sm bg-green-700 text-white rounded hover:bg-green-500" onClick={() => router.push('/createbargame')}>Add a bar game</button>
      </div>
      <div className="space-y-3">
        {filteredGames?.map((game: BarGame) => (
          <div
            key={game.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-1">
              <h1 className="font-bold">Name:</h1>
              <p className="font-extralight">{game.name}</p>
            </div>
            <select className="border rounded-md ml-150 px-4 py-2 text-sm">
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                ${game.pricePerHour}/hr
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
