"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, deleteCookie } from "../comp/cookie";
import Link from "next/link";

export default function Landing() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/Login");
    }
  }, [router]);

  const handleLogout = () => {
    // Delete the cookie and redirect to the login page
    deleteCookie();
    router.push("/Login");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">This is Landing Page</h1>

      <Link
        href="/Login"
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-red-600 transition duration-300"
      >
        Logout
      </Link>

      <Link
        href="/Profile"
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Profile
      </Link>
    </div>
  );
}
