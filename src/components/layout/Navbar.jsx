import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const location = useLocation();

  // Effect to handle user state
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const socialLinks = [
    { icon: 'mdi:instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'mdi:youtube', url: 'https://youtube.com', label: 'YouTube' },
    { icon: 'ri:tiktok-fill', url: 'https://tiktok.com', label: 'TikTok' },
    { icon: 'simple-icons:x', url: 'https://twitter.com', label: 'X (Twitter)' },
    { icon: 'mdi:linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const navStructure = [
    { path: '/', label: 'Home' },
    {
      label: 'About',
      items: [
        { path: '/about', label: 'About Us' },
        { path: '/team', label: 'Our Team' },
        { path: '/careers', label: 'Careers' },
      ],
    },
    { path: '/services', label: 'Services' },
    {
      label: 'Talent',
      items: [
        { path: '/talent-showcase', label: 'Talent Showcase' },
        { path: '/talent-directory', label: 'Talent Directory' },
      ],
    },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleDropdownEnter = useCallback((label) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  }, [dropdownTimeout]);

  const handleDropdownLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setDropdownTimeout(timeout);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="fixed w-full bg-[var(--color-accent-50)] shadow-md z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/ideal.png" 
                alt="Ideal Casting Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-grow">
            {navStructure.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                {item.items ? (
                  <>
                    <button
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeDropdown === item.label
                          ? 'text-[var(--color-primary-500)]'
                          : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)]'
                      }`}
                    >
                      {item.label}
                      <Icon
                        icon="mdi:chevron-down"
                        className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div 
                      className={`absolute top-full left-0 mt-1 py-2 w-48 bg-[var(--color-accent-50)] rounded-lg shadow-lg transition-all duration-300 ${
                        activeDropdown === item.label 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm ${
                            isActive(subItem.path)
                              ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                              : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                        : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Section - Desktop */}
            {user ? (
              <div className="flex items-center ml-4">
                <span className="text-[var(--color-accent-600)] mr-3">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-4">
                <Link
                  to="/login"
                  className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-[var(--color-primary-500)] text-[var(--color-accent-50)] px-4 py-2 rounded-md hover:bg-[var(--color-primary-600)] transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Social Media Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4 w-48 justify-end">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-400)] hover:text-[var(--color-primary-500)] transition-colors duration-200"
                aria-label={social.label}
              >
                <Icon icon={social.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] focus:outline-none"
            >
              <Icon
                icon={isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-accent-50)] border-t border-[var(--color-accent-200)]">
          <div className="container-custom py-2 space-y-1">
            {navStructure.map((item) => (
              <div key={item.label}>
                {item.items ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                        activeDropdown === item.label
                          ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                          : 'text-[var(--color-accent-600)]'
                      }`}
                    >
                      {item.label}
                      <Icon
                        icon="mdi:chevron-down"
                        className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4 space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-3 py-2 rounded-md text-sm ${
                              isActive(subItem.path)
                                ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                                : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.path)
                        ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                        : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Section - Mobile */}
            {user ? (
              <div className="px-3 py-2 border-t border-[var(--color-accent-200)]">
                <span className="block font-bold text-[var(--color-secondary-700)] mb-2">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 border-t border-[var(--color-accent-200)]">
                <Link
                  to="/login"
                  className="block text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-sm bg-[var(--color-primary-500)] text-[var(--color-accent-50)] px-4 py-2 rounded-md hover:bg-[var(--color-primary-600)] transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Social Media Links - Mobile */}
            <div className="px-3 py-4 border-t border-[var(--color-accent-200)]">
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent-400)] hover:text-[var(--color-primary-500)] transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon icon={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 