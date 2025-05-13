
import React, { useEffect, useRef } from "react";
import { Bolt, ShoppingCart, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const canRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canRef.current || !particlesRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Parallax effect for the can
      const moveX = (clientX - innerWidth / 2) / 50;
      const moveY = (clientY - innerHeight / 2) / 50;
      
      canRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;

      // Particles following the mouse with delay
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const p = particle as HTMLElement;
        const speed = 1 - index * 0.1;
        const x = moveX * speed;
        const y = moveY * speed;
        p.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-bats-dark to-black flex flex-col items-center justify-center">
      {/* Particle background */}
      <div className="absolute inset-0 z-0 overflow-hidden" ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`particle absolute rounded-full bg-bats-${i % 2 ? 'yellow' : 'blue'} opacity-${5 + (i % 5)} animate-particles`}
            style={{
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-bats-dark opacity-80 z-10"></div>

      {/* Content */}
      <div className="container relative z-20 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              <span className="inline-block">⚡</span>{" "}
              <span className="text-gradient font-extrabold">Beba a Energia</span>{" "}
              <span className="block mt-2">que <span className="text-gradient-reverse">Move o Futuro</span></span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-80">
              O energético mais ousado, tecnológico e vibrante do mercado. 
              Projetado para despertar seu potencial máximo.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button className="glow-button bg-bats-yellow text-bats-dark hover:bg-bats-yellow/90 hover:text-black text-lg font-bold px-8 py-6">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Comprar Agora
              </Button>
              <Button variant="outline" className="glow-button border-bats-yellow text-bats-yellow hover:bg-bats-yellow/10 text-lg font-bold px-8 py-6">
                <Instagram className="mr-2 h-5 w-5" />
                Seguir no Instagram
              </Button>
              <Button variant="ghost" className="glow-button text-bats-blue hover:bg-bats-blue/10 hover:text-bats-yellow text-lg font-bold px-8 py-6">
                <Bolt className="mr-2 h-5 w-5" />
                Quero Distribuir
              </Button>
            </div>
          </div>

          {/* Can image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-bats-yellow via-bats-blue to-bats-yellow opacity-30 blur-xl rounded-full animate-pulse-glow"></div>
              <img
                ref={canRef}
                src="/lovable-uploads/5cb9df3d-6768-413a-a980-7d8764f4f478.png"
                alt="Bats Energy Drink"
                className="relative w-40 md:w-64 lg:w-72 xl:w-80 h-auto object-contain animate-float hero-pulse"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
