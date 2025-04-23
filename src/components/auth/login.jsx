import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
 
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      name: formData.email.split('@')[0],
      email: formData.email,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    onLogin(userInfo);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-[var(--color-primary-500)]/5 rounded-full"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-accent-200)]/10 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md px-6 py-12 sm:px-0">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="ideal.png" 
                alt="Ideal Casting Logo" 
                className="h-16 w-auto mx-auto"
              />
            </Link>
            <h2 className="text-3xl font-bold text-[var(--color-accent-900)]">
              Welcome Back
            </h2>
            <p className="mt-2 text-[var(--color-accent-600)]">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                    className="pl-10 w-full px-4 py-3 bg-white rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                    className="pl-10 w-full px-4 py-3 bg-white rounded-xl border border-[var(--color-accent-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] focus:ring-1 focus:outline-none transition-all duration-200"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)] border-[var(--color-accent-300)] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--color-accent-600)]">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-500)] transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <span>Sign in</span>
              <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-accent-300)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[var(--color-accent-500)]">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-[var(--color-accent-300)] rounded-xl text-sm font-medium text-[var(--color-accent-700)] bg-white hover:bg-[var(--color-accent-50)] transition-all duration-200"
              >
                <Icon icon="flat-color:google" className="h-5 w-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-[var(--color-accent-300)] rounded-xl text-sm font-medium text-[var(--color-accent-700)] bg-white hover:bg-[var(--color-accent-50)] transition-all duration-200"
              >
                <Icon icon="logos:facebook" className="h-5 w-5 mr-2" />
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--color-accent-600)]">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="font-medium text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
