"use client";

import { useEffect, useState } from 'react';

const SchoolCard = ({ school }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <div className="w-full h-48 bg-gray-200">
      <img 
        src={school.image || 'https://placehold.co/600x400/EEE/31343C?text=No+Image'} 
        alt={`Image of ${school.name}`} 
        className="w-full h-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/EEE/31343C?text=Image+Error'; }}
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 truncate" title={school.name}>{school.name}</h3>
      <p className="text-gray-600 mt-1 truncate" title={school.address}>{school.address}</p>
      <p className="text-gray-500 text-sm mt-1">{school.city}</p>
    </div>
  </div>
);

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/schools');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSchools(data.schools);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">School Directory</h1>
            <p className="text-lg text-gray-600 mt-2">Browse through the list of registered schools.</p>
        </header>

        {loading && <p className="text-center text-gray-500">Loading schools...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {!loading && !error && (
          schools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {schools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">No Schools Found</h2>
                <p className="text-gray-500 mt-2">There are currently no schools in the directory. Try adding one!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
