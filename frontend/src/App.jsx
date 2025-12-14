import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import { API_BASE } from "./constants/Baseapi";
import Submit from "./components/Submit";
import Dashboard from "./components/Dashboard";
import Details from "./components/Details";

function App() {
  const [view, setView] = useState("submit");
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (view === "dashboard") {
      fetchIdeas();
    }
  }, [view]);

  const fetchIdeas = async () => {
    try {
      const res = await fetch(`${API_BASE}/ideas`);
      const data = await res.json();
      setIdeas(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch ideas");
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      await res.json();
      setFormData({ title: "", description: "" });
      setView("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/ideas/${id}`);
      const data = await res.json();
      setSelectedIdea(data);
      setView("detail");
    } catch (err) {
      console.log(err);
      setError("Failed to load details");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar view={view} setView={setView} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {view === "submit" && (
          <Submit
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}

        {view === "dashboard" && (
          <Dashboard
            ideas={ideas}
            setError={setError}
            fetchIdeas={fetchIdeas}
            viewDetails={viewDetails}
          />
        )}

        {view === "detail" && selectedIdea && (
          <Details setView={setView} selectedIdea={selectedIdea} />
        )}
      </div>
    </div>
  );
}

export default App;
