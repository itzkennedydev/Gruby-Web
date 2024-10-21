import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '../components/Header';
import { mockChefs } from '../data/mockChefs';
import { useRouter } from 'next/router';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([-90.5151, 41.5067]); // Moline, IL coordinates
  const router = useRouter();

  useEffect(() => {
    // Use Geolocation API to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]); // Update userLocation with actual coordinates
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation, // Ensure this is set to the correct user location
        zoom: 12,
        attributionControl: false
      });

      // Add user location marker
      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat(userLocation) // Ensure this uses the correct coordinates
        .addTo(map.current);

      // Add chef markers once the map is loaded
      map.current.on('load', () => {
        mockChefs.slice(0, 10).forEach((chef) => {
          // Generate random coordinates near Moline
          const lat = userLocation[1] + (Math.random() - 0.5) * 0.1;
          const lng = userLocation[0] + (Math.random() - 0.5) * 0.1;

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
            .setLngLat([lng, lat]) // Ensure these coordinates are correct
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
  }, [userLocation, router]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden' 
    }}>
      <Header />
      <div style={{ flex: 1, position: 'relative' }}>
        <div 
          ref={mapContainer} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            bottom: 0, 
            left: 0, 
            right: 0 
          }} 
        />
      </div>
    </div>
  );
};

export default Map;
