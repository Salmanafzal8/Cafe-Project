"use client";

import { close } from "@/lib/store/barGameModalSlice";
import { UseDispatch, UseSelector } from "@/lib/store";
import CreateorEdit from "./CreateorEdit";

export default function BarGameModal() {
  const dispatch = UseDispatch();
  const { isOpen, mode } = UseSelector((s) => s.barGameModal);
  
  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[480px] max-w-[92vw]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "edit" ? "Update Bar Game" : "Create Bar Game"} 
          </h2>
          <button
            onClick={() => dispatch(close())}
            className="text-white-500 p-2 rounded bg-red-600 hover:bg-red-400"
          >
            Close
          </button>
        </div>
        <CreateorEdit />
      </div>
    </div>
  );
}
