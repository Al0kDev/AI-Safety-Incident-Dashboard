import React, { useState } from 'react';
import { FilterValue, Incident, SortOrder } from '../types/incident';
import { mockIncidents } from '../data/mockIncidents';
import IncidentList from './IncidentList';
import IncidentFilters from './IncidentFilters';
import IncidentForm from './IncidentForm';
import { Shield, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filterValue, setFilterValue] = useState<FilterValue>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const handleFilterChange = (filter: FilterValue) => {
    setFilterValue(filter);
  };

  const handleSortChange = (sort: SortOrder) => {
    setSortOrder(sort);
  };

  const handleNewIncident = (incidentData: Omit<Incident, 'id'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: Math.max(0, ...incidents.map(inc => inc.id)) + 1,
    };
    
    setIncidents([newIncident, ...incidents]);
  };

  // Calculate incident statistics
  const stats = {
    total: incidents.length,
    high: incidents.filter(inc => inc.severity === 'High').length,
    medium: incidents.filter(inc => inc.severity === 'Medium').length,
    low: incidents.filter(inc => inc.severity === 'Low').length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 bg-blue-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">AI Safety Incident Dashboard</h1>
            </div>
            <div className="hidden sm:flex items-center">
              <AlertTriangle size={16} className="text-red-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {stats.high} High Risk
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Incidents</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">High Severity</dt>
                  <dd className="mt-1 text-3xl font-semibold text-red-600">{stats.high}</dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Medium Severity</dt>
                  <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.medium}</dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Low Severity</dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.low}</dd>
                </dl>
              </div>
            </div>
          </div>
        </header>
        
        <IncidentForm onSubmit={handleNewIncident} />
        
        <IncidentFilters
          currentFilter={filterValue}
          currentSort={sortOrder}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        
        <IncidentList
          incidents={incidents}
          filterValue={filterValue}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
};

export default Dashboard;