// solara-radio-app/src/pages/Page.jsx
export default function Page({ title }) {
  return (
    <div className="p-4 bg-green-800 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p>This is the {title} page. Content coming soon!</p>
    </div>
  );
}
