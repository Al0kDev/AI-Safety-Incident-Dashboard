import React from 'react';
import { Incident, FilterValue, SortOrder } from '../types/incident';
import IncidentItem from './IncidentItem';

interface IncidentListProps {
  incidents: Incident[];
  filterValue: FilterValue;
  sortOrder: SortOrder;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, filterValue, sortOrder }) => {
  // Apply filtering
  const filteredIncidents = incidents.filter((incident) => {
    if (filterValue === 'All') return true;
    return incident.severity === filterValue;
  });

  // Apply sorting
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  if (sortedIncidents.length === 0) {
    return (
      <div className="py-10 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">
          {filterValue === 'All' 
            ? 'No incidents have been reported yet.' 
            : `No ${filterValue.toLowerCase()} severity incidents found.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedIncidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;