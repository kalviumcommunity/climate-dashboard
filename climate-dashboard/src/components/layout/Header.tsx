"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(
        now.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Climate Dashboard</h1>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">{date}</p>
            <p className="text-lg font-medium">{time}</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
