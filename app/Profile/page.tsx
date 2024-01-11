// pages/UserProfile.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, deleteCookie } from "../comp/cookie";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  // Add more properties based on your actual API response
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          // Redirect to login page if token is not available
          router.push("/Login");
          return;
        }

        const response = await axios.get(
          "https://api.dev2.constructn.ai/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data.result);
      } catch (error) {
        console.error("Error fetching user profile:", error);

        // Redirect to login page on error
        router.push("/Login");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    // Delete the cookie and redirect to the login page
    deleteCookie();
    router.push("/Login");
  };

  return (
    <div className="w-1/2 mx-auto p-8 bg-orange-200 rounded-md shadow-md mt-24 pb-24">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {userData ? (
        <div className="bg-white p-4 border rounded-md mb-4">
          <p className="text-lg">Full Name: {userData.firstName}</p>
          <p className="text-lg">Email: {userData.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}

      <span className="p-2 bg-black font-bold text-white rounded-md"><Link
        href={"/Login"}
        onClick={handleLogout}
      >
        LogOut
      </Link></span>
    </div>
  );
};

export default UserProfile;
