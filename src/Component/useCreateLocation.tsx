import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const useGeolocation = (watch = false) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    let watchId: number;

    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
      setLoading(false);
    };

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message);
      setLoading(false);
    };

    const options = {
      enableHighAccuracy: true, 
      timeout: 5000,            
      maximumAge: 0,           
    };

    if (watch) {
      watchId = navigator.geolocation.watchPosition(
        successHandler, 
        errorHandler, 
        options
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        successHandler, 
        errorHandler, 
        options
      );
    }

    // Cleanup function
    return () => {
      if (watch && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watch]);

  return { location, error, loading };
};

export default useGeolocation;