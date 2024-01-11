'use client'
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, deleteCookie } from '../comp/cookie';
import Link from 'next/link';


export default function Landing() {

  const router = useRouter()
  useEffect(() => {
    const token = getToken();

    if (!token) {
        router.push('/Login');
    }
  }, [router]);


  const handleLogout = () => {
    // Delete the cookie and redirect to the login page
    deleteCookie();
    router.push('/Login');
  };
  console.log('Hi')
  return (
    <div>
      <Link href={'/Login'} onClick={handleLogout}>Logout</Link>
    </div>
  )
}
