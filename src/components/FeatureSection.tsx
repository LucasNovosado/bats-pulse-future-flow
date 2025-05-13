
import React from "react";
import { Zap, Rocket, Brain, Users } from "lucide-react";

const features = [
  {
    icon: <Rocket className="w-12 h-12 text-bats-yellow" />,
    title: "Alta Performance",
    description: "Formulação avançada que ativa todo seu potencial e prolonga sua energia sem crashes"
  },
  {
    icon: <Brain className="w-12 h-12 text-bats-blue" />,
    title: "Foco e Criatividade",
    description: "Desperte ideias inovadoras e mantenha concentração máxima em tarefas importantes"
  },
  {
    icon: <Users className="w-12 h-12 text-bats-yellow" />,
    title: "Estilo de Vida Ativo",
    description: "Para quem não para, se desafia constantemente e quebra limites todos os dias"
  },
  {
    icon: <Zap className="w-12 h-12 text-bats-blue" />,
    title: "Design Inovador",
    description: "Visual futurista que representa a essência moderna e tecnológica da marca Bats"
  }
];

const FeatureSection = () => {
  return (
    <section className="relative py-24 bg-bats-dark section-transition">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Por que o Bats é</span> <span className="text-gradient-reverse">Diferente</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Muito mais que um energético. Uma experiência sensorial completa para 
            sua mente e corpo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glow-card p-6 group"
            >
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient">
                {feature.title}
              </h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-4 w-24 h-24 rounded-full bg-bats-blue/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 w-32 h-32 rounded-full bg-bats-yellow/10 blur-3xl"></div>
    </section>
  );
};

export default FeatureSection;
