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

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        const savedUser = localStorage.getItem('user');
        setUser(savedUser ? JSON.parse(savedUser) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

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

  // Add admin navigation items if user is admin
  const adminNavItems = user?.role === 'admin' ? [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/manage-talents', label: 'Manage Talents' },
    { path: '/admin/add-talent', label: 'Add Talent' },
  ] : [];

  const isActive = (path) => location.pathname === path;

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .filter(n => n) // Filter out empty strings
      .map(n => n[0] || '')
      .join('')
      .toUpperCase();
  };

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
    window.location.reload();
  };

  return (
    <nav className="fixed w-full bg-[var(--color-accent-50)] shadow-md z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/ideal.png" alt="Ideal Casting Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center flex-grow space-x-6">
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
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
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
                    className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
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

            {/* Admin Navigation */}
            {user?.role === 'admin' && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('Admin')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                    activeDropdown === 'Admin'
                      ? 'text-[var(--color-primary-500)]'
                      : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)]'
                  }`}
                >
                  Admin
                  <Icon
                    icon="mdi:chevron-down"
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === 'Admin' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-1 py-2 w-48 bg-[var(--color-accent-50)] rounded-lg shadow-lg transition-all duration-300 ${
                    activeDropdown === 'Admin'
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 text-sm ${
                        isActive(item.path)
                          ? 'text-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                          : 'text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center justify-end w-48">
            {user ? (
              <div className="flex items-center space-x-3 group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] flex items-center justify-center text-xs font-semibold uppercase transform transition-transform group-hover:scale-105">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-accent-600)]">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors duration-200 hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-[var(--color-primary-500)] text-[var(--color-accent-50)] px-4 py-2 rounded-md hover:bg-[var(--color-primary-600)] transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-accent-600)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] focus:outline-none"
            >
              <Icon icon={isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
