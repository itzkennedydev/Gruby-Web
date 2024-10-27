import React from 'react';

interface LiveLocation {
  lat: number;
  lon: number;
}

interface MapProps {
  liveLocation: LiveLocation | null;
}

const Map: React.FC<MapProps> = ({ liveLocation }) => {
  const locationContent = liveLocation ? (
    <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow">
      <p className="text-sm">
        Current Location: {liveLocation.lat.toFixed(6)}, {liveLocation.lon.toFixed(6)}
      </p>
    </div>
  ) : (
    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
      Location not available
    </p>
  );

  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-md" aria-label="Map showing current location">
      {/* Map rendering logic would go here */}
      {locationContent}
    </div>
  );
};

export default Map;
