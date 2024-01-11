'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, deleteCookie } from "../comp/cookie";
import Link from "next/link";

const Home = () => {
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
    <div className="mt-24 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page</h1>
      <p className="text-gray-600 mb-8">Feel free to explore and navigate!</p>
      <Link href={"/Login"} onClick={handleLogout} className="text-blue-500 underline cursor-pointer">
        Logout
      </Link>
    </div>
  );
};

export default Home;
