import React, { useState } from 'react';
import { Incident } from '../types/incident';
import SeverityBadge from './SeverityBadge';
import { formatDate, getRelativeTime } from '../utils/dateUtils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{incident.title}</h3>
            <div className="mt-1 flex items-center space-x-4">
              <SeverityBadge severity={incident.severity} />
              <span className="text-sm text-gray-500" title={formatDate(incident.reported_at)}>
                {getRelativeTime(incident.reported_at)}
              </span>
            </div>
          </div>
          <button
            onClick={toggleExpand}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>View Details</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-3 text-sm text-gray-700 animate-fadeIn">
            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
              <p>{incident.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentItem;