
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [parseReady, setParseReady] = useState(false);

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

  useEffect(() => {
    // Only check login status when Parse is ready
    if (!parseReady) return;
    
    // Check if user is logged in
    const currentUser = Parse.User.current();
    if (!currentUser) {
      navigate("/admin/login");
      return;
    }

    // Update page title
    document.title = "Painel Administrativo | Bats Energy Drink";
  }, [navigate, parseReady]);

  return parseReady ? <AdminLayout /> : (
    <div className="min-h-screen flex items-center justify-center bg-bats-dark">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-bats-yellow/50 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Carregando sistema...</p>
      </div>
    </div>
  );
};

export default Admin;
