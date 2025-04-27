import React from 'react';
import { FilterValue, SortOrder } from '../types/incident';
import { Filter, SortDesc, SortAsc } from 'lucide-react';

interface IncidentFiltersProps {
  currentFilter: FilterValue;
  currentSort: SortOrder;
  onFilterChange: (filter: FilterValue) => void;
  onSortChange: (sort: SortOrder) => void;
}

const IncidentFilters: React.FC<IncidentFiltersProps> = ({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}) => {
  const filterOptions: FilterValue[] = ['All', 'Low', 'Medium', 'High'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} className="mr-2" />
            Filter by Severity
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => onFilterChange(option)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  currentFilter === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            {currentSort === 'newest' ? (
              <SortDesc size={16} className="mr-2" />
            ) : (
              <SortAsc size={16} className="mr-2" />
            )}
            Sort by Date
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onSortChange('newest')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentSort === 'newest'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => onSortChange('oldest')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentSort === 'oldest'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentFilters;