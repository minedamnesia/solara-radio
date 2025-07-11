import { useGeolocation } from '../context/GeolocationProvider';

export function GeolocationToggle() {
  const { enabled, setEnabled, error } = useGeolocation();

  return (
    <div className="sidebar-widget">
      <h3 className="sidebar-heading">Location Settings</h3>
      <label className="flex items-center space-x-2 text-coffee">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <span>Enable Geolocation</span>
      </label>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}

