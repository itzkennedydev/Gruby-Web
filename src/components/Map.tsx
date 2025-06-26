import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/navigation';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

interface MapProps {
  lat?: number;
  lng?: number;
}

const Map: FC<MapProps> = ({ lat = 41.5067, lng = -90.5151 }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (map.current ?? !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12,
      attributionControl: false
    });

    const addUserMarker = () => {
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(map.current!);
    };

    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        .mapboxgl-popup-tip {
          border-top-color: #FF4D00 !important;
          border-bottom-color: #FF4D00 !important;
        }
        .custom-popup .mapboxgl-popup-content {
          border-top: 3px solid #FF4D00;
        }
      `;
      document.head.appendChild(style);
    };

    map.current.on('load', () => {
      addUserMarker();
      addCustomStyles();
    });

    return () => {
      map.current?.remove();
    };
  }, [lat, lng, router]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default Map;
