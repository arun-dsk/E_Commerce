"use client";

import { useContext, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const [dropDown, setDropdown] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user } = useAuth();

  const accountLabel =
    isAuthenticated && user
      ? user.name.split(" ")[0]
      : "Account";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        theme === "light"
          ? "border-slate-200 bg-white/85 text-slate-900 backdrop-blur-xl"
          : "border-white/10 bg-slate-950/85 text-white backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={50}
            priority
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-10 font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-emerald-500">
            Home
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-emerald-500"
          >
            About Us
          </Link>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-emerald-500">
              Products
              <IoIosArrowDown />
            </span>

            <AnimatePresence>
              {dropDown && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute left-0 top-10 flex min-w-[200px] flex-col gap-4 rounded-2xl p-5 shadow-2xl ring-1 ring-black/5 ${
                    theme === "light"
                      ? "bg-white text-slate-900"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  <span className="cursor-pointer transition-colors hover:text-emerald-500">
                    Electronics
                  </span>

                  <span className="cursor-pointer transition-colors hover:text-emerald-500">
                    Clothing
                  </span>

                  <span className="cursor-pointer transition-colors hover:text-emerald-500">
                    Accessories
                  </span>

                  <span className="cursor-pointer transition-colors hover:text-emerald-500">
                    Groceries
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="cursor-pointer transition-colors hover:text-emerald-500">
            Contact Us
          </span>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-6 text-xl md:flex">
          <IoSearchOutline className="cursor-pointer transition-colors hover:text-emerald-500" />

          <Link href="/account" className="flex cursor-pointer items-center gap-2 transition-colors hover:text-emerald-500">
            <FiUser />
            {accountLabel}
          </Link>

          {isAuthenticated && (
            <Link
              href="/cart"
              className="transition-colors hover:text-emerald-500"
              aria-label="Cart"
            >
              <FaCartShopping className="cursor-pointer" />
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer transition-colors hover:text-emerald-500"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <MdOutlineDarkMode />
            ) : (
              <MdLightMode />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="text-2xl md:hidden">
          <FaBars />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
