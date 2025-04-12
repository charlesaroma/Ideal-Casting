import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      number: '20000+',
      label: 'Talents Represented',
      icon: 'mdi:account-group'
    },
    {
      number: '70+',
      label: 'Commercial Projects',
      icon: 'mdi:movie-open'
    },
    {
      number: '10+',
      label: 'Film Projects',
      icon: 'mdi:video-vintage'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)] text-[var(--color-accent-800)]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-[var(--color-accent-900)] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary-500)] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 px-6 sm:px-12 lg:px-24 py-20">
          <div className="max-w-[1920px] mx-auto">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <span className="inline-block text-[var(--color-accent-50)] font-medium mb-6 text-sm sm:text-base tracking-wider uppercase bg-[var(--color-accent-800)]/30 px-6 py-3 rounded-2xl backdrop-blur-sm border border-[var(--color-accent-50)]/10">
                Est. 2018
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-accent-50)] mb-8 leading-tight">
                Uganda's Premier <br />
                <span className="text-[var(--color-primary-500)]">Casting Agency</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[var(--color-accent-50)] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-[var(--color-primary-500)]/10 p-4 rounded-xl group-hover:bg-[var(--color-primary-500)] transition-colors duration-300">
                <Icon
                      icon={stat.icon}
                      className="w-8 h-8 text-[var(--color-primary-500)] group-hover:text-[var(--color-accent-50)] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[var(--color-accent-900)]">{stat.number}</div>
                    <div className="text-[var(--color-accent-600)]">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary-500)]">Our Story</h2>
              <div className="prose prose-lg text-[var(--color-accent-700)] space-y-6">
                <p>
                  At Ideal Casting, we take pride in being the leading talent agency in the industry, 
                  with a proven track record of working with 90% of the major brands for commercials 
                  and 80% of the most acclaimed directors and producers in Uganda.
                </p>
                <p>
                  Our commitment to excellence and inclusivity has made us a trusted home for all talents, 
                  regardless of age, race, religion, or gender.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-secondary-500)]/20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-[var(--color-accent-100)] p-8 rounded-3xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary-500)]">Our Vision</h3>
                    <p className="text-[var(--color-accent-700)]">
                      To be the leading casting agency in Africa, shaping the future of entertainment 
                      through excellence, diversity, and integrity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary-500)]">Our Mission</h3>
                    <p className="text-[var(--color-accent-700)]">
                      To aim towards creating a comprehensive ecosystem that supports the entire 
                      career trajectory of performers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--color-accent-900)] text-[var(--color-accent-50)] py-24">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="max-w-[1920px] mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Database</h2>
            <p className="text-xl text-[var(--color-accent-200)] mb-12 max-w-2xl mx-auto">
              Be part of Uganda's largest talent network and access exclusive opportunities 
              in film, television, and commercial productions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-[var(--color-primary-500)] text-[var(--color-accent-50)] rounded-xl font-semibold hover:bg-[var(--color-primary-600)] transition-all duration-300 hover:scale-105 group"
              >
                Register Now
                <Icon 
                  icon="mdi:arrow-right" 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <Link
                to="/talent-directory"
                className="inline-flex items-center px-8 py-4 border-2 border-[var(--color-accent-50)] text-[var(--color-accent-50)] rounded-xl font-semibold hover:bg-[var(--color-accent-50)]/10 transition-all duration-300 group"
              >
                View Our Talent
                <Icon 
                  icon="mdi:arrow-right" 
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;