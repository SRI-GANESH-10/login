// projects/[projectID]/LandingLayout.js
import React from "react";
import { Suspense } from "react";
import Loading from "../[projectID]/loading";
import Sidebar from "../../comp/sidebar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-[92vh]">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 mt-5">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </section>
  );
}
