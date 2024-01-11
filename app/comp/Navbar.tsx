import React from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => (
    <main className="flex items-center justify-between p-4">
  <div className="flex items-center">
    
  </div>
  <nav className="flex items-center space-x-16">
    <ul className="flex space-x-16">
      <li className="hover:underline hover:text-orange-500">
        <Link href="/">Home</Link>
      </li>
      <li className="hover:underline hover:text-orange-500">
        <Link href="/Aboutus">About Us</Link>
      </li>
    </ul>
    <ul className="flex space-x-16">
      <li className="hover:underline hover:text-orange-500">
        <Link href="/Login">Login</Link>
      </li>
      <li className="hover:underline hover:text-orange-500">
        <Link href="/Help">Help</Link>
      </li>
      <li className="hover:underline hover:text-orange-500">
        <Link href="/Products">Products</Link>
      </li>
    </ul>
  </nav>
</main>

  
);

export default Nav;
