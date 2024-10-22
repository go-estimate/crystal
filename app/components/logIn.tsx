'use client';
import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';


const LogInButton = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <span className='loading loading-spinner loading-md'></span>;
  if (error) return <div>{error.message}</div>;

  if(user)
    return(
      <div className="flex items-center gap-2">
        <img src={user.picture || ''} alt={user.name || ''} className="w-10 h-10 rounded-full" />
        <Link href="/api/auth/logout" className="btn btn-ghost">
          Log Out
        </Link>
      </div>
  )

  return (
    <div>
      <Link href="/api/auth/login?returnTo=/dashboard" className="btn btn-ghost mr-2">
        Log in
      </Link>
      <Link href="/api/auth/login?screen_hint=signup&returnTo=/dashboard" className="btn btn-primary">
        Sign Up
      </Link>
    </div>
  )
}

export default LogInButton
