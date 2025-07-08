export default function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-gunmetal bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-coffee p-6 rounded-2xl shadow-lg border-2 border-persian-orange relative w-[90vw] h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400"
        >
          Close
        </button>
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

