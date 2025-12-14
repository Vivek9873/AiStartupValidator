import {
  AlertTriangle,
  Code,
  DollarSign,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { getRiskColor, getScoreColor } from "../constants/functions";
import Section from "./Section";

export default function Details({ setView, selectedIdea }) {
  return (
    <div>
      <button
        onClick={() => setView("dashboard")}
        className="mb-4 text-indigo-600 hover:text-indigo-700 font-semibold"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {selectedIdea.title}
        </h2>
        <p className="text-gray-600 mb-6">{selectedIdea.description}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div
            className={`p-4 rounded-lg ${getRiskColor(
              selectedIdea.analysis.risk_level
            )}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={20} />
              <span className="font-semibold">Risk Level</span>
            </div>
            <p className="text-2xl font-bold">
              {selectedIdea.analysis.risk_level}
            </p>
          </div>

          <div className={`p-4 rounded-lg bg-indigo-50`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={20} className="text-indigo-600" />
              <span className="font-semibold text-indigo-600">
                Profitability Score
              </span>
            </div>
            <p
              className={`text-2xl font-bold ${getScoreColor(
                selectedIdea.analysis.profitability_score
              )}`}
            >
              {selectedIdea.analysis.profitability_score}/100
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Section icon={<Target />} title="Problem Statement" color="blue">
            <p className="text-gray-700">{selectedIdea.analysis.problem}</p>
          </Section>

          <Section icon={<Users />} title="Customer Persona" color="green">
            <p className="text-gray700">{selectedIdea.analysis.customer}</p>
          </Section>

          <Section icon={<TrendingUp />} title="Market Overview" color="purple">
            <p className="text-gray-700">{selectedIdea.analysis.market}</p>
          </Section>

          <Section icon={<DollarSign />} title="Competitors" color="orange">
            <div className="space-y-2">
              {selectedIdea.analysis.competitors.map((comp, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800">{comp.name}</p>
                  <p className="text-sm text-gray-600">
                    {comp.differentiation}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<Code />} title="Suggested Tech Stack" color="indigo">
            <div className="flex flex-wrap gap-2">
              {selectedIdea.analysis.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          <Section icon={<AlertTriangle />} title="Justification" color="gray">
            <p className="text-gray-700">
              {selectedIdea.analysis.justification}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
