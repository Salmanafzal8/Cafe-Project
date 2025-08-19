"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBarGame, CreateBarGameInput } from "@/lib/gameApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";


export default function CreateBarGamesPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBarGameInput>();

  const queryClient = useQueryClient();

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: CreateBarGameInput) => createBarGame(data),
    onSuccess: () => {
      toast.success("Game created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bar-games"] });
      reset();     
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error(error.message);
        alert(" " + error.message);
      } else {
        console.error(error);
        toast.error("Failed to create game");
      }
    },
  });
  const onSubmit: SubmitHandler<CreateBarGameInput> = (data) => {
    data.available = data.available === ("true" as unknown as boolean);
    mutation.mutate(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <h1 className="font-bold text-xl">Create Bar Game</h1>
      <button className="px-6 py-3 text-sm bg-green-700 text-white rounded hover:bg-green-500" onClick={() => router.push(Routes.BAR_GAMES)}> Check bar games</button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <input
          className="border rounded p-3"
          type="text"
          placeholder="Enter Game name"
          {...register("name", { required: true , maxLength: 20, minLength: 3 })}
        />
        {errors.name && (
          <span className="text-red-500">Name is required (3–20 chars)</span>
        )}
        <input
          className="border rounded p-3"
          type="text"
          placeholder="Enter game description"
          {...register("description", {
            required: true,
            maxLength: 200,
            minLength: 10,
          })}
        />
        {errors.description && (
          <span className="text-red-500">
            Description is required (10–200 chars)
          </span>
        )}
        <input
          className="border rounded p-3"
          type="number"
          placeholder="Enter Price $/h"
          {...register("pricePerHour", { required: true, valueAsNumber: true })}
        />
        {errors.pricePerHour && (
          <span className="text-red-500">Price is required</span>
        )}
        <select
          className="border rounded p-3"
          {...register("available", { required: true })}
        >
          <option value="">Select availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        {errors.available && (
          <span className="text-red-500">Availability required</span>
        )}
        <button
          disabled={mutation.isPending}
          className="bg-black text-white p-3 rounded hover:bg-gray-400"
          type="submit"
        >
          {mutation.isPending ? "Submitting..." : "Create Game"}
        </button>
      </form>
    </div>
  );
}
