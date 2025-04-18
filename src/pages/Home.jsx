import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { talents } from "../data/sampleTalents";

const Home = () => {
  const features = [
    {
      icon: "mdi:account-group",
      title: "Diverse Talent Pool",
      description:
        "Access to a wide range of professional performers, from actors to stunt artists.",
    },
    {
      icon: "mdi:star-circle",
      title: "Expert Casting",
      description:
        "Professional guidance in finding the perfect talent for your production.",
    },
    {
      icon: "mdi:calendar-check",
      title: "Easy Booking",
      description:
        "Streamlined appointment scheduling for consultations and auditions.",
    },
    {
      icon: "mdi:trophy",
      title: "Industry Experience",
      description:
        "Years of expertise in connecting talent with leading productions.",
    },
  ];

  const featuredTalents = [
    {
      id: talents[0].talentId,
      role: talents[0].primaryRole,
      image: talents[0].profileImage,
      specialty: talents[0].skills[0],
      availability: talents[0].availability
    },
    {
      id: talents[2].talentId,
      role: talents[2].primaryRole,
      image: talents[2].profileImage,
      specialty: talents[2].skills[0],
      availability: talents[2].availability
    },
    {
      id: talents[5].talentId,
      role: talents[5].primaryRole,
      image: talents[5].profileImage,
      specialty: talents[5].skills[0],
      availability: talents[5].availability
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)]">
      <div className="flex-grow">
      {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-24">
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-16 sm:pt-20 lg:pt-0">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
                  <span className="text-[var(--color-accent-900)]">
                    Top talent,
                  </span>
                  <br />
                  <span className="text-[var(--color-primary-500)]">
                    on demand.
                  </span>
          </h1>
                <div className="h-1 w-32 bg-[var(--color-primary-500)] mb-4 sm:mb-6 mx-auto lg:mx-0"></div>
                <p className="text-lg sm:text-xl text-[var(--color-accent-600)] mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                  From startups to industry leaders — discover exceptional
                  talent through our tech-enabled platform to scale your
                  creative projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/talent-directory"
                    className="px-8 py-4 bg-[var(--color-primary-500)] text-[var(--color-accent-200)] rounded-full font-semibold hover:bg-[var(--color-primary-600)] transition-all duration-200 shadow-lg hover:shadow-xl text-center"
            >
                    Explore Talent
            </Link>
            <Link
              to="/contact"
                    className="px-8 py-4 bg-[var(--color-accent-200)] text-[var(--color-primary-500)] rounded-full font-semibold hover:bg-[var(--color-accent-100)] transition-all duration-200 shadow-lg hover:shadow-xl text-center"
            >
                    Join Network
            </Link>
          </div>
        </div>

              {/* Right Content - Floating Cards */}
              <div className="relative h-[450px] sm:h-[500px] lg:h-[600px] mt-12 lg:mt-0">
                {/* Mobile/Tablet View */}
                <div className="block lg:hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {featuredTalents.slice(0, 2).map((talent, index) => (
                      <div
                        key={talent.id}
                        className="bg-[var(--color-accent-200)] rounded-2xl shadow-xl overflow-hidden"
                      >
                        <div className="relative aspect-[4/3]">
                          <img
                            src={talent.image}
                            alt={`${talent.role} Talent`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-900)]/60 to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${talent.availability === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                            <span className="text-sm text-[var(--color-accent-500)]">
                              {talent.availability}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[var(--color-accent-900)]">
                            {talent.id}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[var(--color-accent-600)]">
                              {talent.role}
                            </p>
                            <span className="text-xs px-2 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full">
                              {talent.specialty}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop View - Floating Cards */}
                <div className="hidden lg:block">
                  {featuredTalents.map((talent, index) => (
                    <div
                      key={talent.id}
                      className={`absolute bg-[var(--color-accent-200)] rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                        index === 0
                          ? "w-64 sm:w-72 top-0 sm:top-20 right-0 rotate-6"
                          : index === 1
                          ? "w-64 sm:w-72 top-32 sm:top-1/2 -translate-y-1/2 right-12 sm:right-20 -rotate-3"
                          : "w-64 sm:w-72 top-64 sm:bottom-20 right-24 sm:right-40 rotate-12"
                      }`}
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={talent.image}
                          alt={`${talent.role} Talent`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-900)]/60 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${talent.availability === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                          <span className="text-sm text-[var(--color-accent-500)]">
                            {talent.availability}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-accent-900)]">
                          {talent.id}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[var(--color-accent-600)]">
                            {talent.role}
                          </p>
                          <span className="text-xs px-2 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full">
                            {talent.specialty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Decorative Elements */}
                  <div className="absolute top-40 left-20 w-20 h-20 border-4 border-[var(--color-primary-500)] rounded-full opacity-20"></div>
                  <div className="absolute bottom-40 left-0 w-12 h-12 bg-[var(--color-primary-500)] rounded-lg opacity-10 rotate-12"></div>
                  <div className="absolute top-20 left-40 w-16 h-16 bg-[var(--color-accent-300)] rounded-full opacity-10"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-[var(--color-primary-500)]/5 rounded-full"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-accent-200)]/10 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[var(--color-accent-100)]">
          <div className="container-custom px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-primary-500)] mb-4">
              Why Choose Ideal Casting
            </h2>
              <p className="text-base sm:text-lg text-[var(--color-accent-600)] max-w-2xl mx-auto">
                We provide comprehensive talent management services to help you
                find the perfect match for your creative vision.
            </p>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                  className="bg-[var(--color-accent-50)] p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-200"
              >
                <Icon
                  icon={feature.icon}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-primary-500)] mb-4"
                />
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-accent-900)] mb-2">
                  {feature.title}
                </h3>
                  <p className="text-sm sm:text-base text-[var(--color-accent-600)]">
                    {feature.description}
                  </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[var(--color-accent-900)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)]/90 to-[var(--color-primary-900)]/90"></div>
            <div className="absolute inset-0">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary-400)]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-secondary-500)]/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Content */}
              <div className="text-center mb-12">
                <h2 className="h2 text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-accent-200)] mb-6 leading-tight">
                  Ready to Find Your Next Super
                  <span className="relative inline-block px-2 mx-2">
                    <span className="relative z-10">Star</span>
                    <div className="absolute inset-0 transform -skew-x-12">
                      <div className="absolute inset-0 bg-[var(--color-primary-500)]"></div>
                    </div>
                  </span>
                
                </h2>
                <p className="text-base sm:text-lg text-[var(--color-accent-200)]/80 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Join Uganda's premier casting network. Whether you're seeking talent or looking to showcase your abilities,
                  we're here to make the perfect match.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-accent-200)] px-8 py-4 font-semibold transition-all duration-300 ease-out hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] transition-transform duration-300 ease-out translate-x-full group-hover:translate-x-0"></span>
                    <span className="relative flex items-center gap-2 text-[var(--color-primary-500)] transition-colors duration-300 group-hover:text-[var(--color-accent-200)]">
                      Get Started
                      <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                  
                  
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 mt-12 border-t border-[var(--color-accent-200)]/10">
                {[
                  { number: "500+", label: "Active Talents" },
                  { number: "50+", label: "Productions" },
                  { number: "98%", label: "Success Rate" },
                  { number: "24/7", label: "Support" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[var(--color-accent-200)] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-[var(--color-accent-200)]/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 
