import WaterBackground from '@/components/WaterBackground';
import Header from '@/components/Header';
import DatasetUpload from '@/components/DatasetUpload';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, BarChart3, MapPin, Clock } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Automated HMPI Computation",
      description: "Calculate Heavy Metal Pollution Indices using standardized methodologies with zero manual intervention"
    },
    {
      icon: MapPin,
      title: "Geo-spatial Integration",
      description: "Process datasets with geographic coordinates for comprehensive spatial analysis"
    },
    {
      icon: Shield,
      title: "Quality Assessment",
      description: "Categorize groundwater quality based on heavy metal contamination levels"
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Get instant results with error reduction and reliable computational accuracy"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <WaterBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-6 pb-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Assess Groundwater
              <br />
              <span className="text-water-primary">Heavy Metal</span> Pollution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Advanced automated platform for computing Heavy Metal Pollution Indices (HMPI) 
              in groundwater systems. Streamline environmental monitoring with precision and reliability.
            </p>
          </div>

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <DatasetUpload />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-card/30 backdrop-blur-water border-border/50 hover:bg-card/50 transition-all duration-300 hover:shadow-water group"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 rounded-full bg-water-primary/10 group-hover:bg-water-primary/20 transition-colors w-fit mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-water-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Statement */}
          <Card className="bg-gradient-water/5 backdrop-blur-water border-water-primary/20 shadow-glow">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Environmental Impact & Public Health Protection
              </h3>
              <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Heavy metals in drinking water, even at trace levels, pose significant health risks. 
                Our platform provides accessible and reliable insights into groundwater contamination, 
                enabling better decision-making for environmental monitoring, regulatory compliance, 
                and public health protection across communities and ecosystems.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;