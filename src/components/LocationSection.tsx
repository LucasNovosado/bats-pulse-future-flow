
import React, { useState } from "react";
import { MapPin, Search, Phone, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data for store locations
const locations = [
  {
    id: 1,
    name: "SuperMarket Express",
    address: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 99999-9999",
    instagram: "@supermarket",
    featured: true
  },
  {
    id: 2,
    name: "Drogaria Premium",
    address: "Rua Augusta, 500",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 88888-8888",
    instagram: "@drogariapremium",
    featured: false
  },
  {
    id: 3,
    name: "Convenience Store 24h",
    address: "Av. Copacabana, 300",
    city: "Rio de Janeiro",
    state: "RJ",
    phone: "(21) 77777-7777",
    instagram: "@convenience24h",
    featured: true
  },
  {
    id: 4,
    name: "Mercado Central",
    address: "Rua das Flores, 200",
    city: "Belo Horizonte",
    state: "MG",
    phone: "(31) 66666-6666",
    instagram: "@mercadocentral",
    featured: false
  },
  {
    id: 5,
    name: "Loja de Conveniência EcoGas",
    address: "Av. Amazonas, 500",
    city: "Manaus",
    state: "AM",
    phone: "(92) 55555-5555",
    instagram: "@ecogas",
    featured: true
  },
  {
    id: 6,
    name: "Empório Metropolitano",
    address: "Rua Sergipe, 100",
    city: "Brasília",
    state: "DF",
    phone: "(61) 44444-4444",
    instagram: "@emporiometro",
    featured: false
  },
];

const LocationSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState ? location.state === filterState : true;
    return matchesSearch && matchesState;
  });

  const states = [...new Set(locations.map(location => location.state))];

  return (
    <section className="relative py-24 bg-bats-dark overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Onde</span>{" "}
            <span className="text-gradient-reverse">Comprar</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Encontre o Bats Energy Drink mais próximo de você ou torne-se um revendedor oficial
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nome ou cidade..."
              className="pl-10 bg-bats-dark/50 border-bats-blue/30 focus:border-bats-yellow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-md bg-bats-dark/50 border border-bats-blue/30 focus:border-bats-yellow text-white"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="">Todos os Estados</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Store cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <div 
              key={location.id} 
              className={`glow-card p-6 ${
                location.featured ? 'border-bats-yellow/30' : 'border-gray-800'
              }`}
            >
              {location.featured && (
                <div className="absolute -top-3 -right-3 bg-bats-yellow text-bats-dark px-3 py-1 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                  Destaque
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-white">
                {location.name}
              </h3>
              <div className="flex items-start mb-2">
                <MapPin className="w-5 h-5 text-bats-blue mr-2 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  {location.address}, {location.city} - {location.state}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 text-bats-blue mr-2 flex-shrink-0" />
                <p className="text-gray-300">{location.phone}</p>
              </div>
              <div className="flex items-center mt-4">
                <Link className="w-5 h-5 text-bats-yellow mr-2 flex-shrink-0" />
                <a 
                  href={`https://instagram.com/${location.instagram.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-bats-yellow hover:underline"
                >
                  {location.instagram}
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-400">Nenhum resultado encontrado. Tente outra busca.</p>
          </div>
        )}

        {/* Map placeholder */}
        <div className="mt-16 relative overflow-hidden rounded-lg">
          <div className="aspect-[16/9] bg-bats-dark/50 border border-bats-blue/20 flex items-center justify-center rounded-lg">
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-bats-yellow mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-2">Mapa Interativo</h3>
              <p className="text-gray-400 max-w-lg mx-auto">
                O mapa interativo completo estará disponível em breve! 
                Enquanto isso, consulte nossa lista de pontos de venda acima.
              </p>
            </div>
          </div>
          {/* Decorative glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-bats-yellow via-bats-blue to-bats-yellow opacity-20 blur-sm rounded-lg"></div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-bats-blue/20 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-bats-yellow/20 rounded-full filter blur-[100px]"></div>
    </section>
  );
};

export default LocationSection;
