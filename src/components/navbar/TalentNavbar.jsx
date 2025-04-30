// src/components/navbar/TalentNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { logOut } from '../../firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import LoadingSpinner from '../common/LoadingSpinner';

const TalentNavbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [talentData, setTalentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        if (user?.talentId) {
          const talentDoc = await getDoc(doc(db, 'talents', user.talentId));
          if (talentDoc.exists()) {
            setTalentData(talentDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching talent data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalentData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const navLinks = [
    {
      path: '/talent-dashboard',
      label: 'Dashboard',
      icon: 'mdi:view-dashboard',
    },
    {
      path: '/talent-profile',
      label: 'Profile',
      icon: 'mdi:account',
    },
    {
      path: '/talent-bookings',
      label: 'Bookings',
      icon: 'mdi:calendar-check',
    },
    {
      path: '/talent-notifications',
      label: 'Notifications',
      icon: 'mdi:bell',
    },
  ];

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <LoadingSpinner text="Loading..." />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/talent-dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-[var(--color-primary-500)]">
              Ideal Casting
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                    : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
                }`}
              >
                <Icon icon={link.icon} className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                {imageError || !talentData?.profileImage ? (
                  <div className="w-full h-full rounded-full bg-[var(--color-accent-100)] flex items-center justify-center">
                    <Icon 
                      icon="mdi:account" 
                      className="w-5 h-5 text-[var(--color-accent-400)]" 
                    />
                  </div>
                ) : (
                  <img
                    src={talentData.profileImage}
                    alt={user?.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                  />
                )}
              </div>
              <span className="text-[var(--color-accent-900)] font-medium">
                {user?.name || user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-900)]"
            >
              <Icon icon="mdi:logout" className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TalentNavbar;