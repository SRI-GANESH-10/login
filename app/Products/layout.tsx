// LandingLayout.tsx

import React from "react";
import { Suspense } from "react";
import Loading from "./loading";
import Nav from "../comp/Navbar";
import Sidebar from "../comp/sidebar";
export default function LandingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen">
      
      <Nav/>

      <div className="flex flex-1">
        <div>
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </section>
  );
}
