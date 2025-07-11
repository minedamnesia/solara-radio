// components/BuyMeCoffeeWidget.jsx
export default function BuyMeCoffeeWidget() {
  return (
    <div className="sidebar-widget text-center">
      <h2 className="sidebar-heading">Buy Me a Coffee</h2>
      <p className="text-sm mb-4">If you enjoy the site, feel free to support it ☕</p>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <img
          src="/venmo-qr.png" // <-- Replace with your hosted QR code image
          alt="Venmo QR Code"
          className="w-40 h-40 rounded-lg border border-persian-orange shadow"
        />
      </div>

      {/* Button */}
      <a
        href="https://venmo.com/Kelly-Simer" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-persian-orange text-gunmetal font-semibold px-6 py-3 rounded-full shadow hover:bg-opacity-90 transition"
      >
        Venmo Me
      </a>
    </div>
  );
}

