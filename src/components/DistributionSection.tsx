
import React from "react";
import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DistributionSection = () => {
  return (
    <section className="relative py-24 bg-bats-dark overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 relative">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-bats-yellow via-bats-blue to-bats-neon opacity-20 blur-sm rounded-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Distribua</span>{" "}
                <span className="text-gradient-reverse">o Futuro</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Torne-se parte da revolução energética. Distribua ou revenda Bats 
                e conecte-se com um público que busca o próximo nível em bebidas energéticas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-bats-yellow text-bats-dark flex items-center justify-center mt-1 mr-3">
                    <span className="font-bold">1</span>
                  </div>
                  <p className="text-gray-300">Margens atrativas e suporte completo de marketing</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-bats-yellow text-bats-dark flex items-center justify-center mt-1 mr-3">
                    <span className="font-bold">2</span>
                  </div>
                  <p className="text-gray-300">Produto premium com design exclusivo e alta demanda</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-bats-yellow text-bats-dark flex items-center justify-center mt-1 mr-3">
                    <span className="font-bold">3</span>
                  </div>
                  <p className="text-gray-300">Programa de fidelidade e benefícios para distribuidores</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="glow-button bg-bats-yellow text-bats-dark hover:bg-bats-yellow/90 text-lg font-bold px-8 py-6">
                  <Rocket className="mr-2 h-5 w-5" />
                  Quero Distribuir
                </Button>
                <Button variant="outline" className="glow-button border-bats-blue text-bats-blue hover:bg-bats-blue/10 text-lg font-bold px-8 py-6">
                  Quero Revender
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-bats-yellow via-bats-blue to-bats-neon opacity-30 blur-xl rounded-full animate-pulse-glow"></div>
                <img
                  src="/lovable-uploads/5cb9df3d-6768-413a-a980-7d8764f4f478.png"
                  alt="Bats Energy Drink"
                  className="w-52 md:w-64 h-auto relative transform rotate-12 animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-bats-blue/10 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-bats-yellow/10 rounded-full filter blur-[120px]"></div>
    </section>
  );
};

export default DistributionSection;
