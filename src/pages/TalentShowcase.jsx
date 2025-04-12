import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { talents } from '../data/sampleTalents';

const TalentShowcase = () => {
  // Get only top-rated talents (rating >= 4.8) and limit to 4
  const topTalents = talents
    .filter(talent => talent.rating >= 4.8)
    .slice(0, 4);

  // Recent success stories with specific achievements
  const successStories = [
    {
      id: 1,
      quote: "Ideal Casting has been instrumental in showcasing Ugandan talent to the world. Their professional approach and understanding of our local arts scene is unmatched.",
      author: "ICT-ACT-007",
      role: "Award-Winning Actor",
      achievement: "Lead role in Netflix's upcoming African series",
      image: talents.find(t => t.talentId === "ICT-ACT-007").profileImage
    },
    {
      id: 2,
      quote: "Through Ideal Casting, I've landed roles in international productions while staying true to my Ugandan roots. They truly understand both local and global entertainment markets.",
      author: "ICT-MOD-002",
      role: "Professional Model",
      achievement: "Featured in Vogue Africa 2024",
      image: talents.find(t => t.talentId === "ICT-MOD-002").profileImage
    },
    {
      id: 3,
      quote: "The team at Ideal Casting helped me break into the industry and build my portfolio. They're more than agents; they're career builders.",
      author: "ICT-DNC-003",
      role: "Rising Star",
      achievement: "Choreographer for World Dance Championship",
      image: talents.find(t => t.talentId === "ICT-DNC-003").profileImage
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)]">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-900)]/90 to-[var(--color-primary-900)]/90 z-10" />
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/showcase-hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-20 text-center px-6 sm:px-12 lg:px-24">
            <div className="max-w-[1920px] mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-accent-200)] mb-6">
                Featured <span className="text-[var(--color-primary-500)]">Talents</span>
              </h1>
              <p className="text-xl text-[var(--color-accent-100)] max-w-3xl mx-auto mb-8">
                Meet our highest-rated performers who are making waves in the industry
              </p>
              <Link
                to="/talent-directory"
                className="inline-block px-8 py-4 bg-[var(--color-primary-500)] text-[var(--color-accent-200)] rounded-lg font-semibold hover:bg-[var(--color-primary-600)] transition-colors duration-200"
              >
                Explore Full Directory
              </Link>
            </div>
          </div>
        </section>

        {/* Top Rated Talents Section */}
        <section className="py-16">
          <div className="px-6 sm:px-12 lg:px-24">
            <div className="max-w-[1920px] mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold text-[var(--color-accent-900)]">
                  Top Rated Talents
                </h2>
                <Link 
                  to="/talent-directory"
                  className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-semibold flex items-center gap-2"
                >
                  View All
                  <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {topTalents.map((talent) => (
                  <div
                    key={talent.talentId}
                    className="group relative bg-[var(--color-accent-200)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col pb-4"
                  >
                    {/* Image and Gradient Overlay */}
                    <div className="relative h-48">
                      <img
                        src={talent.profileImage}
                        alt={`Talent ${talent.talentId}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-900)] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-6 flex flex-col justify-between">
                      <div>
                        {/* ID and Role */}
                        <h3 className="text-xl font-bold text-[var(--color-accent-900)] mb-1">
                          {talent.talentId}
                        </h3>
                        <p className="text-[var(--color-primary-600)] font-medium mb-4">
                          {talent.primaryRole}
                        </p>

                        {/* Skills */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-[var(--color-accent-600)] mb-2">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {talent.skills.slice(0, 1).map((skill, index) => (
                              <span
                                key={index}
                                className="text-sm bg-[var(--color-accent-100)] text-[var(--color-accent-700)] px-3 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {talent.skills.length > 1 && (
                              <span className="text-sm text-[var(--color-accent-600)]">
                                +{talent.skills.length - 1} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Location and Rating */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Icon icon="mdi:map-marker" className="text-[var(--color-primary-500)]" />
                            <span className="text-sm text-[var(--color-accent-700)]">
                              {talent.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="mdi:star" className="text-[var(--color-primary-500)]" />
                            <span className="text-sm text-[var(--color-accent-700)]">
                              {talent.rating} / 5.0
                            </span>
                          </div>
                        </div>

                        {/* Experience and Availability */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Icon icon="mdi:clock-outline" className="text-[var(--color-primary-500)]" />
                            <span className="text-sm text-[var(--color-accent-700)]">
                              {talent.experience} years
                            </span>
                          </div>
                          <span className={`text-sm px-2 py-0.5 rounded ${
                            talent.availability === 'Available' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {talent.availability}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons - Fixed at bottom */}
                      <div className="mt-4 pb-2"> {/* Added padding bottom here */}
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/talent/${talent.talentId}`}
                            className="flex-1 bg-[var(--color-primary-500)] text-[var(--color-accent-200)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-primary-600)] transition-colors duration-200 text-center"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 bg-[var(--color-accent-900)]">
          <div className="px-6 sm:px-12 lg:px-24">
            <div className="max-w-[1920px] mx-auto">
              <h2 className="text-3xl font-bold text-[var(--color-accent-200)] text-center mb-12">
                Recent Success Stories
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {successStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-[var(--color-accent-200)] rounded-lg p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={story.image}
                        alt={story.author}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-[var(--color-accent-900)]">
                          {story.author}
                        </h3>
                        <p className="text-sm text-[var(--color-accent-600)]">
                          {story.role}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 px-4 py-2 bg-[var(--color-primary-500)]/10 rounded-lg">
                      <p className="text-sm font-semibold text-[var(--color-primary-700)]">
                        {story.achievement}
                      </p>
                    </div>
                    <blockquote className="text-[var(--color-accent-700)] italic">
                      "{story.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[var(--color-primary-500)]">
          <div className="px-6 sm:px-12 lg:px-24">
            <div className="max-w-[1920px] mx-auto text-center">
              <h2 className="text-3xl font-bold text-[var(--color-accent-200)] mb-6">
                Ready to Discover More Talent?
              </h2>
              <p className="text-xl text-[var(--color-accent-100)] mb-8 max-w-2xl mx-auto">
                Browse our complete directory of exceptional performers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/talent-directory"
                  className="px-8 py-4 bg-[var(--color-accent-200)] text-[var(--color-primary-500)] rounded-lg font-semibold hover:bg-[var(--color-accent-50)] transition-colors duration-200"
                >
                  View Full Directory
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-transparent border-2 border-[var(--color-accent-200)] text-[var(--color-accent-200)] rounded-lg font-semibold hover:bg-[var(--color-accent-200)]/10 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TalentShowcase;