
import React from "react";
import { Instagram, Facebook, Twitter, Bolt } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white overflow-hidden py-16">
      {/* Particle background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-bats-${i % 2 ? 'yellow' : 'blue'} opacity-${5 + (i % 5)} animate-particles`}
            style={{
              width: `${5 + Math.random() * 8}px`,
              height: `${5 + Math.random() * 8}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Bolt className="w-8 h-8 text-bats-yellow mr-2" />
              <h3 className="text-2xl font-bold text-gradient">BATS</h3>
            </div>
            <p className="text-gray-400 max-w-xs mx-auto md:mx-0">
              A energia que move o futuro. Desperte seu potencial com o energético mais inovador do mercado.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-bats-yellow">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-bats-yellow transition-colors">Sobre</a></li>
                <li><a href="#" className="text-gray-400 hover:text-bats-yellow transition-colors">Benefícios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-bats-yellow transition-colors">Ingredientes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-bats-yellow transition-colors">Sustentabilidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-bats-blue">Negócios</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-bats-blue transition-colors">Distribuição</a></li>
                <li><a href="#" className="text-gray-400 hover:text-bats-blue transition-colors">Revenda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-bats-blue transition-colors">Parcerias</a></li>
                <li><a href="#" className="text-gray-400 hover:text-bats-blue transition-colors">Contato</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-bold mb-4 text-bats-neon">Contato</h4>
              <ul className="space-y-2">
                <li><a href="mailto:contato@batsenergy.com" className="text-gray-400 hover:text-bats-neon transition-colors">contato@batsenergy.com</a></li>
                <li><a href="tel:+551147899988" className="text-gray-400 hover:text-bats-neon transition-colors">+55 11 4789-9988</a></li>
                <li className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-bats-yellow transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-bats-blue transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-bats-neon transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="relative py-4 overflow-hidden border-t border-b border-white/10 my-8">
          <div className="ticker-text inline-block">
            <span className="text-lg font-medium">
              Energia em movimento. Atitude sem limites. Faça parte do futuro com Bats ⚡ Energia em movimento. Atitude sem limites. Faça parte do futuro com Bats ⚡
            </span>
          </div>
          <div className="ticker-text inline-block">
            <span className="text-lg font-medium">
              Energia em movimento. Atitude sem limites. Faça parte do futuro com Bats ⚡ Energia em movimento. Atitude sem limites. Faça parte do futuro com Bats ⚡
            </span>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2023 Bats Energy Drink. Todos os direitos reservados.</p>
          <p className="mt-2">Consumo de energéticos não recomendado para crianças, gestantes, idosos e pessoas sensíveis à cafeína.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
