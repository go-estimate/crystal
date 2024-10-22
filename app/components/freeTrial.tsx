'use client';
import React from 'react'
import {ChevronRight} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const FreeTrialButton = () => {
  const { user, error, isLoading } = useUser();

  if(user)
    return(
    <div>
      <Link href="/dashboard" className="inline-block">
        <button className="btn btn-primary btn-lg flex items-center">
          Go to Dashboard
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </Link>
    </div>
    )
  return (
    <div>
      <Link href="/api/auth/login?screen_hint=signup&returnTo=/dashboard" className="inline-block">
        <button className="btn btn-primary btn-lg flex items-center">
          Sign Up
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </Link>
    </div>
  )
}

export default FreeTrialButton
