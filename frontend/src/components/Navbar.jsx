export default function Navbar({ view, setView }) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          Startup Validator
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("submit")}
            className={`px-4 py-2 cursor-pointer rounded-lg transition ${
              view === "submit"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Submit Idea
          </button>
          <button
            onClick={() => setView("dashboard")}
            className={`px-4 py-2 rounded-lg cursor-pointer transition ${
              view === "dashboard" || view === "detail"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}
