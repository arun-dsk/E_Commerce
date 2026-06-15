"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import CartPersistence from "@/Components/CartPersistence/CartPersistence";
import { AuthProvider } from "@/context/AuthContext";
import { store } from "@/redux/store";
import ThemeProvider from "@/context/ThemeContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <CartPersistence />
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
