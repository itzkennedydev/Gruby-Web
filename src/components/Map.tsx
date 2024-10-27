import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/router';
import { mockChefs } from '@/data/mockChefs';

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

    const addChefMarkers = () => {
      mockChefs.slice(0, 10).forEach((chef) => {
        const chefLat = lat + (Math.random() - 0.5) * 0.1;
        const chefLng = lng + (Math.random() - 0.5) * 0.1;

        const popup = new mapboxgl.Popup({ 
          offset: 25,
          className: 'custom-popup' 
        }).setHTML(
          `<h3>${chef.name}</h3><p>${chef.category} Chef</p><p>Rating: ${chef.rating}</p>`
        );

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

        el.addEventListener('click', () => {
          router.push(`/chef/${chef.id}`).catch(console.error);
        });
      });
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
      addChefMarkers();
      addCustomStyles();
    });

    return () => {
      map.current?.remove();
    };
  }, [lat, lng, router]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default Map;
