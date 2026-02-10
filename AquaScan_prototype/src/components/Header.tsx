import { Droplets, Beaker } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative z-10 flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Droplets className="w-8 h-8 text-water-primary animate-droplet" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-water-secondary rounded-full animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            AquaScan
          </h1>
          <p className="text-sm text-muted-foreground">
            Heavy Metal Pollution Index Assessment
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-water rounded-full border border-border/50">
        <Beaker className="w-4 h-4 text-water-secondary" />
        <span className="text-sm font-medium text-foreground">v1.0</span>
      </div>
    </header>
  );
};

export default Header;