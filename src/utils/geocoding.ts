// Types for geocoding results
interface GeocodingResult {
    lat?: number;
    lon?: number;
    display_name?: string;
  }
  
  interface LatLng {
    lat: number;
    lng: number;
  }
  
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
  
  const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';
  
  /**
   * Converts an address to coordinates using Nominatim API
   * @param address The address to geocode
   * @returns Promise containing lat/lon coordinates or null if not found
   */
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
  
  /**
   * Converts coordinates to an address using Nominatim API
   * @param lat Latitude
   * @param lon Longitude
   * @returns Promise containing formatted address string or null if not found
   */
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
  
  /**
   * Formats an address object into a readable string
   * @param address Address components object
   * @returns Formatted address string
   */
  function formatAddress(address: ReverseGeocodingResult['address']): string {
    const components = [
      address.road,
      address.city ?? address.state,
      address.country,
      address.postcode
    ].filter(Boolean);
    
    return components.join(', ');
  }
  
  /**
   * Type guard to ensure a GeocodingResult contains valid coordinates
   */
  function isValidGeocodingResult(result: GeocodingResult): result is GeocodingResult & { lat: number; lon: number } {
    return typeof result?.lat === 'number' && typeof result?.lon === 'number';
  }
  
  /**
   * Converts degrees to radians
   */
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  
  /**
   * Calculates the distance between two coordinates using the Haversine formula
   * @param coord1 First coordinate
   * @param coord2 Second coordinate
   * @returns Distance in kilometers
   */
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