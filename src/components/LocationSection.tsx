
import React, { useState, useEffect } from "react";
import { MapPin, Search, Phone, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const LocationSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [locations, setLocations] = useState<any[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchLocations();
  }, []);
  
  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Buscar parceiros ativos do Supabase
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("status", true)
        .order("name");
      
      if (error) throw error;
      
      setLocations(data || []);
      
      // Extrair estados únicos para filtragem
      const uniqueStates = Array.from(
        new Set(data?.map(partner => partner.state) || [])
      ).filter(state => !!state) as string[];
      
      setStates(uniqueStates.sort());
    } catch (error: any) {
      console.error("Error fetching locations:", error);
      setError("Não foi possível carregar os revendedores. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
  
  const filteredLocations = locations.filter(location => {
    const name = location.name || "";
    const city = location.city || "";
    const state = location.state || "";
    
    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState ? state === filterState : true;
    
    return matchesSearch && matchesState;
  });

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

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 border-4 border-bats-yellow/30 border-t-bats-yellow rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Carregando revendedores...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg max-w-md mx-auto">
              <p className="text-red-400">{error}</p>
              <Button 
                onClick={fetchLocations}
                variant="outline"
                className="mt-4 border-red-800 text-red-300 hover:bg-red-900/30"
              >
                Tentar novamente
              </Button>
            </div>
          </div>
        )}

        {/* Store cards */}
        {!loading && !error && (
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
                    {location.address}, {location.district && `${location.district}, `} 
                    {location.city} - {location.state}
                  </p>
                </div>
                {location.phone && (
                  <div className="flex items-center mb-2">
                    <Phone className="w-5 h-5 text-bats-blue mr-2 flex-shrink-0" />
                    <p className="text-gray-300">{location.phone}</p>
                  </div>
                )}
                {location.google_maps_url && (
                  <div className="flex items-center mt-4">
                    <Link className="w-5 h-5 text-bats-yellow mr-2 flex-shrink-0" />
                    <a 
                      href={location.google_maps_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-bats-yellow hover:underline"
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                )}
                {location.category && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <span className="inline-block px-3 py-1 text-xs bg-bats-blue/20 text-bats-blue rounded-full">
                      {location.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredLocations.length === 0 && (
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
