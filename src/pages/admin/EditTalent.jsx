import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { talents, talentCategories, skillsList } from '../../data/sampleTalents';
import { talentProfiles } from '../../data/sampleTalentProfiles';

const EditTalent = () => {
  const navigate = useNavigate();
  const { talentId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    talentId: '',
    primaryRole: '',
    gender: '',
    age: '',
    location: '',
    experience: '',
    availability: '',
    skills: [],
    profileImage: '',
    height: '',
    weight: '',
    build: '',
    languages: [],
    bio: '',
  });

  useEffect(() => {
    // Find the talent in our data
    const talent = talents.find(t => t.talentId === talentId);
    const profile = talentProfiles[talentId];

    if (talent && profile) {
      setFormData({
        ...talent,
        ...profile,
        languages: profile.languages || [],
      });
      setIsLoading(false);
    } else {
      alert('Talent not found');
      navigate('/admin/manage-talents');
    }
  }, [talentId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the talent
    console.log('Updating talent:', formData);
    alert('Talent updated successfully!');
    navigate('/admin/manage-talents');
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
        <div className="container-custom py-8">
          <div className="flex items-center justify-center">
            <Icon icon="mdi:loading" className="w-8 h-8 animate-spin text-[var(--color-primary-500)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-[var(--color-accent-900)]">
              Edit Talent: {formData.name}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-900)]"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5" />
              Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  disabled
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg bg-[var(--color-accent-50)]"
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
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Experience (years)
                </label>
                <input
                  type="number"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Availability
                </label>
                <select
                  required
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                </select>
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="e.g., 5'11&quot;"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="e.g., 165 lbs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                  Build
                </label>
                <input
                  type="text"
                  value={formData.build}
                  onChange={(e) => setFormData(prev => ({ ...prev, build: e.target.value }))}
                  className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  placeholder="e.g., Athletic"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                required
                value={formData.profileImage}
                onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.value }))}
                className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              />
              {formData.profileImage && (
                <div className="mt-2">
                  <img
                    src={formData.profileImage}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] min-h-[100px]"
                placeholder="Write a brief bio..."
              />
            </div>

            {/* Skills */}
            <div>
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

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                Languages
              </label>
              <div className="flex flex-wrap gap-2">
                {['English', 'Luganda', 'Swahili', 'French'].map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => handleLanguageToggle(language)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      formData.languages.includes(language)
                        ? 'bg-[var(--color-primary-500)] text-white'
                        : 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)] hover:bg-[var(--color-accent-200)]'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-[var(--color-accent-300)] text-[var(--color-accent-700)] rounded-lg hover:bg-[var(--color-accent-50)] transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTalent;
