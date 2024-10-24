'use client';
import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Clock, Users, Zap, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type UserData = {
  id: string;
  email: string;
  name: string;
  cost_per_hour?: number;
  skill_level?: string;
};

async function insertIfNotExists(table: string, data: UserData) {
  const { id, email, name, cost_per_hour = 0, skill_level = 'N/A' } = data;
  const { data: existingRow, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .limit(1)

  if (error) {
    console.error('Error checking data:', error)
    return false
  }

  if (existingRow.length > 0) {
    console.log('Data already exists. No need to insert.')
    return false
  }

  const { data: newData, error: insertError } = await supabase
    .from(table)
    .insert([{ id, email, name, cost_per_hour, skill_level }])

  if (insertError) {
    console.error('Error inserting data:', insertError)
    return false
  }

  console.log('Data inserted successfully:', newData)
  return true
}


const DashboardPage = () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const addUserToDatabase = async () => {
      if (user && user.email && user.sub) {
        const newUser: UserData = {
          id: user.sub,
          email: user.email,
          name: user.name || user.nickname || 'User',
        };
        
        const success = await insertIfNotExists('users', newUser);
        if (success) {
          console.log('User added to the database.');
        } else {
          console.log('User already exists.');
        }
      }
    };

    addUserToDatabase();
  }, [user]);

  if (isLoading) return <span className='loading loading-spinner loading-md'></span>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to view the dashboard.</p>
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Welcome, {user.name || user.nickname || 'User'}!
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: FileText, title: "Create Project", description: "Start a new project estimation", link: "/dashboard/createProject" },
            { icon: Users, title: "Teams", description: "Create and view teams", link: "/dashboard/teams" },
            { icon: Zap, title: "AI Insights", description: "Get AI-powered insights for your projects" },
            { icon: FileText, title: "Reports", description: "View old estimation reports" },
            { icon: Settings, title: "Settings", description: "Customize your dashboard and preferences" },
          ].map((item, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body text-center">
                <item.icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h2 className="card-title justify-center">{item.title}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-center mt-4">
                  {item.link ? (
                    <Link href={item.link} className="btn btn-primary">
                      View
                    </Link>
                  ) : (
                    <button className="btn btn-primary">View</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer footer-center p-10 bg-primary text-primary-content mt-16">
        <div>
          <p>&copy; 2024 Crystal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
