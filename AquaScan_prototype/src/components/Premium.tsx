import { useDataset } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Lock, LineChart, Globe2, Download, Sparkles } from "lucide-react";

const Premium = () => {
  const { isCurrentDatasetFree, tokenBalance } = useDataset();

  // Treat this flag as the backend-provided prediction entitlement.
  const predictionAllowed = !!isCurrentDatasetFree;
  const predictionCredits = tokenBalance ?? 0;
  const creditsInsufficient = !predictionAllowed && predictionCredits <= 0;

  const badgeLabel = predictionAllowed ? "Prediction Available" : "Premium Feature";

  // When prediction is locked, this message is conceptually sourced from the backend.
  const lockedPrimaryMessage =
    "AI predictions are currently locked for this dataset. Add credits to continue.";

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Premium Environmental Insights</h1>
        <p className="text-muted-foreground max-w-2xl">
          Elevate your groundwater studies with richer analysis, predictive insights, and ready-to-share
          outputs designed for research and decision support.
        </p>
      </div>

      {/* Status banner */}
      <Card className="bg-gradient-to-r from-water-primary/10 via-water-secondary/10 to-background border-border/40">
        <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                predictionAllowed
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/40"
                  : "bg-amber-500/10 text-amber-500 border border-amber-500/40"
              }`}
            >
              {predictionAllowed ? (
                <BadgeCheck className="w-3 h-3" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              {badgeLabel}
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {predictionAllowed
                  ? "AI-powered future pollution insights are ready."
                  : lockedPrimaryMessage}
              </p>
              <p className="text-xs text-muted-foreground">
                Continue with your current access, or step up to a plan tailored for deeper environmental
                investigations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature highlights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Pollution Index Analysis */}
        <Card className="bg-card/60 backdrop-blur border-border/40">
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-water-primary" />
                <CardTitle className="text-sm">Pollution Index Analysis</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Quantify heavy metal stress in groundwater and compare relative risk across samples.
          </CardContent>
        </Card>

        {/* Interactive Maps & Graphs */}
        <Card className="bg-card/60 backdrop-blur border-border/40">
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-water-secondary" />
                <CardTitle className="text-sm">Interactive Maps &amp; Graphs</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Explore spatial patterns and temporal trends through rich, interactive visualisations.
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className="bg-card/60 backdrop-blur border-border/40">
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-water-primary" />
                <CardTitle className="text-sm">Data Export</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Move seamlessly from exploration to reporting with export-ready tables and summaries.
          </CardContent>
        </Card>

        {/* AI-Based Future Pollution Prediction */}
        <Card className="bg-card/60 backdrop-blur border-border/40">
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-water-secondary" />
                <CardTitle className="text-sm">AI-Based Future Prediction</CardTitle>
              </div>
              {!predictionAllowed && (
                <Lock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
          </CardHeader>
          {predictionAllowed && (
            <CardContent className="text-xs text-muted-foreground">
              Anticipate how pollution indices may evolve to support proactive management and planning.
            </CardContent>
          )}
        </Card>
      </div>

      {/* Prediction action & credits */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Prediction action */}
        <Card className="bg-card/70 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-water-primary" />
              Future Pollution Prediction
            </CardTitle>
            <CardDescription>
              Generate scenario-aware forecasts for your current dataset.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Button
              size="sm"
              disabled={!predictionAllowed}
              className={predictionAllowed ? "bg-water-primary text-white" : ""}
            >
              Run Prediction
            </Button>
            <p className="text-xs text-muted-foreground">
              {predictionAllowed
                ? "Tokens will be deducted on execution."
                : "Requires prediction credits."}
            </p>
          </CardContent>
        </Card>

        {/* Credits overview */}
        <Card className="bg-card/70 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-sm">Prediction Credits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-foreground">
              Prediction Credits:{" "}
              <span className="font-semibold">{predictionCredits}</span>
            </p>
            {creditsInsufficient && (
              <p className="text-xs text-amber-500">Additional credits required to continue.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pricing plans (only when upgrade is relevant) */}
      {!predictionAllowed && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Choose a premium research pack</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Plan 1 */}
            <Card className="border-border/50 bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base">Small Research Pack</CardTitle>
                <CardDescription>Ideal for focused case studies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>40 credits</p>
                <Button size="sm" className="mt-2 w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>

            {/* Plan 2 */}
            <Card className="border-border/50 bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base">Research Pack</CardTitle>
                <CardDescription>For extended campaigns and surveys.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>100 credits</p>
                <Button size="sm" className="mt-2 w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>

            {/* Plan 3 */}
            <Card className="border-water-primary/60 bg-gradient-to-b from-water-primary/10 to-card backdrop-blur shadow-glow">
              <CardHeader>
                <CardTitle className="text-base">Advanced Pack</CardTitle>
                <CardDescription>Best for high-volume research teams.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Unlimited rows</p>
                <p>250+ credits</p>
                <p className="text-foreground font-semibold">₹500</p>
                <Button size="sm" className="mt-2 w-full bg-water-primary text-white hover:bg-water-primary/90">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;

