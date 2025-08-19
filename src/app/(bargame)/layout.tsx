"use client";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

export default function BargamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">CAFE PROJECT</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="hover:underline">
            Games
          </Link>
          <Link href="/" className="hover:underline">
            Cafe Items{" "}
          </Link>
          <Link href="/" className="hover:underline">
            Customers
          </Link>
          <Link href="/" className="hover:underline">
            Membership
          </Link>
          <Link href="/" className="hover:underline">
            Orders
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <QueryClientProvider client={queryClient}>
          {children}
                  <Toaster position="top-right" /> 
        </QueryClientProvider>
      </main>
    </div>
  );
}
