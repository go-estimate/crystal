'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { supabase } from '@/lib/supabaseClient';

type Team = {
  id: number;
  name: string;
  admin_user_id: string;
};

const TeamsPage = () => {
  const { user, isLoading } = useUser();
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchTeams();
    }
  }, [user]);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        id,
        name,
        admin_user_id
      `)
      .eq('admin_user_id', user?.sub);

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setTeams(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() && user?.sub) {
      const newTeam = { 
        name: teamName.trim(),
        admin_user_id: user.sub
      };

      const { data, error } = await supabase
        .from('teams')
        .insert(newTeam)
        .select()
        .single();

      if (error) {
        console.error('Error creating team:', error);
      } else if (data) {
        setTeams([data, ...teams]);
        setTeamName('');
      }
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', teamId);

    if (!error) {
      setTeams(teams.filter(team => team.id !== teamId));
    }
    setDeleteConfirmation(null);
  };

  if (isLoading) return <span className='loading loading-spinner loading-md'></span>;

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <div className="card bg-base-100 shadow-xl mb-8">
              <div className="card-body">
                <h2 className="card-title mb-4 justify-center">Create a New Team</h2>
                <form onSubmit={handleSubmit} className="flex justify-center items-center">
                  <input
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="input input-bordered max-w-xs mr-2"
                  />
                  <button type="submit" className="btn btn-primary btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-4">Your Teams</h2>
              {teams.map((team) => (
                <div key={team.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-center">{team.name}</h3>
                      </div>
                      <div className="flex items-center space-x-4 ml-4">
                        <button className="btn btn-primary">Add Team Members</button>
                        <button 
                          className="btn btn-error btn-circle"
                          onClick={() => setDeleteConfirmation(team.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {deleteConfirmation !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this team?</h3>
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="btn btn-error hover:bg-red-600 transition-colors duration-200"
                      onClick={() => handleDeleteTeam(deleteConfirmation)}
                    >
                      Sure, delete it
                    </button>
                    <button 
                      className="btn btn-ghost hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => setDeleteConfirmation(null)}
                    >
                      I changed my mind
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Please log in to manage teams.</p>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
