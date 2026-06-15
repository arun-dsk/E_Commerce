"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import MyCart from "@/Components/MyCart/MyCart";

export default function CartPage() {
  const { isAuthenticated, isLoading } =
    useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center pt-16">
        <p className="text-lg font-semibold text-slate-700">
          Loading...
        </p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 pt-16">
        <div className="max-w-md space-y-5 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Login to view your cart
          </h1>

          <p className="text-slate-600">
            Your cart is saved to your account, so it will be there when you log in again.
          </p>

          <Link
            href="/account"
            className="inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-12 md:pt-16">
      <MyCart />
    </main>
  );
}
