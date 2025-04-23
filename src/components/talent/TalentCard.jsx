import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const TalentCard = ({ talent }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Image Container */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <img
          src={talent.profileImage}
          alt={`${talent.talentId} - ${talent.primaryRole}`}
          className="w-full h-full object-contain bg-[var(--color-accent-100)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-900)]/80 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        
        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
          <h3 className="text-lg sm:text-xl font-semibold mb-1">{talent.talentId}</h3>
          <p className="text-xs sm:text-sm text-[var(--color-accent-100)]">{talent.primaryRole}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 sm:p-4">
        {/* Skills */}
        <div className="mb-3 sm:mb-4">
          <h4 className="text-xs sm:text-sm font-semibold text-[var(--color-accent-600)] mb-1 sm:mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {talent.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 sm:py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] text-[10px] sm:text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {talent.moreSkills && (
              <span className="px-2 py-0.5 sm:py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] text-[10px] sm:text-xs rounded-full">
                {talent.moreSkills}
              </span>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1 sm:gap-2 text-[var(--color-accent-600)]">
            <Icon icon="mdi:map-marker" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{talent.location}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-[var(--color-accent-600)]">
            <Icon icon="mdi:star" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{talent.rating} / 5.0</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-[var(--color-accent-600)]">
            <Icon icon="mdi:clock-outline" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{talent.experience} years</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-[var(--color-accent-600)]">
            <Icon icon="mdi:calendar-check" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{talent.availability}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/talent/${talent.talentId}`}
            className="flex-1 px-2 sm:px-4 py-1.5 sm:py-2 bg-[var(--color-primary-500)] text-white text-center text-xs sm:text-sm rounded-lg font-medium hover:bg-[var(--color-primary-600)] transition-colors duration-200"
          >
            View Profile
          </Link>
          <button
            onClick={() => window.open(`/contact?talent=${talent.talentId}`, '_blank')}
            className="px-2 sm:px-4 py-1.5 sm:py-2 border border-[var(--color-primary-500)] text-[var(--color-primary-500)] text-xs sm:text-sm rounded-lg font-medium hover:bg-[var(--color-primary-50)] transition-colors duration-200"
            aria-label={`Book talent ${talent.talentId}`}
          >
            <Icon icon="mdi:calendar-plus" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentCard; 