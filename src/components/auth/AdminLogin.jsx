import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign in with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // Add a slight delay to ensure Firebase auth state is propagated
      // This ensures the user data is fully loaded before redirecting
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Logging in..." />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[var(--color-accent-900)]">
                Admin Login
              </h1>
              <p className="mt-2 text-[var(--color-accent-600)]">
                Sign in to access the admin dashboard
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-[var(--color-accent-600)]">
                Not an admin?{' '}
                <Link
                  to="/login"
                  className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]"
                >
                  Regular login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 