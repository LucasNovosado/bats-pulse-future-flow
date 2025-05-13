
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = Parse.User.current();
    if (!currentUser) {
      navigate("/admin/login");
      return;
    }

    // Update page title
    document.title = "Painel Administrativo | Bats Energy Drink";
  }, [navigate]);

  return <AdminLayout />;
};

export default Admin;
