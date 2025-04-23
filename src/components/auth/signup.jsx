import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { signUp } from '../../firebase/auth';
import { createDocument } from '../../firebase/firestore';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const ADMIN_SECRET_CODE = 'ADMIN123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    try {
      // Create user with Firebase Auth
      const { user, error: signUpError } = await signUp(formData.email, formData.password);
      
      if (signUpError) {
        console.error('Firebase Auth Error:', signUpError);
        setError(signUpError);
        return;
      }

      if (user) {
        // Check if admin code matches
        const isAdmin = formData.adminCode === ADMIN_SECRET_CODE;
        console.log('Creating user document for:', user.uid, 'isAdmin:', isAdmin);

        // Create user profile in Firestore
        const userData = {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          role: isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          phoneNumber: '',
          address: '',
          profileImage: '',
          bio: '',
          interests: [],
          lastLogin: new Date().toISOString()
        };

        console.log('Attempting to create document with data:', userData);
        const { error: createError } = await createDocument('users', user.uid, userData);

        if (createError) {
          console.error('Firestore Error:', createError);
          setError('Failed to create user profile. Please try again. Error: ' + createError);
          return;
        }

        console.log('User document created successfully');
        // Save to localStorage and update app state
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
        
        // Redirect based on role and reload page
        if (isAdmin) {
          navigate('/admin');
          setTimeout(() => window.location.reload(), 100);
        } else {
          navigate('/');
          setTimeout(() => window.location.reload(), 100);
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create account. Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-[var(--color-primary-500)]/5 rounded-full"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-secondary-500)]/5 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md px-6 py-12 sm:px-0">
        <div className="bg-[var(--color-accent-50)]/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/ideal.png" 
                alt="Ideal Casting Logo" 
                className="h-16 w-auto mx-auto"
              />
            </Link>
            <h2 className="text-3xl font-bold text-[var(--color-accent-900)]">
              Create Account
            </h2>
            <p className="mt-2 text-[var(--color-accent-600)]">
              Join our talent network today
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <Icon 
                    icon="mdi:account-outline" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] h-5 w-5"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="pl-10 w-full px-4 py-3 bg-[var(--color-accent-50)] rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Email
                </label>
                <div className="relative">
                  <Icon 
                    icon="mdi:email-outline" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] h-5 w-5"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 w-full px-4 py-3 bg-[var(--color-accent-50)] rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Icon 
                    icon="mdi:lock-outline" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] h-5 w-5"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10 w-full px-4 py-3 bg-[var(--color-accent-50)] rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Icon 
                    icon="mdi:lock-check-outline" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] h-5 w-5"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="pl-10 w-full px-4 py-3 bg-[var(--color-accent-50)] rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adminCode" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Admin Code (Optional)
                </label>
                <div className="relative">
                  <Icon 
                    icon="mdi:shield-key-outline" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] h-5 w-5"
                  />
                  <input
                    id="adminCode"
                    name="adminCode"
                    type="password"
                    className="pl-10 w-full px-4 py-3 bg-[var(--color-accent-50)] rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Enter admin code if you have one"
                    value={formData.adminCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, adminCode: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] border-[var(--color-accent-300)] rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-[var(--color-accent-600)]">
                I agree to the{' '}
                <Link to="/terms" className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-[var(--color-accent-50)] bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-500)] transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-accent-300)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-accent-50)] text-[var(--color-accent-500)]">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-[var(--color-accent-300)] rounded-xl text-sm font-medium text-[var(--color-accent-700)] bg-[var(--color-accent-50)] hover:bg-[var(--color-accent-100)] transition-all duration-200"
              >
                <Icon icon="flat-color:google" className="h-5 w-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-[var(--color-accent-300)] rounded-xl text-sm font-medium text-[var(--color-accent-700)] bg-[var(--color-accent-50)] hover:bg-[var(--color-accent-100)] transition-all duration-200"
              >
                <Icon icon="logos:facebook" className="h-5 w-5 mr-2" />
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--color-accent-600)]">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
