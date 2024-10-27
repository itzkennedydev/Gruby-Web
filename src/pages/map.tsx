import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '../components/Header';
import { mockChefs } from '../data/mockChefs';
import { useRouter } from 'next/router';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

interface MapProps {
  lat?: number;
  lng?: number;
}

const Map: React.FC<MapProps> = ({ lat = 41.5067, lng = -90.5151 }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12,
        attributionControl: false
      });

      // Add user location marker
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(map.current);

      // Add chef markers once the map is loaded
      map.current.on('load', () => {
        mockChefs.slice(0, 10).forEach((chef) => {
          // Generate random coordinates near the center
          const chefLat = lat + (Math.random() - 0.5) * 0.1;
          const chefLng = lng + (Math.random() - 0.5) * 0.1;

          const popup = new mapboxgl.Popup({ 
            offset: 25,
            className: 'custom-popup' 
          }).setHTML(
            `<h3>${chef.name}</h3><p>${chef.category} Chef</p><p>Rating: ${chef.rating}</p>`
          );

          // Create a custom marker element
          const el = document.createElement('div');
          el.className = 'chef-marker';
          el.style.backgroundImage = `url(${chef.chefImage})`;
          el.style.width = '50px';
          el.style.height = '50px';
          el.style.backgroundSize = 'cover';
          el.style.borderRadius = '50%';
          el.style.border = '3px solid #FF4D00';
          el.style.cursor = 'pointer';

          new mapboxgl.Marker(el)
            .setLngLat([chefLng, chefLat])
            .setPopup(popup)
            .addTo(map.current!);

          // Add click event to navigate to chef's page
          el.addEventListener('click', () => {
            router.push(`/chef/${chef.id}`).catch(err => console.error('Navigation error:', err));
          });
        });

        // Add custom CSS for popup arrow color
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
      });
    }
  }, [lat, lng, router]);

  return (
    <div className="flex flex-col h-screen m-0 p-0 overflow-hidden">
      <Header />
      <div className="flex-1 relative">
        <div 
          ref={mapContainer} 
          className="absolute inset-0"
        />
      </div>
    </div>
  );
};

export default Map;
