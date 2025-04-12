import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: 'mdi:movie-open',
      title: 'Expert Casting',
      description: 'Perfect talent selection.',
      features: ['Auditions', 'Virtual', 'AI', 'Remote'],
      cta: 'Learn More',
      link: '/contact',
    },
    {
      icon: 'mdi:account-group',
      title: 'Representation',
      description: 'Connect with opportunities.',
      features: ['Film', 'Commercial', 'Brands', 'Projects'],
      cta: 'Learn More',
      link: '/talent-directory',
    },
    {
      icon: 'mdi:school',
      title: 'Talent Dev',
      description: 'Nurture talent.',
      features: ['Sessions', 'Training', 'Masterclasses', 'Support'],
      cta: 'Follow Social',
      link: '/contact',
    },
    {
      icon: 'mdi:video-vintage',
      title: 'Production',
      description: 'Seamless project execution.',
      features: ['Scouting', 'Fittings', 'Collaboration', 'Management'],
      cta: 'View Works',
      link: '/contact',
    },
  ];

  const specials = [
    {
      icon: 'mdi:video-wireless',
      title: 'Virtual Auditions',
      description: 'Online auditions with AI-powered talent suggestions.',
      buttonText: 'Schedule',
      link: '/contact',
    },
    {
      icon: 'mdi:account-card',
      title: 'Profiling Friday',
      description: 'Weekly professional profiling for upcoming rising talents.',
      buttonText: 'Book Now',
      link: '/contact',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)] text-[var(--color-accent-800)]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[var(--color-accent-900)]/30 via-transparent to-[var(--color-accent-900)]/50 z-10"></div>
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <iframe
                className="absolute w-[130%] h-[130%] -left-[15%] -top-[15%] pointer-events-none"
                style={{ filter: 'contrast(1.1) saturate(1.2)', willChange: 'transform' }}
                src="https://www.youtube.com/embed/zF1MkWiay7Q?autoplay=1&mute=1&controls=0&loop=1&playlist=zF1MkWiay7Q&playsinline=1&rel=0&showinfo=0&modestbranding=1&vq=hd1080&hd=1&iv_load_policy=3"
                title="Background Video"
                frameBorder="0"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="relative z-20 px-6 sm:px-12 lg:px-24 py-20 md:py-32">
          <div className="max-w-[1920px] mx-auto">
            <div className="max-w-2xl relative">
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="relative">
                  <span className="inline-block text-[var(--color-accent-50)] font-medium mb-6 text-sm sm:text-base tracking-wider uppercase bg-[var(--color-secondary-500)]/40 px-6 py-3 rounded-2xl backdrop-blur-sm border border-[var(--color-accent-50)]/10">
                    Discover Stars
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-500)]/20 to-transparent blur-xl opacity-50 -z-10"></div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent-50)] mb-8 leading-tight [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">
                  Expert Casting & <br />
                  <span className="relative inline-block">
                    Production
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-500)]/20 to-transparent blur-2xl opacity-50 -z-10"></div>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-[var(--color-accent-50)] mb-12 max-w-xl [text-shadow:_1px_1px_2px_rgb(0_0_0_/_30%)] leading-relaxed">
                  Perfect talent, seamless execution.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center px-8 py-4 bg-[var(--color-accent-50)] text-[var(--color-secondary-500)] rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg overflow-hidden"
                  >
                    <span className="relative z-10">Get Started</span>
                    <Icon icon="mdi:arrow-right" className="relative z-10 ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-100)] to-[var(--color-accent-50)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    to="/talent-directory"
                    className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 text-[var(--color-accent-50)]">Browse Talent</span>
                    <Icon icon="mdi:arrow-right" className="relative z-10 ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 text-[var(--color-accent-50)]" />
                    <div className="absolute inset-0 border-2 border-[var(--color-accent-50)] rounded-2xl"></div>
                    <div className="absolute inset-[1px] rounded-2xl bg-[var(--color-accent-900)]/40 backdrop-blur-sm transition-colors duration-300 group-hover:bg-[var(--color-accent-900)]/60"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[var(--color-accent-900)]/30 via-transparent to-[var(--color-accent-900)]/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary-100)] via-transparent to-transparent z-10 opacity-90"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-primary-500)]/20 rounded-full blur-3xl opacity-30 z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-primary-500)]/10 rounded-full blur-3xl opacity-20 z-10"></div>
      </section>

      {/* SERVICES BLOCK */}
      <section className="py-24 bg-[var(--color-accent-50)] relative">
        <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-lg text-[var(--color-accent-600)] max-w-2xl mx-auto">
              Industry-leading solutions in casting, production, and talent management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-[var(--color-accent-200)] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-[var(--color-accent-100)] p-4 rounded-xl">
                    <Icon icon={service.icon} className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-[var(--color-accent-600)] mb-4">{service.description}</p>
                <ul className="space-y-2 text-sm text-[var(--color-accent-700)] mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Icon icon="mdi:check" className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-[var(--color-primary-600)] font-semibold hover:underline transition"
                >
                  {service.cta}
                  <Icon icon="mdi:arrow-right" className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL FEATURES */}
      <section className="bg-[var(--color-accent-900)] text-[var(--color-accent-50)] py-24 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full filter blur-[128px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary-500)] rounded-full filter blur-[128px]"></div>
        </div>

        <div className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-[var(--color-accent-50)] font-medium mb-6 text-sm tracking-wider uppercase bg-[var(--color-accent-800)]/40 px-6 py-3 rounded-2xl backdrop-blur-sm border border-[var(--color-accent-50)]/10">
              Premium Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--color-accent-50)] via-[var(--color-primary-300)] to-[var(--color-accent-50)] inline-block text-transparent bg-clip-text">
              Special Features
            </h2>
            <p className="text-lg text-[var(--color-accent-200)] max-w-2xl mx-auto">
              Tailored premium services to enhance your journey with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {specials.map((service) => (
              <div
                key={service.title}
                className="group relative"
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary-500)] via-[var(--color-secondary-500)] to-[var(--color-primary-500)] rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                
                {/* Main Card Content */}
                <div className="relative bg-[var(--color-accent-900)]/80 backdrop-blur-xl rounded-2xl p-8 h-full transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon 
                        icon={service.icon} 
                        className="w-6 h-6 text-[var(--color-accent-50)]"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-[var(--color-accent-200)]">{service.description}</p>
                    </div>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-[var(--color-accent-50)] rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary-500)]/20 group/button"
                  >
                    <span>{service.buttonText}</span>
                    <Icon 
                      icon="mdi:arrow-right" 
                      className="ml-2 w-5 h-5 transform group-hover/button:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/0 via-[var(--color-accent-50)]/0 to-[var(--color-secondary-500)]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--color-accent-50)] text-center">
        <div className="px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-[var(--color-accent-600)] text-lg mb-8">
            Let us help you cast, produce, or showcase the talent the world deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-primary-600)] text-[var(--color-accent-50)] rounded-lg font-semibold hover:bg-[var(--color-primary-500)] transition"
            >
              Schedule Consult
              <Icon icon="mdi:arrow-right" className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/talent-directory"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] rounded-lg font-semibold hover:bg-[var(--color-primary-50)] transition"
            >
              Browse Talent
              <Icon icon="mdi:arrow-right" className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;