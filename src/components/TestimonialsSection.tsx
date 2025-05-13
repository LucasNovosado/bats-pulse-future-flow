
import React, { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Marcos Silva",
    role: "Atleta Profissional",
    comment: "Bats é meu energético oficial nos treinos e competições. A energia é duradoura e não causa aquela queda depois. Simplesmente o melhor do mercado!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Carla Mendes",
    role: "Desenvolvedora de Software",
    comment: "Nas maratonas de programação, Bats é meu companheiro fiel. Me mantém focada por horas sem aquela sensação de nervosismo que outros energéticos causam.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Rafael Torres",
    role: "DJ & Produtor Musical",
    comment: "Quando preciso de energia para shows que vão até o amanhecer, Bats é a única bebida que realmente funciona. O sabor é incrível e o design da lata é puro estilo!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Juliana Costa",
    role: "Gameplayer Profissional",
    comment: "Bats é essencial nos meus campeonatos. Melhora meus reflexos e me mantém alerta por horas. Além disso, não tem aquele gosto químico de outros energéticos.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToNext = () => {
    if (!scrollRef.current) return;
    const newIndex = Math.min(activeIndex + 1, testimonials.length - 1);
    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * scrollRef.current.offsetWidth / Math.min(testimonials.length, 3),
      behavior: 'smooth',
    });
  };

  const scrollToPrev = () => {
    if (!scrollRef.current) return;
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * scrollRef.current.offsetWidth / Math.min(testimonials.length, 3),
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-bats-dark to-black overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">O que dizem sobre o</span>{" "}
            <span className="text-gradient-reverse">Bats</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Descubra por que tantas pessoas escolheram Bats como seu energético preferido
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="relative">
          <div 
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-6"
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-start glow-card p-6 h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-bats-yellow mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-bats-blue">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-bats-yellow fill-bats-yellow' : 'text-gray-500'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 flex-1">{testimonial.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-bats-blue/30 text-bats-blue hover:bg-bats-blue/10"
              onClick={scrollToPrev}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-bats-blue/30 text-bats-blue hover:bg-bats-blue/10"
              onClick={scrollToNext}
              disabled={activeIndex >= testimonials.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-bats-blue/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-bats-yellow/10 rounded-full filter blur-[100px]"></div>
    </section>
  );
};

export default TestimonialsSection;
