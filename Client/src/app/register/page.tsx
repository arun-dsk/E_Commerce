"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [strength, setStrength] = useState(0);

  const checkStrength = (val: string) => {
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setStrength(score);
  };

  const strengthColors = ["#f87171", "#fb923c", "#facc15", "#00b37e"];
  const strengthColor = strength > 0 ? strengthColors[strength - 1] : "#e5e7eb";

  const registerHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setIsSubmitting(true);
    const result = await register(`${firstName} ${lastName}`, email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Registration failed. Please try again.");
      return;
    }

    toast.success("Registration successful");
    router.push("/account");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0faf6] px-4 py-8">
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#d6f0e6] bg-white p-10">

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Create an account
        </h1>
        <p className="mb-8 mt-1 text-[13px] text-gray-800">
          Join thousands of users today
        </p>

        <form onSubmit={registerHandler} className="space-y-3">

          {/* Name row */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </span>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border-[1.5px] border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-[13.5px] text-gray-900 placeholder-gray-800 outline-none transition focus:border-[#00b37e] focus:bg-[#f0fdf9]"
              />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </span>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border-[1.5px] border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-[13.5px] text-gray-900 placeholder-gray-800 outline-none transition focus:border-[#00b37e] focus:bg-[#f0fdf9]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 6 10-6"/></svg>
            </span>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-[13.5px] text-gray-900 placeholder-gray-800 outline-none transition focus:border-[#00b37e] focus:bg-[#f0fdf9]"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 py-1">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[11px] text-gray-800">secure password</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); checkStrength(e.target.value); }}
              className="w-full rounded-xl border-[1.5px] border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-[13.5px] text-gray-900 placeholder-gray-800 outline-none transition focus:border-[#00b37e] focus:bg-[#f0fdf9]"
            />
          </div>

          {/* Strength bars */}
          <div className="flex gap-1 pb-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[3px] flex-1 rounded-full transition-all duration-300"
                style={{ background: i <= strength ? strengthColor : "#f0f0f0" }}
              />
            ))}
          </div>

          {/* Confirm password */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-800">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            </span>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-[13.5px] text-gray-900 placeholder-gray-800 outline-none transition focus:border-[#00b37e] focus:bg-[#f0fdf9]"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2.5 py-1">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 accent-[#00b37e]"
            />
            <label htmlFor="terms" className="text-[11.5px] leading-relaxed text-gray-800">
              I agree to the{" "}
              <Link href="/terms" className="text-[#00b37e] hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#00b37e] hover:underline">Privacy Policy</Link>
            </label>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-[12px] text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#00b37e] py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#009e6e] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>

          <p className="pt-1 text-center text-[12.5px] text-gray-800">
            Already have an account?{" "}
            <Link href="/account" className="font-medium text-[#00b37e] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}