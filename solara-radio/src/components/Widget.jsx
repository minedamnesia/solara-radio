export default function Widget({ title, description, customClass, nestedWidget }) {
  return (
    <div className={`bg-green-800 p-4 rounded-2xl shadow-lg ${customClass || ''}`}>
      <h2 className="text-3xl font-heading tracking-wide mb-4">{title}</h2>
      <p className="font-sans mb-4">{description}</p>
      {nestedWidget && (
        <div className="bg-green-700 p-4 rounded-xl shadow-md">
          <h3 className="text-2xl font-heading mb-2">{nestedWidget.title}</h3>
          <p className="font-sans">{nestedWidget.description}</p>
        </div>
      )}
    </div>
  );
}
