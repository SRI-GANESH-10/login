import { Suspense } from "react";
import UserProfile from "./page";
import Loading from "./loading";
import Nav from "../comp/Navbar";

export default function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />
      <Suspense fallback={<Loading />}></Suspense>
      {children}
    </section>
  );
}
