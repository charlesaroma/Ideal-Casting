import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { talentCategories, skillsList } from '../../data/sampleTalents';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate image URL if provided
      if (formData.profileImageUrl && !validateImageUrl(formData.profileImageUrl)) {
        throw new Error('Please enter a valid image URL (jpg, jpeg, png, gif, or webp)');
      }

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
        profileImage: formData.profileImageUrl,
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Use setDoc with merge option to ensure we don't overwrite existing data
      await setDoc(doc(db, 'talents', formData.talentId), talentData, { merge: true });

      // Navigate to talent directory after successful addition
      navigate('/talent-directory');
    } catch (err) {
      console.error('Error adding talent:', err);
      setError(err.message || 'Failed to add talent. Please try again.');
    } finally {
      setIsLoading(false);
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
                    Full Name
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
                    Talent ID
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
                    Primary Role
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
                      placeholder="Enter ImageKit URL"
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
                    Gender
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
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Age
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
                    Location
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
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
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

            {/* Submit Button */}
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
                  <>
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                    Add Talent
                  </>
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