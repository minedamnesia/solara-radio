export default function MUFMapWidget() {
  return (
    <div className="bg-coffee p-4 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">MUF Map</h2>
      <iframe
        src="https://propquest.co.uk/map.php"
        title="MUF Map"
        className="w-full h-[500px] rounded-lg border-2 border-persian-orange"
      ></iframe>
    </div>
  );
}
