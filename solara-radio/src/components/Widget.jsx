// solara-radio-app/src/components/Widget.jsx
export default function Widget({ title, description, customClass, nestedWidget }) {
  return (
    <div className={`bg-coffee p-4 rounded-2xl shadow-lg ${customClass || ''}`}>
      <h2 className="text-3xl font-heading tracking-wide mb-4 text-persian-orange">{title}</h2>
      <p className="font-sans mb-4 text-tan">{description}</p>
      {nestedWidget && (
        <div className="bg-sage p-4 rounded-xl shadow-md">
          <h3 className="text-2xl font-heading mb-2 text-gunmetal">{nestedWidget.title}</h3>
          <p className="font-sans text-gunmetal">{nestedWidget.description}</p>
        </div>
      )}
    </div>
  );
}
