
import React, { useState, useEffect } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import PartnersList from "./PartnersList";
import PartnerForm from "./PartnerForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminLayout = () => {
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [parseReady, setParseReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if Parse is initialized
  useEffect(() => {
    const checkParseInitialization = () => {
      try {
        // Simple check to see if Parse is initialized
        if (Parse.applicationId) {
          setParseReady(true);
        } else {
          // If not ready, check again after a short delay
          setTimeout(checkParseInitialization, 500);
        }
      } catch (error) {
        setTimeout(checkParseInitialization, 500);
      }
    };
    
    checkParseInitialization();
  }, []);

  const handleLogout = async () => {
    if (!parseReady) return;
    try {
      await Parse.User.logOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso"
      });
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente mais tarde",
        variant: "destructive"
      });
    }
  };

  const handleAddPartner = () => {
    setIsAddingPartner(true);
    setIsEditingPartner(false);
    setCurrentPartner(null);
  };

  const handleEditPartner = (partner: any) => {
    setCurrentPartner(partner);
    setIsEditingPartner(true);
    setIsAddingPartner(true);
  };

  const handleCancelForm = () => {
    setIsAddingPartner(false);
    setIsEditingPartner(false);
    setCurrentPartner(null);
  };

  const handleFormSubmitSuccess = () => {
    setIsAddingPartner(false);
    setIsEditingPartner(false);
    setCurrentPartner(null);
    toast({
      title: isEditingPartner ? "Revendedor atualizado" : "Revendedor adicionado",
      description: isEditingPartner 
        ? "O revendedor foi atualizado com sucesso" 
        : "Um novo revendedor foi adicionado com sucesso"
    });
  };

  return (
    <div className="min-h-screen bg-bats-dark text-white">
      {/* Header */}
      <header className="border-b border-bats-blue/20 bg-bats-dark/90 backdrop-blur-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">
              <span className="text-bats-yellow">Bats</span>{" "}
              <span className="text-bats-blue">Admin</span>
            </h1>
          </div>
          
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="border-bats-blue/30 hover:bg-bats-blue/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isAddingPartner ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {isEditingPartner ? "Editar Revendedor" : "Adicionar Novo Revendedor"}
              </h2>
              <Button variant="outline" onClick={handleCancelForm}>Cancelar</Button>
            </div>
            
            <PartnerForm 
              partner={currentPartner} 
              onSubmitSuccess={handleFormSubmitSuccess} 
              isEditing={isEditingPartner}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Gerenciar Revendedores</h2>
              <Button 
                onClick={handleAddPartner} 
                className="bg-gradient-to-r from-bats-yellow to-bats-blue hover:from-bats-yellow/90 hover:to-bats-blue/90 text-black font-bold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Revendedor
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nome..."
                  className="pl-10 bg-bats-dark/50 border-bats-blue/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  className="px-4 py-2 rounded-md bg-bats-dark/50 border border-bats-blue/30 focus:border-bats-yellow text-white flex-1"
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                >
                  <option value="">Todos os Estados</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  {/* Adicione mais estados conforme necessário */}
                </select>
                
                <select
                  className="px-4 py-2 rounded-md bg-bats-dark/50 border border-bats-blue/30 focus:border-bats-yellow text-white flex-1"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                >
                  <option value="">Todas as Cidades</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Belo Horizonte">Belo Horizonte</option>
                  <option value="Porto Alegre">Porto Alegre</option>
                  <option value="Curitiba">Curitiba</option>
                  <option value="Florianópolis">Florianópolis</option>
                  {/* Adicione mais cidades conforme necessário */}
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className="sr-only"
                  />
                  <div className={`h-6 w-12 rounded-full p-1 duration-300 ease-in-out ${
                    showFeaturedOnly ? 'bg-bats-yellow' : 'bg-gray-700'
                  }`}>
                    <div className={`h-4 w-4 rounded-full bg-white duration-300 ease-in-out ${
                      showFeaturedOnly ? 'translate-x-6' : ''
                    }`} />
                  </div>
                  <span className="ml-3 text-sm">Mostrar apenas destaque</span>
                </label>
              </div>
            </div>

            <PartnersList 
              searchTerm={searchTerm} 
              filterState={filterState} 
              filterCity={filterCity} 
              showFeaturedOnly={showFeaturedOnly}
              onEditPartner={handleEditPartner}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default AdminLayout;
