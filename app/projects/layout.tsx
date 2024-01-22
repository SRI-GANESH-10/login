// projects/LandingLayout.js
import React from "react";
import Nav from "../comp/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Nav />
      {children}
    </section>
  );
}
