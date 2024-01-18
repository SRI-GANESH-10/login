// pages/UserProfile.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, deleteCookie } from "../comp/cookie";

import { useRouter } from "next/navigation";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

interface UserProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  contact: any;
  number: number;
  gender: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
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
    deleteCookie();
    router.push("/Login");
  };

  return (
    <div className="w-1/2 mx-auto p-8 bg-gray-100 rounded-md shadow-md mt-24 flex items-center flex-col">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      {userData ? (
        <div className="bg-white p-6 border rounded-md mb-6 grid grid-cols-2 gap-2">
          <div className="text-lg font-semibold">First Name:</div>
          <div className="text-lg">{userData.firstName}</div>

          <div className="text-lg font-semibold">Last Name:</div>
          <div className="text-lg">{userData.lastName}</div>

          <div className="text-lg font-semibold">Email:</div>
          <div className="text-lg">{userData.email}</div>

          <div className="text-lg font-semibold">Mobile Number:</div>
          <div className="text-lg">{userData.contact.number}</div>

          <div className="text-lg font-semibold">Gender:</div>
          <div className="text-lg">{userData.gender}</div>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className="flex gap-8">
        <button className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none">
          <Link href={"/Login"} onClick={handleLogout}>
            Logout
          </Link>
        </button>
        <button className="border bg-slate-300 py-2 px-4 rounded-md flex gap-1 hover:bg-slate-400">
          <EditIcon />
          <Link href={""}>Edit </Link>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
