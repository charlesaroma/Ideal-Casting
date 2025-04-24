import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LoadingSpinner from '../common/LoadingSpinner';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Show loading spinner and reload the page
      window.location.reload();
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-[var(--color-accent-900)] mb-6">
              Login to Your Account
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
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
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[var(--color-accent-600)]">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
