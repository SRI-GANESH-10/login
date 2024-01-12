import React from 'react';
import Link from 'next/link';
import Nav from './comp/Navbar';

export default function Page() {
  const backgroundImageUrl = 'https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${backgroundImageUrl}")` }}>
      <div className="absolute top-0 right-0 p-4">
        <Nav />
      </div>

      
    </div>
  );
}
