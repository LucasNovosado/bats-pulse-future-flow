
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (!data.session) {
          // Redirecionar para login se não estiver autenticado
          navigate("/admin/login");
          return;
        }
        
        // Se chegou aqui, está autenticado
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        toast({
          title: "Erro de autenticação",
          description: "Por favor, faça login novamente",
          variant: "destructive",
        });
        navigate("/admin/login");
      }
    };
    
    checkAuth();
    
    // Monitorar mudanças no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/admin/login");
        } else if (!session) {
          navigate("/admin/login");
        }
      }
    );
    
    // Update page title
    document.title = "Painel Administrativo | Bats Energy Drink";
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center bg-bats-dark">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-bats-yellow/50 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Carregando sistema...</p>
      </div>
    </div>
  ) : (
    <AdminLayout />
  );
};

export default Admin;
