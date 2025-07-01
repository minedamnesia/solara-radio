export default function UploadErrorModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-beaver p-6 rounded-2xl shadow-xl max-w-md text-center">
        <h2 className="text-3xl font-heading mb-4 text-red-500">Upload Denied</h2>
        <p className="font-sans mb-4 text-tan">
          This site only allows ADIF uploads by <span className="font-bold">KK7QEA</span>.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-persian-orange text-gunmetal rounded-lg hover:bg-amber-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

