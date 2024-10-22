import React from 'react'
import LogInButton from './components/logIn';
import { BarChart2 } from 'lucide-react';

const NavBar = () => {
  return (
    <header className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <BarChart2 className="w-8 h-8 text-primary mr-2" />
          <span className="text-2xl font-bold text-primary">Crystal</span>
        </div>
        <div className="flex-none">
          <LogInButton />
        </div>
      </header>
    
  )
}

export default NavBar