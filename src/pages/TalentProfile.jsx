import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function TalentProfile() {
  const { talentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        const talentDoc = await getDoc(doc(db, 'talents', talentId));
        
        if (!talentDoc.exists()) {
          setError('Talent not found');
          setLoading(false);
          return;
        }

        const talentData = {
          id: talentDoc.id,
          ...talentDoc.data()
        };
        setTalent(talentData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching talent:', err);
        setError('Failed to load talent details');
        setLoading(false);
      }
    };

    fetchTalentData();
  }, [talentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate the form data
      if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date) {
        throw new Error('Please fill in all required fields');
      }

      // Format the date to ensure consistency
      const formattedDate = new Date(bookingForm.date).toISOString().split('T')[0];

      // Create the booking request document
      const bookingData = {
        talentId: talent.id,
        talentName: talent.name,
        requestedBy: {
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
          date: formattedDate,
          message: bookingForm.message || ''
        },
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add to Firestore
      const bookingRef = await addDoc(collection(db, 'bookingRequests'), bookingData);

      if (!bookingRef.id) {
        throw new Error('Failed to create booking request');
      }

      console.log('Booking request created successfully:', bookingRef.id);
      setBookingSuccess(true);
      
      // Reset form
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
      });

      // Auto close modal after success
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Error submitting booking request:', err);
      setError(err.message || 'Failed to submit booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:loading" className="w-6 h-6 animate-spin text-[var(--color-primary-500)]" />
          <span className="text-[var(--color-accent-900)]">Loading talent profile...</span>
        </div>
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:account-question" className="w-16 h-16 text-[var(--color-accent-400)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-accent-900)]">Talent Not Found</h2>
          <p className="text-[var(--color-accent-600)] mt-2">{error || "The talent profile you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-[var(--color-primary-500)] text-[var(--color-accent-200)] rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 inline-flex items-center gap-2"
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
          <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Profile Image */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded overflow-hidden border-2 border-[var(--color-accent-200)] shadow-xl flex-shrink-0 bg-[var(--color-accent-100)]">
              <img
                src={talent.profileImage}
                alt={talent.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left text-[var(--color-accent-200)] flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{talent.name}</h1>
                {/* Book Now Button */}
                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                  <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-[var(--color-primary-500)] text-[var(--color-accent-200)] rounded-lg hover:bg-[var(--color-primary-600)] transition-colors duration-200 flex items-center gap-2 justify-center"
                  >
                    <Icon icon="mdi:calendar-plus" className="w-5 h-5" />
                    Book Through Agency
                  </button>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-[var(--color-accent-200)] mt-2">{talent.primaryRole}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:map-marker" className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent-300)]" />
                  <span className="text-sm sm:text-base text-[var(--color-accent-200)]">{talent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent-300)]" />
                  <span className="text-sm sm:text-base text-[var(--color-accent-200)]">{talent.experience} years exp.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-[var(--color-accent-200)] overflow-x-auto">
            <div className="flex min-w-max">
              {['about', 'portfolio', 'skills'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-4 text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
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
          <div className="p-4 sm:p-6">
            {activeTab === 'about' && (
              <div className="max-w-3xl">
                <p className="text-[var(--color-accent-700)] leading-relaxed">{talent.bio}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[var(--color-accent-900)] mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {talent.languages?.map((lang) => (
                        <span key={lang} className="px-3 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-accent-900)] mb-2">Physical Stats</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-[var(--color-accent-600)]">
                      <div>Height: {talent.height}</div>
                      <div>Weight: {talent.weight}</div>
                      <div>Build: {talent.build}</div>
                      <div>Age: {talent.age} years</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {talent.portfolio?.map((item, index) => (
                  <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg">
                    <div className="relative aspect-[4/5]">
                      <img 
                        src={item.image} 
                        alt={item.title || `Portfolio ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-medium text-lg">{item.title}</h4>
                          <p className="text-sm text-[var(--color-accent-200)] line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[var(--color-primary-500)] mb-4">Professional Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills?.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-[var(--color-accent-100)] text-[var(--color-accent-700)] rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-primary-500)] mb-4">Experience Highlights</h3>
                    <ul className="space-y-4">
                      {talent.experienceHighlights?.map((exp, index) => (
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

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => {
                setIsBookingModalOpen(false);
                setError(null);
                setBookingForm({
                  name: '',
                  email: '',
                  phone: '',
                  date: '',
                  message: ''
                });
              }}
              className="absolute top-4 right-4 text-[var(--color-accent-400)] hover:text-[var(--color-accent-600)]"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-[var(--color-accent-900)] mb-4">
              Book {talent?.name}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {bookingSuccess ? (
              <div className="text-center py-8">
                <Icon icon="mdi:check-circle" className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--color-accent-900)] mb-2">
                  Booking Request Sent!
                </h3>
                <p className="text-[var(--color-accent-600)]">
                  We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--color-accent-700)] mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                    placeholder="Any additional information..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-600)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:send" className="w-5 h-5" />
                      Send Booking Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 