import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [newRequestsCount, setNewRequestsCount] = useState(0);

  useEffect(() => {
    console.log('Starting to fetch booking requests...');
    setLoading(true);
    
    try {
      // Create query for bookingRequests collection
      const bookingsRef = collection(db, 'bookingRequests');
      const q = query(
        bookingsRef,
        orderBy('createdAt', 'desc')
      );

      // Set up real-time listener
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          console.log(`Received ${snapshot.docs.length} booking requests`);
          const bookingsList = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Booking data:', { id: doc.id, ...data });
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate(),
              updatedAt: data.updatedAt?.toDate()
            };
          });

          setBookings(bookingsList);
          
          // Count new pending requests
          const pendingCount = bookingsList.filter(
            booking => booking.status === 'pending'
          ).length;
          setNewRequestsCount(pendingCount);
          
          setLoading(false);
          console.log('Successfully updated bookings state');
        },
        (err) => {
          console.error('Error fetching bookings:', err);
          setError('Failed to load booking requests. Please try again.');
          setLoading(false);
        }
      );

      return () => {
        console.log('Cleaning up booking requests listener');
        unsubscribe();
      };
    } catch (err) {
      console.error('Error setting up bookings listener:', err);
      setError('Failed to initialize booking requests. Please refresh the page.');
      setLoading(false);
    }
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookingRequests', bookingId);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      console.log(`Successfully updated booking ${bookingId} status to ${newStatus}`);
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status. Please try again.');
    }
  };

  const handleViewDetails = (booking) => {
    const formattedDate = booking.requestedBy.date 
      ? new Date(booking.requestedBy.date).toLocaleDateString()
      : 'Not specified';

    const message = `
Booking Details:
---------------
Talent: ${booking.talentName}
Client: ${booking.requestedBy.name}
Email: ${booking.requestedBy.email}
Phone: ${booking.requestedBy.phone}
Preferred Date: ${formattedDate}
${booking.requestedBy.message ? `\nMessage: ${booking.requestedBy.message}` : ''}
Status: ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
Created: ${booking.createdAt ? booking.createdAt.toLocaleString() : 'Unknown'}
    `;
    alert(message);
  };

  const filteredBookings = selectedStatus === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:loading" className="w-6 h-6 animate-spin text-[var(--color-primary-500)]" />
          <span className="text-[var(--color-accent-900)]">Loading booking requests...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert" className="w-8 h-8 mb-2 mx-auto text-red-500" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-600)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-[var(--color-accent-900)]">
              Booking Requests
            </h1>
            {newRequestsCount > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {newRequestsCount} New
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <Icon
              icon="mdi:calendar-blank"
              className="w-16 h-16 text-[var(--color-accent-400)] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--color-accent-900)] mb-2">
              No booking requests found
            </h3>
            <p className="text-[var(--color-accent-600)]">
              {selectedStatus === 'all'
                ? 'There are no booking requests yet'
                : `No ${selectedStatus} requests found`}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-accent-100)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Talent</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Client</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Preferred Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-[var(--color-accent-900)]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-accent-200)]">
                  {filteredBookings.map((booking) => (
                    <tr 
                      key={booking.id} 
                      className={`hover:bg-[var(--color-accent-50)] ${
                        booking.status === 'pending' ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-[var(--color-accent-900)]">
                        {booking.createdAt?.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-[var(--color-accent-900)]">
                            {booking.talentName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-[var(--color-accent-900)]">
                            {booking.requestedBy.name}
                          </div>
                          <div className="text-xs text-[var(--color-accent-600)]">
                            {booking.requestedBy.email}
                          </div>
                          <div className="text-xs text-[var(--color-accent-600)]">
                            {booking.requestedBy.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-accent-900)]">
                        {new Date(booking.requestedBy.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                className="p-2 text-green-600 hover:text-green-800"
                                title="Approve"
                              >
                                <Icon icon="mdi:check-circle" className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                                className="p-2 text-red-600 hover:text-red-800"
                                title="Reject"
                              >
                                <Icon icon="mdi:close-circle" className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="p-2 text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Icon icon="mdi:information" className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingRequests; 