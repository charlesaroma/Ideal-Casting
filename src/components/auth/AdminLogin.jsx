import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
      const adminUser = {
        name: 'Admin User',
        email: formData.email,
        role: 'admin'
      };
      
      localStorage.setItem('user', JSON.stringify(adminUser));
      await onLogin(adminUser);
      
      window.location.href = '/admin';
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center mb-6">
              <Icon icon="mdi:shield-lock" className="w-12 h-12 text-[var(--color-primary-500)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-accent-900)] mb-6 text-center">
              Admin Login
            </h1>

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
                  placeholder="Enter admin email"
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
                  placeholder="Enter admin password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200"
              >
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 