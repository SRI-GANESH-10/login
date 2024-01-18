import React from 'react';
import Link from 'next/link';
import Nav from './comp/Navbar';
import Image from 'next/image';

export default function Page() {
  const backgroundImageUrl = 'https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${backgroundImageUrl}")` }}>
      <Image
          alt="construct"
          src="/requirediconsforsidebarandheadercomponent/logo-yellow.svg"
          width={268}
          height={8}
          decoding="async"
          loading="lazy"
          className="absolute top-0 left-0 p-4 pl-6"
        />
      <div className="absolute top-0 right-0 p-4">
        <Link href={'/Login'}>Login</Link>
      </div>

      
    </div>
  );
}
