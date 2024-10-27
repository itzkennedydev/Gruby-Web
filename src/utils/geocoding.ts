import { GeocodingResult } from '@/types';

interface LatLng {
  lat: number;
  lng: number;
}

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';

interface ReverseGeocodingResult {
  address: {
    road?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
  display_name: string;
}

async function getCoordinates(address: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const response = await fetch(
      `${NOMINATIM_API_URL}/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'Gruby/1.0'
        }
      }
    );
    const data = await response.json() as GeocodingResult[];
    
    const firstResult = data[0];
    if (firstResult && isValidGeocodingResult(firstResult)) {
      const { lat, lon } = firstResult;
      return { lat, lon };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

async function getAddressFromCoordinates(lat: number, lon: number): Promise<string | null> {
  try {
    const response = await fetch(
      `${NOMINATIM_API_URL}/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          'User-Agent': 'Gruby/1.0'
        }
      }
    );
    const data = await response.json() as ReverseGeocodingResult;
    
    if (data.display_name) {
      return data.display_name;
    }

    return formatAddress(data.address);
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}

function formatAddress(address: ReverseGeocodingResult['address']): string {
  const components = [
    address.road,
    address.city || address.state,
    address.country,
    address.postcode
  ].filter(Boolean);
  
  return components.join(', ');
}

function isValidGeocodingResult(result: GeocodingResult): result is GeocodingResult & { lat: number; lon: number } {
  return typeof result?.lat === 'number' && typeof result?.lon === 'number';
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function calculateDistance(coord1: LatLng, coord2: LatLng): number {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export {
  getCoordinates,
  getAddressFromCoordinates,
  calculateDistance,
  type LatLng,
  type GeocodingResult,
  type ReverseGeocodingResult
};
