import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import TalentCard from '../components/talent/TalentCard';
import { talents, talentCategories, skillsList } from '../data/sampleTalents';

const TalentDirectory = () => {
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
  }, [searchTerm, selectedCategory, selectedSkills, filters]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-[var(--color-accent-900)]">Talent Directory</h1>
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

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTalents.map((talent) => (
            <TalentCard key={talent.talentId} talent={{
              ...talent,
              skills: talent.skills.slice(0, 2),
              moreSkills: talent.skills.length > 2 ? `+${talent.skills.length - 2} more` : ''
            }} />
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
      </div>
    </div>
  );
};

export default TalentDirectory; 