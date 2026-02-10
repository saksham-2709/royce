import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import WaterBackground from "@/components/WaterBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AnalysisOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Analysis tabs share a single layout; Premium is added
  // as an additional tab without changing routing architecture.
  const tabs = ["samples", "map", "export", "premium"] as const; // lowercase for routes
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("samples");

  // Set active tab based on URL
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (tabs.includes(path as any)) {
      setActiveTab(path as any);
    } else {
      // Default to "samples" if URL doesn't match
      navigate("/analysis/samples", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleTabClick = (tab: typeof tabs[number]) => {
    setActiveTab(tab);
    navigate(`/analysis/${tab}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <WaterBackground />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Analysis Ready
          </h2>
          <p className="text-muted-foreground text-lg">
            Select an option below to continue your analysis
          </p>
        </div>

        <Card className="p-8 bg-card/40 backdrop-blur-water border-border/30 shadow-water">
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-4 flex-wrap">
              {tabs.map((tab) => {
                const labelMap: Record<(typeof tabs)[number], string> = {
                  samples: "Samples",
                  map: "Map",
                  export: "Export",
                  premium: "Premium",
                };

                return (
                  <Button
                    key={tab}
                    className={`${
                      activeTab === tab
                        ? "bg-water-primary text-white"
                        : "bg-muted/20 text-foreground"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {labelMap[tab]}
                  </Button>
                );
              })}
            </div>

            {/* Page content below tabs */}
            <div className="mt-6">
              <Outlet />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisOptions;
