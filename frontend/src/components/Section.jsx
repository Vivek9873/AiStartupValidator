import React from "react";

export default function Section({ icon, title, children, color }) {
  const colors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
    gray: "text-gray-600",
  };

  return (
    <div className="border-l-4 border-gray-200 pl-4">
      <div className={`flex items-center gap-2 mb-3 ${colors[color]}`}>
        {React.cloneElement(icon, { size: 24 })}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
