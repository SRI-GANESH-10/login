"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, deleteCookie } from "../comp/cookie";
import Link from "next/link";
import DashboardPage from "../SidebarContent/Dashboard/page";

const Products = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/Login");
    }
    else{
      router.push('/SidebarContent/Dashboard')
    }
  }, [router]);


  const handleLogout = () => {
    deleteCookie();
    router.push("/Login");
  };

  return (
    <></>
  );
};

export default Products;
