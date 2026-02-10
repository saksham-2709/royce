import { useEffect, useState } from 'react';

const WaterBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated water gradient background */}
      <div className="absolute inset-0 bg-gradient-water opacity-20 animate-wave" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Water droplets */}
      <div className="water-droplet" style={{ left: '10%', top: '20%', animationDelay: '0s' }} />
      <div className="water-droplet" style={{ left: '80%', top: '40%', animationDelay: '1.5s' }} />
      <div className="water-droplet" style={{ left: '30%', top: '70%', animationDelay: '3s' }} />
      <div className="water-droplet" style={{ left: '70%', top: '15%', animationDelay: '2s' }} />

      {/* Ripple effects */}
      <div 
        className="absolute w-32 h-32 rounded-full border border-water-primary/20 animate-ripple"
        style={{ left: '20%', top: '60%', animationDelay: '1s' }}
      />
      <div 
        className="absolute w-24 h-24 rounded-full border border-water-secondary/20 animate-ripple"
        style={{ right: '25%', top: '30%', animationDelay: '2.5s' }}
      />
    </div>
  );
};

export default WaterBackground;