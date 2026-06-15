"use client";

import { FormEvent, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api";
import {
  emptyAccountDashboardData,
  readAccountDashboardData,
  type AccountOrder,
  type AccountOrderStatus,
} from "@/lib/accountStorage";
import type { RootState } from "@/redux/store";
import type { Product } from "@/types/product";

type AccountTab =
  | "orders"
  | "cart"
  | "wishlist"
  | "addresses"
  | "settings";

interface CartDisplayItem {
  productId: string;
  name: string;
  image?: string;
  offerPrice: number;
  price: number;
  count: number;
  isMissing: boolean;
}

const tabItems: Array<{
  id: AccountTab;
  label: string;
}> = [
  { id: "orders", label: "Orders" },
  { id: "cart", label: "Cart" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
  { id: "settings", label: "Settings" },
];

const sectionTitles: Record<AccountTab, string> = {
  orders: "Recent Orders",
  cart: "Cart",
  wishlist: "Wishlist",
  addresses: "Addresses",
  settings: "Settings",
};

const formatMoney = (value: number) =>
  `Rs. ${value.toLocaleString("en-IN")}`;

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getStatusClasses = (
  status: AccountOrderStatus
) => {
  switch (status) {
    case "Delivered":
      return "bg-emerald-100 text-emerald-700";
    case "Shipped":
      return "bg-sky-100 text-sky-700";
    case "Cancelled":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-amber-100 text-amber-700";
  }
};

const summarizeOrderItems = (
  items: AccountOrder["items"]
) => {
  if (items.length === 0) {
    return "No items saved";
  }

  if (items.length === 1) {
    return items[0].name;
  }

  return `${items[0].name} + ${
    items.length - 1
  } more`;
};

const getInitial = (
  value: string,
  fallback = "U"
) => {
  const initial = value.trim().charAt(0);
  return initial ? initial.toUpperCase() : fallback;
};

export default function AccountPage() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  } = useAuth();

  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const cartCount = useSelector(
    (state: RootState) => state.cart.cartCount
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [activeTab, setActiveTab] =
    useState<AccountTab>("orders");
  const [products, setProducts] = useState<
    Product[]
  >([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let isMounted = true;

    const loadProducts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/`
        );

        const data = (await response.json()) as Product[];

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setProducts([]);
        }
      }
    };

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const dashboardData = user?.id
    ? readAccountDashboardData(user.id)
    : emptyAccountDashboardData;

  const cartProducts: CartDisplayItem[] = cartItems.map(
    (item) => {
      const product = products.find(
        (prod) => prod.product_id === item.id
      );

      return {
        productId: item.id,
        name: product?.name ?? `Product ${item.id}`,
        image: product?.image?.[0],
        offerPrice: product?.offerPrice ?? 0,
        price: product?.price ?? 0,
        count: item.count,
        isMissing: !product,
      };
    }
  );

  const cartTotal = cartProducts.reduce(
    (sum, item) =>
      sum + item.offerPrice * item.count,
    0
  );

  const loginHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password");
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    setIsSubmitting(false);

    if (!result.ok) {
      setError(
        result.error ??
          "Login failed. Please try again."
      );
      return;
    }

    toast.success("Login successful");
  };

  const logoutHandler = () => {
    logout();
    toast.success("Logged out");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f6f6]">
        <p className="text-xl font-semibold text-slate-600">
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f6f6f6] px-6 pb-10 pt-32">
        <div className="flex items-center justify-center">
          <form
            onSubmit={loginHandler}
            className="w-full max-w-sm space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          >
            <h1 className="text-4xl font-bold text-black">
              Login
            </h1>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 p-4 text-black outline-none transition-all focus:border-emerald-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 p-4 text-black outline-none transition-all focus:border-emerald-500"
            />

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-emerald-500 p-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSubmitting
                ? "Logging in..."
                : "Login"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?

              <Link
                href="/register"
                className="ml-1 font-semibold text-emerald-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }

  const avatarLetter =
    getInitial(user?.name ?? "");

  const renderActivePanel = () => {
    if (activeTab === "orders") {
      if (dashboardData.orders.length === 0) {
        return (
          <div className="px-8 py-16 text-center">
            <h3 className="text-2xl font-semibold text-black">
              No orders yet
            </h3>
            <p className="mt-3 text-slate-500">
              Your order history will appear here once you place a purchase.
            </p>

            <Link
              href="/#Products"
              className="mt-8 inline-flex rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-emerald-700"
            >
              Browse Products
            </Link>
          </div>
        );
      }

      return (
        <div className="divide-y divide-slate-200">
          {dashboardData.orders
            .slice(0, 3)
            .map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-6 px-8 py-8 xl:flex-row xl:items-center xl:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-2xl font-semibold text-black">
                      #{order.orderNumber}
                    </h3>

                    <span
                      className={`rounded-full px-4 py-1 text-sm font-medium ${getStatusClasses(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-3 text-lg text-slate-600">
                    {summarizeOrderItems(
                      order.items
                    )}
                  </p>

                  <p className="mt-1 text-base text-slate-400">
                    {formatDate(order.placedAt)}
                  </p>
                </div>

                <div className="text-left xl:text-right">
                  <p className="text-3xl font-bold text-black">
                    {formatMoney(order.total)}
                  </p>

                  <p className="mt-3 text-lg text-slate-500">
                    {order.items.length} item
                    {order.items.length === 1
                      ? ""
                      : "s"}
                  </p>
                </div>
              </div>
            ))}
        </div>
      );
    }

    if (activeTab === "cart") {
      if (cartCount === 0) {
        return (
          <div className="px-8 py-16 text-center">
            <h3 className="text-2xl font-semibold text-black">
              Your cart is empty
            </h3>
            <p className="mt-3 text-slate-500">
              Items you add to cart will appear here with product previews and totals.
            </p>

            <Link
              href="/#Products"
              className="mt-8 inline-flex rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Browse Products
            </Link>
          </div>
        );
      }

      return (
        <div className="space-y-6 px-8 py-8">
          <div className="grid gap-4 md:grid-cols-2">
            {cartProducts.map((item) => (
              <Link
                key={item.productId}
                href={`/product/${item.productId}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500">
                      Preview unavailable
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    x{item.count}
                  </span>

                  {item.isMissing && (
                    <span className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                      Unavailable
                    </span>
                  )}
                </div>

                <div className="space-y-3 p-5">
                  <div>
                    <p className="text-lg font-semibold text-black">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Product ID: {item.productId}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Offer price
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        {formatMoney(
                          item.offerPrice * item.count
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Actual price
                      </p>
                      <p className="text-lg text-slate-400 line-through">
                        {formatMoney(
                          item.price * item.count
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-400">
                Cart total
              </p>
              <p className="mt-2 text-3xl font-bold text-black">
                {formatMoney(cartTotal)}
              </p>
              <p className="mt-1 text-slate-500">
                {cartCount} item
                {cartCount === 1 ? "" : "s"} in your cart
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/cart"
                className="inline-flex rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Open Cart
              </Link>

              <Link
                href="/#Products"
                className="inline-flex rounded-2xl border border-emerald-600 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "wishlist") {
      if (dashboardData.wishlist.length === 0) {
        return (
          <div className="px-8 py-16 text-center">
            <h3 className="text-2xl font-semibold text-black">
              No saved wishlist items
            </h3>
            <p className="mt-3 text-slate-500">
              Saved products will appear here when you add them.
            </p>
          </div>
        );
      }

      return (
        <div className="grid gap-4 px-8 py-8 md:grid-cols-2">
          {dashboardData.wishlist.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.productId}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40"
            >
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-lg font-semibold text-slate-500">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>
                    {getInitial(item.name, "W")}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-black">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Saved {formatDate(item.addedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    if (activeTab === "addresses") {
      return (
        <div className="px-8 py-16 text-center">
          <h3 className="text-2xl font-semibold text-black">
            No saved addresses
          </h3>
          <p className="mt-3 text-slate-500">
            Saved shipping addresses will appear here when they are added.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 px-8 py-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm uppercase tracking-wide text-slate-400">
            Name
          </p>
          <p className="mt-2 text-lg font-semibold text-black">
            {user?.name}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <p className="text-sm uppercase tracking-wide text-slate-400">
            Email
          </p>
          <p className="mt-2 break-all text-lg font-semibold text-black">
            {user?.email}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5 md:col-span-2">
          <p className="text-sm uppercase tracking-wide text-slate-400">
            Account ID
          </p>
          <p className="mt-2 break-all text-lg font-semibold text-black">
            {user?.id}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] px-6 pb-10 pt-32">
      <div className="mx-auto mt-4 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-black">
            My Profile
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            Manage your account, orders, cart and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black text-5xl font-bold text-white">
                  {avatarLetter}
                </div>

                <h2 className="mt-6 break-words text-center text-4xl font-bold text-black">
                  {user?.name}
                </h2>

                <p className="mt-2 text-lg text-slate-500">
                  Member Account
                </p>

                <button className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800">
                  Edit Profile
                </button>
              </div>

              <div className="my-8 border-t border-slate-200" />

              <div className="grid grid-cols-3 text-center">
                <div>
                  <h3 className="text-3xl font-bold text-black">
                    {dashboardData.orders.length}
                  </h3>
                  <p className="mt-1 text-slate-500">
                    Orders
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-black">
                    {dashboardData.wishlist.length}
                  </h3>
                  <p className="mt-1 text-slate-500">
                    Wishlist
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-black">
                    {cartCount}
                  </h3>
                  <p className="mt-1 text-slate-500">
                    Cart
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-black">
                Contact
              </h3>

              <div className="mt-6 space-y-4">
                <p className="text-lg text-slate-600">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={logoutHandler}
              className="w-full rounded-2xl bg-red-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-4 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-7 py-4 text-base transition ${
                    activeTab === tab.id
                      ? "bg-black font-semibold text-white"
                      : "font-medium text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
                <div>
                  <h2 className="text-3xl font-bold text-black">
                    {sectionTitles[activeTab]}
                  </h2>
                </div>
              </div>

              {renderActivePanel()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
