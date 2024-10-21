import React from 'react';

interface LiveLocation {
  lat: number;
  lon: number;
}

interface MapProps {
  liveLocation: LiveLocation | null;
}

function Map({ liveLocation }: MapProps): React.ReactElement {
  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-md">
      {/* Map rendering logic would go here */}
      {liveLocation ? (
        <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow">
          <p className="text-sm">
            Current Location: {liveLocation.lat.toFixed(6)}, {liveLocation.lon.toFixed(6)}
          </p>
        </div>
      ) : (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">
          Location not available
        </p>
      )}
    </div>
  );
}

export default Map;
