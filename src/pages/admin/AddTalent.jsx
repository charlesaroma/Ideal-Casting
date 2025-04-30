import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { talentCategories, skillsList } from '../../data/sampleTalents';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const AddTalent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    talentId: '',
    primaryRole: '',
    gender: '',
    age: '',
    location: '',
    experience: '',
    availability: 'Available',
    skills: [],
    profileImageUrl: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, profileImageUrl: url }));
    setImagePreview(url);
  };

  const validateImageUrl = (url) => {
    if (!url) return false;
    // Basic URL validation for image files
    const imageUrlPattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    return imageUrlPattern.test(url);
  };

  const checkTalentIdExists = async (talentId) => {
    try {
      const talentDoc = await getDoc(doc(db, 'talents', talentId));
      return talentDoc.exists();
    } catch (error) {
      console.error('Error checking talent ID:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.talentId || !formData.name || !formData.email || !formData.password) {
        throw new Error('Please fill in all required fields');
      }

      // Check if talent ID already exists
      const talentExists = await checkTalentIdExists(formData.talentId);
      if (talentExists) {
        throw new Error('Talent ID already exists. Please choose a different one.');
      }

      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Validate image URL if provided
      if (formData.profileImageUrl && !validateImageUrl(formData.profileImageUrl)) {
        throw new Error('Please enter a valid image URL (jpg, jpeg, png, gif, or webp)');
      }

      // Get current admin user
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('You must be logged in as an admin to add talent');
      }

      // Create talent account but don't sign in
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid;
      
      // Important: Sign back in as admin to prevent being logged out
      await auth.updateCurrentUser(currentUser);

      // Create user document in Firestore
      const userData = {
        uid: userId,
        name: formData.name,
        email: formData.email,
        role: 'talent',
        talentId: formData.talentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        phoneNumber: '',
        address: '',
        profileImage: formData.profileImageUrl || 'https://via.placeholder.com/150',
        bio: '',
        interests: [],
        lastLogin: new Date().toISOString()
      };

      // Create user document first
      await setDoc(doc(db, 'users', userId), userData);

      // Create talent document in Firestore
      const talentData = {
        name: formData.name,
        talentId: formData.talentId,
        primaryRole: formData.primaryRole,
        gender: formData.gender,
        age: Number(formData.age),
        location: formData.location,
        experience: Number(formData.experience),
        availability: formData.availability,
        skills: formData.skills,
        profileImage: formData.profileImageUrl || 'https://via.placeholder.com/150',
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: userId, // Link to the auth account
        email: formData.email,
        role: 'talent',
        status: 'active'
      };

      // Then create talent document
      await setDoc(doc(db, 'talents', formData.talentId), talentData);

      // Reset form
      setFormData({
        name: '',
        talentId: '',
        primaryRole: '',
        gender: '',
        age: '',
        location: '',
        experience: '',
        availability: 'Available',
        skills: [],
        profileImageUrl: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Show success message and navigate
      setIsLoading(false);
      navigate('/talent-directory', { 
        replace: true,
        state: { success: `Talent ${formData.name} was added successfully!` }
      });
    } catch (err) {
      console.error('Error adding talent:', err);
      // Handle specific Firebase errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (err.code === 'permission-denied') {
        setError('You do not have permission to perform this action. Please make sure you are logged in as an admin.');
      } else {
        setError(err.message || 'Failed to add talent. Please try again.');
      }
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <LoadingSpinner text="Adding talent..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-[var(--color-accent-900)]">
              Add New Talent
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-900)]"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5" />
              Back
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Talent ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.talentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, talentId: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Primary Role *
                  </label>
                  <select
                    required
                    value={formData.primaryRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryRole: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  >
                    <option value="">Select Role</option>
                    {talentCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Profile Image URL
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="Enter Image URL"
                      value={formData.profileImageUrl}
                      onChange={handleImageUrlChange}
                      className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    />
                    {imagePreview && (
                      <div className="relative w-32 h-32">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-lg"
                          onError={() => {
                            setError('Invalid image URL. Please check the URL and try again.');
                            setImagePreview(null);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, profileImageUrl: '' }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Icon icon="mdi:close" className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Gender *
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Location *
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  >
                    <option value="">Select Location</option>
                    <option value="Kampala">Kampala</option>
                    <option value="Entebbe">Entebbe</option>
                    <option value="Jinja">Jinja</option>
                    <option value="Lira">Lira</option>
                    <option value="Gulu">Gulu</option>
                    <option value="Arua">Arua</option>
                    <option value="Mbale">Mbale</option>
                    <option value="Mbarara">Mbarara</option>
                    <option value="Soroti">Soroti</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Experience (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Availability *
                  </label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Skills *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillsList.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`p-2 rounded-lg text-sm ${
                          formData.skills.includes(skill)
                            ? 'bg-[var(--color-primary-500)] text-white'
                            : 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)] hover:bg-[var(--color-accent-200)]'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                    Adding Talent...
                  </>
                ) : (
                  'Add Talent'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTalent; 