import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { collection, onSnapshot, query, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ManageTalents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch talents from Firestore
  useEffect(() => {
    const q = query(collection(db, 'talents'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const talentsList = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setTalents(talentsList);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching talents:', err);
        setError('Failed to load talents. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredTalents = talents.filter(talent =>
    talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talent.talentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTalent = async (talentId) => {
    if (window.confirm('Are you sure you want to delete this talent?')) {
      try {
        await deleteDoc(doc(db, 'talents', talentId));
      } catch (err) {
        console.error('Error deleting talent:', err);
        alert('Failed to delete talent. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:loading" className="w-6 h-6 animate-spin text-[var(--color-primary-500)]" />
          <span className="text-[var(--color-accent-900)]">Loading talents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-accent-50)] pt-20 flex items-center justify-center">
        <div className="text-red-600">
          <Icon icon="mdi:alert" className="w-8 h-8 mb-2 mx-auto" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-accent-900)]">
            Manage Talents
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/add-talent"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              Add New Talent
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[var(--color-accent-600)] hover:text-[var(--color-accent-900)]"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search talents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-accent-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-accent-400)] w-5 h-5"
            />
          </div>
        </div>

        {/* Talents Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[var(--color-accent-100)]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-accent-900)]">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[var(--color-accent-900)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-accent-200)]">
              {filteredTalents.map((talent) => (
                <tr key={talent.talentId} className="hover:bg-[var(--color-accent-50)]">
                  <td className="px-6 py-4 text-sm text-[var(--color-accent-900)]">
                    {talent.talentId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full mr-3 overflow-hidden bg-[var(--color-accent-100)]">
                        <img
                          src={talent.profileImage}
                          alt={talent.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-[var(--color-accent-900)]">
                        {talent.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-accent-900)]">
                    {talent.primaryRole}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-accent-900)]">
                    {talent.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      talent.availability === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {talent.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/edit-talent/${talent.talentId}`}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Icon icon="mdi:pencil" className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteTalent(talent.talentId)}
                        className="p-2 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Icon icon="mdi:trash" className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredTalents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg mt-6">
            <Icon
              icon="mdi:account-search"
              className="w-16 h-16 text-[var(--color-accent-400)] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--color-accent-900)] mb-2">
              No talents found
            </h3>
            <p className="text-[var(--color-accent-600)]">
              Try adjusting your search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTalents; 