import React from 'react';
import { Icon } from '@iconify/react';

const Contact = () => {
  const contactInfo = [
    {
      icon: 'mdi:email',
      title: 'E-mail',
      details: ['info@idealcasting.net'],
      link: 'mailto:info@idealcasting.net'
    },
    {
      icon: 'mdi:phone',
      title: 'Phone number',
      details: ['+256 785 436066'],
      link: 'tel:+256785436066'
    },
    {
      icon: 'mdi:clock',
      title: 'Work Hours',
      details: [
        'Monday to Friday: 09:00 - 17:00',
        'Fridays: 09:00 - 14:00 for profiling'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)]">
      <div className="flex-grow">
        <div className="px-6 sm:px-12 lg:px-24 pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-24">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
              {/* Left Column - Contact Information */}
              <div className="space-y-8 md:space-y-10 lg:space-y-12">
                <div>
                  <span className="text-[var(--color-primary-500)] text-sm sm:text-base font-medium mb-4 sm:mb-6 block tracking-wide">
                    WE'RE HERE TO HELP YOU
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent-900)] mb-4 sm:mb-6 leading-tight">
                    Discuss Your <br className="hidden sm:block" />
                    Talent Needs
                  </h1>
                  <p className="text-base sm:text-lg text-[var(--color-accent-600)] mb-8 sm:mb-10 lg:mb-12 max-w-xl">
                    Are you looking for top-quality talent solutions tailored to your needs? 
                    Reach out to us.
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4 sm:space-x-5">
                      <div className="bg-[var(--color-primary-500)]/10 p-3 sm:p-4 rounded-full">
                        <Icon 
                          icon={info.icon} 
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary-500)]" 
                        />
                      </div>
                      <div>
                        <div className="text-sm text-[var(--color-accent-600)] mb-1">
                          {info.title}
                        </div>
                        {info.details.map((detail, idx) => (
                          <p 
                            key={idx} 
                            className="text-sm sm:text-base text-[var(--color-accent-900)] font-medium"
                          >
                            {info.link ? (
                              <a 
                                href={info.link}
                                className="hover:text-[var(--color-primary-500)] transition-colors duration-200"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                <form className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                      Industry
                    </label>
                    <select
                      className="w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    >
                      <option value="">Select...</option>
                      <option value="film">Film & TV</option>
                      <option value="commercial">Commercial</option>
                      <option value="theater">Theater</option>
                      <option value="modeling">Modeling</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-accent-600)] mb-2">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      className="w-full p-3 sm:p-4 bg-[var(--color-accent-50)] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                      placeholder="Type your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-primary-500)] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[var(--color-primary-600)] transition-all duration-200 hover:scale-[1.02]"
                  >
                    Get a Solution
                    <Icon 
                      icon="mdi:arrow-right" 
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;