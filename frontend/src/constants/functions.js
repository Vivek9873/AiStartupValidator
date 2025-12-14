export const getRiskColor = (risk) => {
    const colors = {
        Low: "text-green-600 bg-green-50",
        Medium: "text-yellow-600 bg-yellow-50",
        High: "text-red-600 bg-red-50",
    };
    return colors[risk] || "text-gray-600 bg-gray-50";
};

export const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
};