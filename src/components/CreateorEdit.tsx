"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBarGame,
  updateBarGame,              
  CreateBarGameInput,
  BarGame,                     
} from "@/lib/gameApi";
import toast from "react-hot-toast";
import { useEffect } from "react";                 
import { close } from "@/lib/store/barGameModalSlice";        
import { UseDispatch, UseSelector } from "@/lib/store";
export default function CreateorEdit() {
  const dispatch = UseDispatch();                           
  const { mode, game } = UseSelector((s:unknown) => s.barGameModal); 
  const {
    register,
    handleSubmit,
    reset,
    setValue,                           
    formState: { errors },
  } = useForm<CreateBarGameInput>({
    defaultValues: game
      ? {
          name: game.name,
          description: game.description,
          pricePerHour: game.pricePerHour,
          available: game.available,
        }
      : {},
  });

  useEffect(() => {
    if (game) {
      setValue("name", game.name);
      setValue("description", game.description);
      setValue("pricePerHour", game.pricePerHour);
      setValue("available", game.available);
    } else {
      reset();
    }
  }, [game, reset, setValue]); 

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateBarGameInput) =>
      mode === "edit" && game
        ? updateBarGame(getGameId(game), data) 
        : createBarGame(data),                 
    onSuccess: () => {
      toast.success(mode === "edit" ? "Game updated successfully!" : "Game created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bar-Games"] });
      reset();
      dispatch(close());                      
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit: SubmitHandler<CreateBarGameInput> = (data) => {
    if (typeof data.available === "string") {
      data.available = data.available === "true";
    }
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4"> 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full bg-white"
      >
        <input
          className="border rounded p-3"
          type="text"
          placeholder="Enter Game name"
          {...register("name", { required: true, maxLength: 20, minLength: 3 })}
        />
        {errors.name && <span className="text-red-500">Name is required (3–20 chars)</span>}

        <input
          className="border rounded p-3"
          type="text"
          placeholder="Enter game description"
          {...register("description", { required: true, maxLength: 200, minLength: 10 })}
        />
        {errors.description && (
          <span className="text-red-500">Description is required (10–200 chars)</span>
        )}
        <input
          className="border rounded p-3"
          type="number"
          placeholder="Enter Price $/h"
          {...register("pricePerHour", { required: true, valueAsNumber: true })}
        />
        {errors.pricePerHour && <span className="text-red-500">Price is required</span>}
        <select className="border rounded p-3" {...register("available", { required: true })}>
          <option value="">Select availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        {errors.available && <span className="text-red-500">Availability required</span>}
        <button
          disabled={mutation.isPending}
          className="bg-black text-white p-3 rounded hover:bg-gray-800"
          type="submit"
        >
          {mutation.isPending
            ? mode === "edit"
              ? "Updating..."
              : "Submitting..."
            : mode === "edit"
            ? "Update Game"
            : "Create Game"}
        </button>
      </form>
    </div>
  );
}

function getGameId(g: BarGame): string {
  if ("_id" in g && typeof g._id === "string") return g._id as string;
  return g._id;
}





