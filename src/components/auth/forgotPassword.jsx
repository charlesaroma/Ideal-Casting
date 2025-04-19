import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-[var(--color-primary-500)]/5 rounded-full"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-secondary-500)]/5 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md px-6 py-12 sm:px-0">
        <div className="bg-[var(--color-accent-50)]/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="ideal.png" 
                alt="Ideal Casting Logo" 
                className="h-16 w-auto mx-auto"
              />
            </Link>
            <h2 className="text-3xl font-bold text-[var(--color-accent-900)]">
              Reset Password
            </h2>
            <p className="mt-2 text-[var(--color-accent-600)]">
              Enter your email to receive a password reset link
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-[var(--color-accent-50)] bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-500)] transform transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <span>Send Reset Link</span>
                <Icon icon="mdi:send" className="ml-2 h-5 w-5" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Icon 
                  icon="mdi:email-check" 
                  className="h-16 w-16 text-[var(--color-primary-500)]"
                />
              </div>
              <p className="text-[var(--color-accent-700)]">
                If an account exists for <span className="font-medium">{email}</span>, you will receive a password reset link shortly.
              </p>
              <p className="text-sm text-[var(--color-accent-500)]">
                Please check your email and follow the instructions.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200"
            >
              <Icon icon="mdi:arrow-left" className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
