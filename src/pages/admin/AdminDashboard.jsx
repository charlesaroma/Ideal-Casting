import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AdminDashboard = () => {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const adminActions = [
    {
      title: 'Add New Talent',
      description: 'Create a new talent profile in the system',
      icon: 'mdi:account-plus',
      link: '/admin/add-talent',
      color: 'emerald'
    },
    {
      title: 'Manage Talents',
      description: 'View, edit, or remove existing talents',
      icon: 'mdi:account-group',
      link: '/admin/manage-talents',
      color: 'blue'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // Get existing admins or initialize empty array
      const existingAdmins = JSON.parse(localStorage.getItem('adminUsers') || '[]');
      
      // Check if email already exists
      if (existingAdmins.some(admin => admin.email === formData.email)) {
        setError('An admin with this email already exists');
        return;
      }

      // Create new admin user object
      const newAdmin = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In a real app, this should be hashed
        role: 'admin',
        createdAt: new Date().toISOString()
      };

      // Add new admin to the list
      const updatedAdmins = [...existingAdmins, newAdmin];
      
      // Save to localStorage
      localStorage.setItem('adminUsers', JSON.stringify(updatedAdmins));
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      });
      
      setSuccess('Admin user created successfully! They can now log in using these credentials.');
      
      // Hide the form after successful creation
      setTimeout(() => {
        setShowCreateAdmin(false);
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError('Failed to create admin user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-accent-900)]">
              Admin Dashboard
            </h1>
            <button
              onClick={() => setShowCreateAdmin(!showCreateAdmin)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200"
            >
              <Icon icon="mdi:account-plus" className="w-5 h-5" />
              {showCreateAdmin ? 'Cancel' : 'Create Admin User'}
            </button>
          </div>

          {/* Create Admin Form */}
          {showCreateAdmin && (
            <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-accent-900)] mb-4">
                Create New Admin User
              </h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="Enter password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200"
                  >
                    Create Admin User
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Total Talents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">24</h3>
                </div>
                <Icon icon="mdi:account-group" className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-primary-500)]" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Available Talents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">18</h3>
                </div>
                <Icon icon="mdi:account-check" className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Busy Talents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">6</h3>
                </div>
                <Icon icon="mdi:account-clock" className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {adminActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className="block bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 sm:p-3 rounded-lg bg-${action.color}-50`}>
                    <Icon icon={action.icon} className={`w-6 h-6 sm:w-8 sm:h-8 text-${action.color}-500`} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-accent-900)] mb-1 sm:mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--color-accent-600)]">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 