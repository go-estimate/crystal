'use client';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Clock, Users, Zap, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

async function insertIfNotExists(table : string, data : {email : string}) {
  const { email } = data;
  const { data: existingRow, error } = await supabase
    .from(table)
    .select('*')
    .eq('email', email) 
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
    .insert([data]) 

  if (insertError) {
    console.error('Error inserting data:', insertError)
    return false
  }

  console.log('Data inserted successfully:', newData)
  return true // Insert was successful
}

const DashboardPage = async () => {
  const { user, error, isLoading } = useUser();

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

  const newUser = { email: user.email + ""}
    insertIfNotExists('users', newUser)
    .then(success => {
        if (success) {
        console.log('User added to the database.')
        } else {
        console.log('User already exists.')
        }
    })

  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Welcome, {user.nickname}!</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: "Recent Estimates", description: "View and manage your recent project estimates" },
            { icon: Users, title: "Resource Management", description: "Mangage your people and historic data" },
            { icon: Zap, title: "AI Insights", description: "Get AI-powered insights for your projects" },
            { icon: FileText, title: "Reports", description: "Generate and view estimation reports" },
            { icon: Settings, title: "Settings", description: "Customize your dashboard and preferences" },
          ].map((item, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <h2 className="card-title">{item.title}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">View</button>
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
