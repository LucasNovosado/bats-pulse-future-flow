
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [parseReady, setParseReady] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if Parse is initialized
  useEffect(() => {
    const checkParseInitialization = () => {
      try {
        // Simple check to see if Parse is initialized
        if (Parse.applicationId) {
          setParseReady(true);
          console.log("Parse is ready in AdminLogin");
        } else {
          // If not ready, check again after a short delay
          console.log("Parse not ready yet, checking again...");
          setTimeout(checkParseInitialization, 500);
        }
      } catch (error) {
        console.error("Error checking Parse initialization:", error);
        setTimeout(checkParseInitialization, 500);
      }
    };
    
    checkParseInitialization();
  }, []);

  useEffect(() => {
    // Only check login status when Parse is ready
    if (!parseReady) return;
    
    try {
      // Check if user is already logged in
      const currentUser = Parse.User.current();
      if (currentUser) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error checking current user:", error);
    }
    
    // Update page title
    document.title = "Login Administrativo | Bats Energy Drink";
  }, [navigate, parseReady]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!parseReady) {
      toast({
        title: "Sistema inicializando",
        description: "Aguarde enquanto o sistema é inicializado",
        variant: "destructive",
      });
      return;
    }
    
    if (!username || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setLoginAttempt(prev => prev + 1);
    
    try {
      console.log(`Tentativa de login ${loginAttempt + 1} para usuário: ${username}`);
      
      // Verificando credenciais na Back4App
      await Parse.User.logIn(username, password);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo Bats Energy",
      });
      navigate("/admin");
    } catch (error: any) {
      console.error("Error logging in:", error);
      
      // Log detalhado do erro para diagnóstico
      if (error.code) {
        console.log(`Código de erro Parse: ${error.code}`);
      }
      
      toast({
        title: "Erro ao fazer login",
        description: "Credenciais inválidas. Verifique seu usuário e senha.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bats-dark p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-bats-blue/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-bats-yellow/20 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-gradient">Admin</span>{" "}
            <span className="text-gradient-reverse">Bats</span>
          </h1>
          <p className="text-gray-400">Painel administrativo para gerenciamento de revendedores</p>
        </div>
        
        <div className="glow-card bg-bats-dark/70 backdrop-blur-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="bg-bats-dark/50 border-bats-blue/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="bg-bats-dark/50 border-bats-blue/30 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {!parseReady && (
              <div className="text-center py-2">
                <div className="inline-block h-4 w-4 border-2 border-bats-yellow/30 border-t-bats-yellow rounded-full animate-spin mr-2"></div>
                <span className="text-gray-400 text-sm">Inicializando sistema...</span>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isLoading || !parseReady} 
              className="w-full bg-gradient-to-r from-bats-yellow to-bats-blue hover:from-bats-yellow/90 hover:to-bats-blue/90 text-black font-bold"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            
            {loginAttempt > 0 && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-400">
                  Se não conseguir acessar, contate um administrador do sistema.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
