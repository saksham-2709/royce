import React from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface VisualizeProps {
  dataset?: {
    metals: string[];
    currentLevels: number[];
    whoLimits: number[];
  };
}

const Visualize: React.FC<VisualizeProps> = ({ dataset }) => {
  const metals = dataset?.metals || ["Lead", "Cadmium", "Mercury", "Arsenic", "Chromium", "Copper"];
  const currentLevels = dataset?.currentLevels || [0.08, 0.03, 0.06, 0.04, 0.07, 0.05];
  const whoLimits = dataset?.whoLimits || [0.05, 0.025, 0.05, 0.01, 0.05, 0.05];

  // Bar Chart
  const barData = {
    labels: metals,
    datasets: [
      { label: "Current Level (mg/L)", data: currentLevels, backgroundColor: "rgba(59,130,246,0.7)" },
      { label: "WHO Safe Limit (mg/L)", data: whoLimits, backgroundColor: "rgba(34,197,94,0.7)" },
    ],
  };

  const barOptions = { responsive: true, plugins: { legend: { position: "top" as const }, title: { display: true, text: "Heavy Metal Concentrations" } } };

  // Line Chart
  const lineData = {
    labels: metals,
    datasets: [
      { label: "Current Levels", data: currentLevels, borderColor: "rgba(59,130,246,0.8)", backgroundColor: "rgba(59,130,246,0.3)", fill: true },
      { label: "WHO Limits", data: whoLimits, borderColor: "rgba(34,197,94,0.8)", backgroundColor: "rgba(34,197,94,0.3)", fill: true },
    ],
  };

  const lineOptions = { responsive: true, plugins: { legend: { position: "top" as const }, title: { display: true, text: "Trend Comparison" } } };

  // Pie Chart (small)
  const pieData = {
    labels: metals,
    datasets: [{ data: currentLevels, backgroundColor: ["#3b82f6","#22c55e","#f97316","#eab308","#8b5cf6","#f43f5e"] }],
  };

  const pieOptions = { responsive: true, plugins: { title: { display: true, text: "Proportion of Each Metal" } } };

  // Radar Chart
  const radarData = {
    labels: metals,
    datasets: [
      { label: "Current Levels", data: currentLevels, backgroundColor: "rgba(59,130,246,0.2)", borderColor: "rgba(59,130,246,0.7)" },
      { label: "WHO Limits", data: whoLimits, backgroundColor: "rgba(34,197,94,0.2)", borderColor: "rgba(34,197,94,0.7)" },
    ],
  };

  const radarOptions = { responsive: true, plugins: { title: { display: true, text: "Radar Comparison" } } };

  // Heatmap: intensity proportional to metal concentration
  const maxLevel = Math.max(...currentLevels, ...whoLimits);
  const getHeatColor = (value: number) => {
    const intensity = Math.min(1, value / maxLevel);
    const red = Math.floor(255 * intensity);
    return `rgb(${red}, 100, 150)`; // shades of red/pink
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bar Chart: Heavy Metal Concentrations</h3>
        <Bar data={barData} options={barOptions} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Line Chart: Trend Comparison</h3>
        <Line data={lineData} options={lineOptions} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pie Chart: Distribution of Metals</h3>
        <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Radar Chart: Current vs WHO</h3>
        <Radar data={radarData} options={radarOptions} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Heatmap: Metal Concentrations</h3>
        <div className="grid grid-cols-6 gap-2 text-center">
          {metals.map((metal, idx) => (
            <div
              key={metal}
              style={{ backgroundColor: getHeatColor(currentLevels[idx]), padding: "1rem", borderRadius: "0.5rem", color: "#fff" }}
            >
              <strong>{metal}</strong>
              <div>{currentLevels[idx]} mg/L</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visualize;
