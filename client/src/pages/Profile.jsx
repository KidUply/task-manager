import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Activity } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
      
      <div className="glass-panel p-8 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-8 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-center text-5xl text-white font-bold shadow-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full inline-flex">
              <Activity size={16} className="text-indigo-400" />
              <span className="text-sm font-medium">Active Member</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-black/20 p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <User size={18} />
              <span className="text-sm font-medium uppercase tracking-wider">Full Name</span>
            </div>
            <p className="text-lg text-white font-medium pl-8">{user.name}</p>
          </div>
          
          <div className="bg-black/20 p-5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Mail size={18} />
              <span className="text-sm font-medium uppercase tracking-wider">Email Address</span>
            </div>
            <p className="text-lg text-white font-medium pl-8">{user.email}</p>
          </div>
          
          <div className="bg-black/20 p-5 rounded-xl border border-white/5 sm:col-span-2">
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Calendar size={18} />
              <span className="text-sm font-medium uppercase tracking-wider">Member Since</span>
            </div>
            <p className="text-lg text-white font-medium pl-8">{formatDate(user.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
