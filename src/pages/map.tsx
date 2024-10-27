import { FC } from 'react';
import Header from '@/components/Header';
import Map from '@/components/Map';

const MapPage: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">
        <Map />
      </div>
    </div>
  );
};

export default MapPage;
