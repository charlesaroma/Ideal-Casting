import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AdminDashboard = () => {
  const adminActions = [
    {
      title: 'Add New Talent',
      description: 'Create a new talent profile',
      icon: 'mdi:account-plus',
      link: '/admin/add-talent',
      color: 'bg-green-500',
    },
    {
      title: 'Manage Talents',
      description: 'Edit or remove existing talents',
      icon: 'mdi:account-group',
      link: '/admin/manage-talents',
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-accent-50)] pt-20">
      <div className="container-custom py-8">
        <h1 className="text-4xl font-bold text-[var(--color-accent-900)] mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon icon={action.icon} className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-accent-900)] mb-2">
                {action.title}
              </h2>
              <p className="text-[var(--color-accent-600)]">
                {action.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-accent-900)]">
                Total Talents
              </h3>
              <Icon icon="mdi:account-multiple" className="w-6 h-6 text-[var(--color-primary-500)]" />
            </div>
            <p className="text-3xl font-bold text-[var(--color-primary-500)]">
              {/* Replace with actual count */}
              24
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-accent-900)]">
                Available Talents
              </h3>
              <Icon icon="mdi:account-check" className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">
              {/* Replace with actual count */}
              18
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-accent-900)]">
                Busy Talents
              </h3>
              <Icon icon="mdi:account-clock" className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-orange-500">
              {/* Replace with actual count */}
              6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 