import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { signIn } from '../../firebase/auth';
import { getDocument } from '../../firebase/firestore';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign in with Firebase Auth
      const { user, error: signInError } = await signIn(formData.email, formData.password);
      
      if (signInError) {
        setError(signInError);
        return;
      }

      if (user) {
        // Check if user is admin in Firestore
        const { data: userData, error: userError } = await getDocument('users', user.uid);
        
        if (userError || !userData) {
          setError('User not found');
          return;
        }

        if (userData.role !== 'admin') {
          setError('Unauthorized access. Admin privileges required.');
          return;
        }

        // Create user object for authentication
        const adminData = {
          uid: user.uid,
          name: userData.name,
          email: user.email,
          role: 'admin'
        };

        // Save to localStorage and update app state
        localStorage.setItem('user', JSON.stringify(adminData));
        onLogin(adminData);

        // Redirect to admin dashboard
        navigate('/admin');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
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