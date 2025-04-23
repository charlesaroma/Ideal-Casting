import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { talentCategories, skillsList } from '../../data/sampleTalents';
import { getDocument, updateDocument } from '../../firebase/firestore';
import { uploadFile, deleteFile } from '../../firebase/storage';

const EditTalent = () => {
  const navigate = useNavigate();
  const { talentId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    primaryRole: '',
    gender: '',
    age: '',
    location: '',
    experience: '',
    availability: 'Available',
    skills: [],
    profileImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [useImageUrl, setUseImageUrl] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const { data: talentData, error: fetchError } = await getDocument('talents', talentId);
        
        if (fetchError) {
          throw new Error(fetchError);
        }

        if (!talentData) {
          throw new Error('Talent not found');
        }

        setFormData(talentData);
        if (talentData.profileImage) {
          setImagePreview(talentData.profileImage);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch talent data');
      } finally {
        setIsFetching(false);
      }
    };

    fetchTalent();
  }, [talentId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setUseImageUrl(false);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setNewImage(null);
    setUseImageUrl(true);
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let imageUrl = formData.profileImage;
      
      if (useImageUrl) {
        // Use the provided image URL
        imageUrl = imageUrl;
      } else if (newImage) {
        // Handle image file upload if new image is selected
        if (formData.profileImage) {
          await deleteFile(`talents/${talentId}/profile-image`);
        }

        // Upload new image
        const imagePath = `talents/${talentId}/profile-image`;
        const { url, error: uploadError } = await uploadFile(newImage, imagePath);
        
        if (uploadError) {
          throw new Error(uploadError);
        }
        
        imageUrl = url;
      }

      // Update talent document in Firestore
      const talentData = {
        ...formData,
        profileImage: imageUrl,
        age: Number(formData.age),
        experience: Number(formData.experience),
        updatedAt: new Date().toISOString()
      };

      const { error: updateError } = await updateDocument('talents', talentId, talentData);

      if (updateError) {
        throw new Error(updateError);
      }

      navigate('/talent-directory');
    } catch (err) {
      setError(err.message || 'Failed to update talent. Please try again.');
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

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
        <div className="container-custom py-8">
          <div className="flex justify-center items-center">
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
              Edit Talent
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
                    Profile Image
                  </label>
                  <div className="space-y-4">
                    {/* Toggle between URL and File upload */}
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setUseImageUrl(false)}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                          !useImageUrl 
                            ? 'bg-[var(--color-primary-500)] text-white' 
                            : 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)]'
                        }`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setUseImageUrl(true)}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                          useImageUrl 
                            ? 'bg-[var(--color-primary-500)] text-white' 
                            : 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)]'
                        }`}
                      >
                        Use Image URL
                      </button>
                    </div>

                    {/* Image URL Input */}
                    {useImageUrl && (
                      <div>
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={handleImageUrlChange}
                          placeholder="Enter image URL (e.g., from ImageKit)"
                          className="w-full p-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        />
                      </div>
                    )}

                    {/* File Upload Input */}
                    {!useImageUrl && (
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="profileImage"
                        />
                        <label
                          htmlFor="profileImage"
                          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-lg hover:bg-[var(--color-accent-200)] transition-colors duration-200"
                        >
                          <Icon icon="mdi:image-plus" className="w-5 h-5" />
                          {formData.profileImage ? 'Change Image' : 'Choose Image'}
                        </label>
                      </div>
                    )}

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="relative w-32 h-32">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-contain rounded-lg border border-[var(--color-accent-200)]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setNewImage(null);
                            setImageUrl('');
                            setFormData(prev => ({ ...prev, profileImage: '' }));
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
                    <option value="Not Available">Not Available</option>
                    <option value="On Project">On Project</option>
                  </select>
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
                    Updating Talent...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:check" className="w-5 h-5" />
                    Update Talent
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

export default EditTalent;
