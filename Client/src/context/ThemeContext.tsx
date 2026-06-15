"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext =
  createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
  });

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedTheme =
        localStorage.getItem("theme");

      if (
        storedTheme === "dark" ||
        storedTheme === "light"
      ) {
        setTheme(storedTheme);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // Apply theme to html
  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
