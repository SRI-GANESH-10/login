import React from "react";
import { Suspense } from "react";
import Loading from "./loading";
import Nav from "../comp/Navbar";
import Sidebar from "../comp/sidebar";
import RootLayout from "../layout";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <section className="flex flex-col h-screen">
        <Nav />

        <div className="flex flex-1">
          <div>
            <Sidebar />
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
