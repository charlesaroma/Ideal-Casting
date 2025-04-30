// src/components/navbar/TalentNavbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { logOut } from '../../firebase/auth';

const TalentNavbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
              <img
                src={user?.photoURL || '/default-avatar.png'}
                alt={user?.displayName || 'User'}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-[var(--color-accent-900)] font-medium">
                {user?.displayName || user?.email}
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