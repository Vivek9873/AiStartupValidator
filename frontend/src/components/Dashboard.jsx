import { Trash2 } from "lucide-react";
import { API_BASE } from "../constants/Baseapi";
import { getRiskColor, getScoreColor } from "../constants/functions";

export default function Dashboard({
  ideas,
  setError,
  fetchIdeas,
  viewDetails,
}) {
  const deleteIdea = async (id) => {
    if (!window.confirm("Delete this idea?")) return;

    try {
      await fetch(`${API_BASE}/ideas/${id}`, { method: "DELETE" });
      fetchIdeas();
    } catch (err) {
      console.log(err);
      setError("Failed to delete");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Ideas</h2>
      {ideas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No ideas submitted yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {idea.description}
                  </p>
                  <div className="flex gap-4 items-center flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(
                        idea.analysis?.risk_level
                      )}`}
                    >
                      {idea.analysis?.risk_level || "N/A"} Risk
                    </span>
                    <span
                      className={`text-sm font-semibold ${getScoreColor(
                        idea.analysis?.profitability_score || 0
                      )}`}
                    >
                      Score: {idea.analysis?.profitability_score || 0}/100
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => viewDetails(idea._id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Report
                  </button>
                  <button
                    onClick={() => deleteIdea(idea._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
