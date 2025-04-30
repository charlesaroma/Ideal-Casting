// src/pages/talent/TalentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { auth } from '../../firebase/config';
import { getDocument } from '../../firebase/firestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TalentDashboard = () => {
  const navigate = useNavigate();
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTalentData = async () => {
      try {
        // Get user document
        const { data: userData } = await getDocument('users', auth.currentUser.uid);
        if (!userData) throw new Error('User not found');

        // Get talent document using talentId from user data
        const { data: talentData } = await getDocument('talents', userData.talentId);
        if (!talentData) throw new Error('Talent profile not found');

        setTalent(talentData);
      } catch (err) {
        console.error('Error loading talent data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      loadTalentData();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
        <div className="container-custom py-8">
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img
                    src={talent.profileImage || 'default-profile.jpg'}
                    alt={talent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-accent-900)]">
                  {talent.name}
                </h2>
                <p className="text-[var(--color-accent-600)] mb-4">{talent.primaryRole}</p>
                <div className="flex items-center gap-2 text-[var(--color-accent-600)]">
                  <Icon icon="mdi:map-marker" />
                  <span>{talent.location}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-accent-600)]">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    talent.availability === 'Available' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {talent.availability}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-accent-600)]">Experience</span>
                  <span>{talent.experience} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-accent-600)]">Rating</span>
                  <div className="flex items-center gap-1">
                    <Icon icon="mdi:star" className="text-yellow-400" />
                    <span>{talent.rating || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigate('/edit-profile')}
                  className="w-full py-2 px-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:edit" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon icon="mdi:calendar-check" className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-accent-600)]">Upcoming</h3>
                    <p className="text-2xl font-bold text-[var(--color-accent-900)]">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-accent-600)]">Completed</h3>
                    <p className="text-2xl font-bold text-[var(--color-accent-900)]">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Icon icon="mdi:star" className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-[var(--color-accent-600)]">Reviews</h3>
                    <p className="text-2xl font-bold text-[var(--color-accent-900)]">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-accent-900)] mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-accent-900)] mb-4">
                Recent Activity
              </h3>
              <div className="text-center text-[var(--color-accent-600)] py-8">
                <Icon icon="mdi:information" className="w-12 h-12 mx-auto mb-4" />
                <p>No recent activity to display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDashboard;