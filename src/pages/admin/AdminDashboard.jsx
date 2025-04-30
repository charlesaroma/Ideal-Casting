import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { signUp } from '../../firebase/auth';
import { createDocument } from '../../firebase/firestore';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { auth } from '../../firebase/config';

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
  const [isLoading, setIsLoading] = useState(false);
  const [recentBookings, setRecentBookings] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [talentStats, setTalentStats] = useState({
    total: 0,
    available: 0,
    busy: 0
  });
  const [recentTalents, setRecentTalents] = useState([]);

  // Fetch talent statistics
  useEffect(() => {
    const talentsRef = collection(db, 'talents');
    
    // Query for all talents
    const unsubscribeTotal = onSnapshot(
      talentsRef,
      (snapshot) => {
        setTalentStats(prev => ({ ...prev, total: snapshot.size }));
      }
    );

    // Query for available talents
    const availableQuery = query(
      talentsRef,
      where('availability', '==', 'Available')
    );
    const unsubscribeAvailable = onSnapshot(
      availableQuery,
      (snapshot) => {
        setTalentStats(prev => ({ ...prev, available: snapshot.size }));
      }
    );

    // Query for busy talents (combining 'Not Available' and 'On Project' statuses)
    const busyQuery = query(
      talentsRef,
      where('availability', 'in', ['Not Available', 'On Project'])
    );
    const unsubscribeBusy = onSnapshot(
      busyQuery,
      (snapshot) => {
        setTalentStats(prev => ({ ...prev, busy: snapshot.size }));
      }
    );

    return () => {
      unsubscribeTotal();
      unsubscribeAvailable();
      unsubscribeBusy();
    };
  }, []);

  // Fetch recent booking requests
  useEffect(() => {
    const q = query(
      collection(db, 'bookingRequests'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setRecentBookings(bookings);
      
      // Count pending requests
      const pending = bookings.filter(booking => booking.status === 'pending').length;
      setPendingCount(pending);
    });

    return () => unsubscribe();
  }, []);

  // Fetch recent talents
  useEffect(() => {
    const talentsQuery = query(
      collection(db, 'talents'),
      orderBy('createdAt', 'desc'),
      limit(4)
    );

    const unsubscribe = onSnapshot(talentsQuery, (snapshot) => {
      const talents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentTalents(talents);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
    },
    {
      title: 'Booking Requests',
      description: 'Manage and respond to booking requests',
      icon: 'mdi:calendar-clock',
      link: '/admin/booking-requests',
      color: 'purple'
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
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Store current admin user before creating new account
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('You must be logged in as an admin to create another admin');
      }

      // Create user in Firebase Auth
      const { user, error: signUpError } = await signUp(formData.email, formData.password);
      
      if (signUpError) {
        console.error('Firebase Auth Error:', signUpError);
        setError(signUpError);
        setIsLoading(false);
        return;
      }

      if (user) {
        // Important: Sign back in as admin to prevent being logged out
        await auth.updateCurrentUser(currentUser);

        // Create admin profile in Firestore
        const adminData = {
          uid: user.uid,
          name: formData.name,
          email: formData.email,
          role: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          phoneNumber: '',
          address: '',
          profileImage: '',
          bio: '',
          interests: [],
          lastLogin: new Date().toISOString()
        };

        console.log('Creating admin document for:', user.uid);
        const { error: createError } = await createDocument('users', user.uid, adminData);

        if (createError) {
          console.error('Firestore Error:', createError);
          setError('Failed to create admin profile. Error: ' + createError);
          setIsLoading(false);
          return;
        }

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
      }
    } catch (error) {
      console.error('Admin creation error:', error);
      setError('Failed to create admin user. Error: ' + error.message);
    } finally {
      setIsLoading(false);
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
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 disabled:bg-[var(--color-accent-400)] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Admin User'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Total Talents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">
                    {talentStats.total}
                  </h3>
                </div>
                <Icon icon="mdi:account-group" className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-primary-500)]" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Available Talents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">
                    {talentStats.available}
                  </h3>
                </div>
                <Icon icon="mdi:account-check" className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Busy Talents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">
                    {talentStats.busy}
                  </h3>
                </div>
                <Icon icon="mdi:account-clock" className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">Pending Requests</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-900)]">{pendingCount}</h3>
                </div>
                <Icon icon="mdi:calendar-clock" className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

          {/* Talent Showcase */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--color-accent-900)]">
                Recent Talents
              </h2>
              <Link
                to="/admin/manage-talents"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] text-sm flex items-center gap-1"
              >
                View All
                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentTalents.map((talent) => (
                <div key={talent.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-[4/3] relative bg-[var(--color-accent-100)]">
                    <img
                      src={talent.profileImage || '/placeholder-talent.jpg'}
                      alt={talent.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        talent.availability === 'Available' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {talent.availability}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-accent-900)] mb-1">
                      {talent.name}
                    </h3>
                    <p className="text-sm text-[var(--color-accent-600)] mb-2">
                      {talent.primaryRole || 'Actor'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {talent.skills?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {talent.skills?.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full">
                          +{talent.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Link
                      to={`/admin/edit-talent/${talent.id}`}
                      className="block w-full text-center px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 text-sm"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              ))}
              {recentTalents.length === 0 && (
                <div className="col-span-full bg-white rounded-xl shadow-lg p-8 text-center">
                  <Icon icon="mdi:account-multiple" className="w-12 h-12 mx-auto mb-2 text-[var(--color-accent-400)]" />
                  <p className="text-[var(--color-accent-600)]">No talents added yet</p>
                  <Link
                    to="/admin/add-talent"
                    className="inline-block mt-4 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 text-sm"
                  >
                    Add New Talent
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Booking Requests */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--color-accent-900)]">
                Recent Booking Requests
                {pendingCount > 0 && (
                  <span className="ml-2 px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                    {pendingCount} Pending
                  </span>
                )}
              </h2>
              <Link
                to="/admin/booking-requests"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] text-sm flex items-center gap-1"
              >
                View All
                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {recentBookings.length === 0 ? (
                <div className="p-6 text-center text-[var(--color-accent-600)]">
                  <Icon icon="mdi:calendar-blank" className="w-12 h-12 mx-auto mb-2 text-[var(--color-accent-400)]" />
                  <p>No booking requests yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[var(--color-accent-50)]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-accent-600)] uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-accent-600)] uppercase tracking-wider">Talent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-accent-600)] uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-accent-600)] uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-accent-200)]">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-[var(--color-accent-50)]">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-accent-900)]">
                            {booking.createdAt?.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-accent-900)]">
                            {booking.talentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-[var(--color-accent-900)]">{booking.requestedBy.name}</div>
                            <div className="text-xs text-[var(--color-accent-600)]">{booking.requestedBy.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 