import React from "react";

interface Sample {
  Sample_ID: string;
  HMPI: number;
  all_metal_conc: Record<string, number>;
}

const resultData: { GeoJSON: Sample[] } = {
  GeoJSON: [
    {
      Sample_ID: "S001",
      HMPI: 106.79647837150127,
      all_metal_conc: {
        Arsenic: 0.0125,
        Cadmium: 0.0031,
        Chromium: 0.055,
        Copper: 1.52,
        Lead: 0.015,
        Mercury: 0.0008,
        Nickel: 0.075,
        Uranium: 107.0061,
        Zinc: 5.15,
      },
    },
  ],
};

// HMPI thresholds
const getHMPIStatus = (hmpi: number) => {
  if (hmpi <= 50) return { label: "Safe", color: "bg-green-500" };
  else if (hmpi <= 100) return { label: "Moderate", color: "bg-yellow-400" };
  else return { label: "Risk", color: "bg-red-500" };
};

const ResultPage = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-background">
      <div className="container mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-center text-foreground mb-8">HMPI Results</h2>

        {resultData.GeoJSON.map((sample) => {
          const status = getHMPIStatus(sample.HMPI);
          const metals = Object.entries(sample.all_metal_conc);

          return (
            <div
              key={sample.Sample_ID}
              className="bg-card/50 backdrop-blur-md border border-border/30 rounded-2xl shadow-water p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-foreground">
                  Sample: {sample.Sample_ID}
                </h3>
                <span className={`text-white px-4 py-1 rounded-xl ${status.color}`}>
                  {status.label}
                </span>
              </div>

              {/* HMPI Value */}
              <p className="text-lg text-foreground">
                <strong>HMPI:</strong> {sample.HMPI.toFixed(2)}
              </p>

              {/* Metals Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-foreground">
                  <thead>
                    <tr className="bg-card/30">
                      <th className="border border-border/30 px-4 py-2 text-left">Metal</th>
                      <th className="border border-border/30 px-4 py-2 text-left">
                        Concentration (mg/L)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {metals.map(([metal, value]) => (
                      <tr key={metal} className="hover:bg-card/20 transition-colors">
                        <td className="border border-border/30 px-4 py-2">{metal}</td>
                        <td
                          className={`border border-border/30 px-4 py-2 rounded-lg font-semibold text-center ${
                            value > 0.05 ? "bg-red-200 text-red-800" : "bg-green-100 text-green-900"
                          }`}
                        >
                          {value.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Heatmap Row */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
                {metals.map(([metal, value]) => {
                  const intensity = Math.min(1, value / Math.max(...Object.values(sample.all_metal_conc)));
                  const bgColor = `rgba(220, 38, 38, ${intensity})`; // red intensity
                  return (
                    <div
                      key={metal}
                      className="flex flex-col items-center justify-center p-3 rounded-lg text-white font-medium"
                      style={{ backgroundColor: bgColor }}
                    >
                      <span>{metal}</span>
                      <span>{value.toFixed(3)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultPage;
