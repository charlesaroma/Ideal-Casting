import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'mdi:instagram', url: '#', label: 'Instagram', color: 'hover:bg-gradient-to-tr from-purple-600 to-pink-500' },
    { icon: 'ri:tiktok-fill', url: '#', label: 'TikTok', color: 'hover:bg-[var(--color-accent-800)]' },
    { icon: 'mdi:youtube', url: '#', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: 'simple-icons:x', url: '#', label: 'X (Twitter)', color: 'hover:bg-[var(--color-accent-800)]' },
    { icon: 'mdi:linkedin', url: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Our Team', path: '/team' },
        { label: 'Careers', path: '/careers' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Talent Directory', path: '/talent-directory' },
        { label: 'Talent Showcase', path: '/talent-showcase' },
        { label: 'Casting Services', path: '/services' },
        { label: 'Book Appointment', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[var(--color-accent-900)] text-[var(--color-accent-50)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary-500)] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-[var(--color-accent-800)]">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-[var(--color-accent-200)]">Join Our</span>
                <span className="text-[var(--color-primary-500)] ml-2">Creative Network</span>
              </h2>
              <p className="text-[var(--color-accent-400)] text-lg">
                Stay updated with casting calls, industry news, and exclusive opportunities.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 bg-[var(--color-accent-800)] rounded-full text-[var(--color-accent-200)] placeholder:text-[var(--color-accent-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] w-full"
                />
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary-500)] px-6 py-4 font-semibold text-[var(--color-accent-200)] transition-all duration-300 ease-out hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-400)] transition-transform duration-300 ease-out translate-x-full group-hover:translate-x-0"></span>
                  <span className="relative flex px-6 items-center gap-2">
                    Subscribe
                    <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-6">
                <img src="/ideal.png" alt="Ideal Casting" className="h-12 w-auto" />
              </Link>
              <p className="text-[var(--color-accent-400)] mb-8 text-lg">
                Connecting Exceptional Talent with Extraordinary Opportunities in Uganda's Entertainment Industry
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-[var(--color-accent-800)] text-[var(--color-accent-200)] transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon icon={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <div key={section.title} className="lg:col-span-2 lg:col-start-${6 + index * 2}">
                <h4 className="text-lg font-semibold text-[var(--color-accent-200)] mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="group text-[var(--color-accent-400)] hover:text-[var(--color-accent-200)] transition-colors duration-200 inline-flex items-center"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-0 h-px bg-[var(--color-primary-500)] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-[var(--color-accent-800)]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[var(--color-accent-400)] text-sm">
                © {currentYear} Ideal Casting. All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:heart" className="w-4 h-4 text-[var(--color-primary-500)]" />
                <p className="text-[var(--color-accent-400)] text-sm">
                  Crafted with passion by Charles Aroma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 