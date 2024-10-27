import React from 'react';

interface MapProps {
  lat: number;
  lng: number;
}

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  // Use lat and lng in your map implementation
  // ...
};

export default Map;
