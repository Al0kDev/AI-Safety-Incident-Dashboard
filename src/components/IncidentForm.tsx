import React, { useState } from 'react';
import { Incident, Severity } from '../types/incident';
import { PlusCircle, X, AlertTriangle } from 'lucide-react';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id'>) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newIncident: Omit<Incident, 'id'> = {
        title,
        description,
        severity,
        reported_at: new Date().toISOString(),
      };
      
      onSubmit(newIncident);
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSeverity('Medium');
    setErrors({});
    setIsFormVisible(false);
  };

  return (
    <div className="mb-6">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          <PlusCircle size={20} className="mr-2" />
          Report New Incident
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-slideDown">
          <div className="flex items-center justify-between bg-blue-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Report New AI Safety Incident</h3>
            <button
              onClick={() => setIsFormVisible(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle size={14} className="mr-1" />
                  {errors.title}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle size={14} className="mr-1" />
                  {errors.description}
                </p>
              )}
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                {(['Low', 'Medium', 'High'] as Severity[]).map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="severity"
                      value={level}
                      checked={severity === level}
                      onChange={() => setSeverity(level)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IncidentForm;