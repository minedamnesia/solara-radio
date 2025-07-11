import { FaCoffee } from 'react-icons/fa';

export default function BuyMeCoffeeWidget() {
  return (
    <div className="sidebar-widget text-center">
      <h3 className="sidebar-heading">Buy Me a Coffee</h3>
      <p className="text-sm mb-4">
        If you enjoy the site, feel free to support it{' '}
        <FaCoffee size={18} className="inline text-gunmetal" />
      </p>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <img
          src="/venmo-qr.png"
          alt="Venmo QR Code"
          className="w-40 h-40 rounded-lg border border-persian-orange shadow"
        />
      </div>

      {/* Button */}
      <a
        href="https://venmo.com/Kelly-Simer"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block sidebar-button"
      >
        Venmo Me
      </a>
    </div>
  );
}

