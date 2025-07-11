import { createContext, useContext, useEffect, useState } from 'react';

const GeolocationContext = createContext();

export function GeolocationProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setError(null);
      },
      (err) => setError(err.message)
    );
  }, [enabled]);

  return (
    <GeolocationContext.Provider value={{ location, enabled, error, setEnabled }}>
      {children}
    </GeolocationContext.Provider>
  );
}

export function useGeolocation() {
  return useContext(GeolocationContext);
}

export { GeolocationContext };
