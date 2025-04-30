import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import TalentCard from '../components/talent/TalentCard';
import { talentCategories, skillsList } from '../data/sampleTalents';
import { collection, onSnapshot, query, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const TalentDirectory = ({ isAdmin }) => {
  const location = useLocation();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    experience: '',
    location: '',
    availability: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check if we're coming from the add talent page
  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      // Clear the success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Fetch talents from Firestore
  useEffect(() => {
    // Query to get talents, ordered by creation date with newest first
    const q = query(
      collection(db, 'talents'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const talentsList = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setTalents(talentsList);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching talents:', err);
        setError('Failed to load talents. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filter talents based on search and filters
  const filteredTalents = useMemo(() => {
    return talents.filter((talent) => {
      // Search term filter
      const searchMatch =
        searchTerm === '' ||
        talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.talentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filter
      const categoryMatch =
        selectedCategory === '' ||
        talent.primaryRole.toLowerCase() === selectedCategory.toLowerCase();

      // Skills filter
      const skillsMatch =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) =>
          talent.skills.includes(skill)
        );

      // Other filters
      const genderMatch = filters.gender === '' || talent.gender === filters.gender;
      const locationMatch = filters.location === '' || talent.location === filters.location;
      const availabilityMatch = filters.availability === '' || talent.availability === filters.availability;

      // Age range filter
      const ageMatch = () => {
        if (filters.ageRange === '') return true;
        const [min, max] = filters.ageRange.split('-').map(Number);
        return talent.age >= min && talent.age <= max;
      };

      // Experience filter
      const experienceMatch = () => {
        if (filters.experience === '') return true;
        const years = parseInt(talent.experience);
        switch (filters.experience) {
          case 'beginner':
            return years < 5;
          case 'intermediate':
            return years >= 5 && years < 10;
          case 'expert':
            return years >= 10;
          default:
            return true;
        }
      };

      return (
        searchMatch &&
        categoryMatch &&
        skillsMatch &&
        genderMatch &&
        locationMatch &&
        availabilityMatch &&
        ageMatch() &&
        experienceMatch()
      );
    });
  }, [searchTerm, selectedCategory, selectedSkills, filters, talents]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // Admin Actions
  const handleDeleteTalent = async (talentId) => {
    if (window.confirm('Are you sure you want to delete this talent?')) {
      try {
        await deleteDoc(doc(db, 'talents', talentId));
      } catch (err) {
        console.error('Error deleting talent:', err);
        alert('Failed to delete talent. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:loading" className="w-6 h-6 animate-spin text-[var(--color-primary-500)]" />
          <span className="text-[var(--color-accent-900)]">Loading talents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="text-red-600">
          <Icon icon="mdi:alert" className="w-8 h-8 mb-2 mx-auto" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />
              <span>{successMessage}</span>
            </div>
            <button 
              onClick={() => setSuccessMessage('')} 
              className="text-green-500 hover:text-green-700"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Header with Search and Admin Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-[var(--color-accent-900)]">Talent Directory</h1>
            {isAdmin && (
              <Link
                to="/admin/add-talent"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Add New Talent
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search talents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--color-accent-200] border border-[var(--color-accent-200)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] w-5 h-5"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-[var(--color-primary-500)] text-[var(--color-accent-200)] rounded-full hover:bg-[var(--color-primary-600)] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <Icon icon="mdi:filter-variant" className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-[var(--color-accent-200)] rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 bg-[var(--color-accent-50)] border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="">All Categories</option>
                  {talentCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full p-2 bg-[var(--color-accent-50)] border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full p-2 bg-[var(--color-accent-50)] border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="">All Locations</option>
                  <option value="Kampala">Kampala</option>
                  <option value="Entebbe">Entebbe</option>
                  <option value="Jinja">Jinja</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, availability: e.target.value }))
                  }
                  className="w-full p-2 bg-[var(--color-accent-50)] border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="">All Availability</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                </select>
              </div>

              {/* Age Range Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                  Age Range
                </label>
                <select
                  value={filters.ageRange}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, ageRange: e.target.value }))
                  }
                  className="w-full p-2 bg-[var(--color-accent-50)] border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="">All Ages</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="56-100">56+</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                  Experience
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, experience: e.target.value }))
                  }
                  className="w-full p-2 bg-[var(--color-accent-50)] border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                >
                  <option value="">All Experience</option>
                  <option value="beginner">Beginner (0-4 yrs)</option>
                  <option value="intermediate">Mid (5-9 yrs)</option>
                  <option value="expert">Expert (10+ yrs)</option>
                </select>
              </div>
            </div>

            {/* Skills Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--color-accent-700)] mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedSkills.includes(skill)
                        ? 'bg-[var(--color-primary-500)] text-[var(--color-accent-200)]'
                        : 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)] hover:bg-[var(--color-accent-200)]'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid with Admin Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <div key={talent.talentId} className="relative group">
              <TalentCard
                talent={{
                  ...talent,
                  skills: talent.skills.slice(0, 2),
                  moreSkills: talent.skills.length > 2 ? `+${talent.skills.length - 2} more` : ''
                }}
              />
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link
                    to={`/admin/edit-talent/${talent.talentId}`}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                    title="Edit Talent"
                  >
                    <Icon icon="mdi:pencil" className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteTalent(talent.talentId)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    title="Delete Talent"
                  >
                    <Icon icon="mdi:trash" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTalents.length === 0 && (
          <div className="text-center py-12 bg-[var(--color-accent-200)] rounded-xl shadow-lg">
            <Icon
              icon="mdi:account-search"
              className="w-16 h-16 text-[var(--color-accent-400)] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--color-accent-900)] mb-2">
              No talents found
            </h3>
            <p className="text-[var(--color-accent-600)]">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Admin Quick Actions */}
        {isAdmin && (
          <div className="fixed bottom-6 right-6 flex flex-col gap-4">
            <Link
              to="/admin/manage-talents"
              className="p-4 bg-[var(--color-primary-500)] text-white rounded-full hover:bg-[var(--color-primary-600)] transition-colors duration-200 shadow-lg"
              title="Manage Talents"
            >
              <Icon icon="mdi:cog" className="w-6 h-6" />
            </Link>
            <Link
              to="/admin/add-talent"
              className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 shadow-lg"
              title="Add New Talent"
            >
              <Icon icon="mdi:plus" className="w-6 h-6" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentDirectory; 