// solara-radio-app/src/components/Widget.jsx
export default function Widget({ title, description }) {
  return (
    <div className="bg-green-800 p-4 rounded-2xl shadow-lg">
      <h2 className="text-2xl mb-4 font-heading font-semibold">{title}</h2>
      <p className="font-sans">{description}</p>
    </div>
  );
}

