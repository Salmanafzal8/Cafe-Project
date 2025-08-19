"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
  pricePerHour: number;
  available: boolean;
};

export default function CreateBarGamesPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
 // convert string → boolean
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <h1 className="font-bold">Create Bar</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          className="border rounded p-3"
          type="text"
          placeholder="Enter Game name"
          {...register("name", { required: true, maxLength: 20, minLength: 3 })}
        />
        {errors.name && (
          <span className="text-red-500">
            Name is required and must be between 3 and 20 characters.
          </span>
        )}

        <input
          className="border rounded p-3"
          type="text"
          placeholder="Enter game description"
          {...register("description", { required: true, maxLength: 200, minLength: 10 })}
        />
        {errors.description && (
          <span className="text-red-500">
            Description is required and must be between 10 and 200 characters.
          </span>
        )}

        <input
          className="border rounded p-3"
          type="number"
          placeholder="Enter Price/h"
          {...register("pricePerHour", { required: true, valueAsNumber: true })}
        />
        {errors.pricePerHour && (
          <span className="text-red-500">Price per hour is required.</span>
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
          <span className="text-red-500">Availability is required.</span>
        )}

        <button className="bg-black text-white p-3 rounded" type="submit">
          Create Game
        </button>
      </form>
    </div>
  );
}
