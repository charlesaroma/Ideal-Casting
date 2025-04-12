import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { talents } from '../data/sampleTalents';
import { talentProfiles } from '../data/sampleTalentProfiles';

export default function TalentProfile() {
  const { talentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  
  // Get basic talent info from sampleTalents.js
  const talent = talents.find(t => t.talentId === talentId);
  // Get detailed profile info from sampleTalentProfiles.js
  const profile = talentProfiles[talentId];

  if (!talent || !profile) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:account-question" className="w-16 h-16 text-[var(--color-accent-400)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-accent-900)]">Talent Not Found</h2>
          <p className="text-[var(--color-accent-600)] mt-2">The talent profile you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 inline-flex items-center gap-2"
          >
            <Icon icon="mdi:arrow-left" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[var(--color-accent-600)] cursor-pointer hover:text-[var(--color-primary-500)] transition-colors duration-200"
        >
          <Icon icon="mdi:arrow-left" className="w-5 h-5" />
          <span>Back to Directory</span>
        </button>
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden bg-[var(--color-accent-900)] mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-500)]/20 to-[var(--color-accent-900)]/20" />
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--color-accent-200)] shadow-xl">
              <img
                src={talent.profileImage}
                alt={talent.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left text-white flex-1">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-3xl md:text-4xl font-bold">{talent.talentId}</h1>
                <span className="px-3 py-1 bg-[var(--color-primary-500)]/20 text-[var(--color-primary-300)] rounded-full text-sm">
                  {talent.availability}
                </span>
              </div>
              <p className="text-xl text-[var(--color-accent-200)] mt-2">{talent.primaryRole}</p>
              <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:map-marker" className="w-5 h-5 text-[var(--color-accent-300)]" />
                  <span className="text-[var(--color-accent-200)]">{talent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" className="w-5 h-5 text-[var(--color-accent-300)]" />
                  <span className="text-[var(--color-accent-200)]">{talent.experience} years exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:star" className="w-5 h-5 text-yellow-400" />
                  <span className="text-[var(--color-accent-200)]">{talent.rating}</span>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div>
              <button className="px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 flex items-center gap-2">
                <Icon icon="mdi:calendar-plus" className="w-5 h-5" />
                Book Through Agency
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-[var(--color-accent-200)]">
            <div className="flex">
              {['about', 'headshots', 'monologue', 'skills'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    activeTab === tab
                      ? 'text-[var(--color-primary-500)] border-b-2 border-[var(--color-primary-500)]'
                      : 'text-[var(--color-accent-600)] hover:text-[var(--color-accent-900)]'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="max-w-3xl">
                <p className="text-[var(--color-accent-700)] leading-relaxed">{profile.bio}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[var(--color-accent-900)] mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((lang) => (
                        <span key={lang} className="px-3 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-accent-900)] mb-2">Physical Stats</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-[var(--color-accent-600)]">
                      <div>Height: {profile.height}</div>
                      <div>Weight: {profile.weight}</div>
                      <div>Build: {profile.build}</div>
                      <div>Age: {talent.age} years</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'headshots' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {profile.portfolio.slice(0, 6).map((item, index) => (
                  <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg">
                    <div className="relative aspect-[4/5]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-medium text-lg">{item.title}</h4>
                          <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'monologue' && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-[var(--color-accent-50)] rounded-lg p-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary-500)]/10 flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:video" className="w-6 h-6 text-[var(--color-primary-500)]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-accent-900)] mb-1">Featured Monologue</h3>
                        <p className="text-[var(--color-accent-600)]">Watch featured performance monologue</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-[var(--color-accent-100)] rounded-lg mb-4">
                      <div className="w-full h-full flex items-center justify-center">
                        <a
                          href="https://www.youtube.com/watch?v=example"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-3 text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <Icon icon="mdi:play" className="w-8 h-8" />
                          </div>
                          <span className="font-medium">Watch Monologue</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-accent-500)]">
                      <Icon icon="mdi:information" className="w-4 h-4" />
                      <span>This monologue is available through the agency upon request</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[var(--color-accent-900)] mb-4">Professional Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-accent-900)] mb-4">Experience Highlights</h3>
                    <ul className="space-y-4">
                      {profile.experience_highlights.map((exp, index) => (
                        <li key={index} className="flex gap-4">
                          <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-primary-500)]" />
                          <div>
                            <h4 className="font-medium text-[var(--color-accent-900)]">{exp.title}</h4>
                            <p className="text-sm text-[var(--color-accent-600)]">{exp.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 