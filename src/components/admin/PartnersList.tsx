
import React, { useEffect, useState } from "react";
import Parse from "parse";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

interface PartnersListProps {
  searchTerm: string;
  filterState: string;
  filterCity: string;
  showFeaturedOnly: boolean;
  onEditPartner: (partner: any) => void;
}

const PartnersList: React.FC<PartnersListProps> = ({
  searchTerm,
  filterState,
  filterCity,
  showFeaturedOnly,
  onEditPartner,
}) => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<any>(null);
  const itemsPerPage = 10;
  const { toast } = useToast();

  const fetchPartners = async () => {
    setLoading(true);
    
    try {
      const Partner = Parse.Object.extend("Partner");
      const query = new Parse.Query(Partner);
      
      // Apply filters
      if (searchTerm) {
        query.contains("name", searchTerm);
      }
      
      if (filterState) {
        query.equalTo("state", filterState);
      }
      
      if (filterCity) {
        query.equalTo("city", filterCity);
      }
      
      if (showFeaturedOnly) {
        query.equalTo("featured", true);
      }
      
      // Count total for pagination
      const count = await query.count();
      setTotalPages(Math.ceil(count / itemsPerPage));
      
      // Set limit and skip for pagination
      query.limit(itemsPerPage);
      query.skip((currentPage - 1) * itemsPerPage);
      
      // Sort by name
      query.ascending("name");
      
      const results = await query.find();
      setPartners(results);
    } catch (error: any) {
      console.error("Error fetching partners:", error);
      toast({
        title: "Erro ao carregar revendedores",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [currentPage, searchTerm, filterState, filterCity, showFeaturedOnly]);

  const handleDeleteClick = (partner: any) => {
    setPartnerToDelete(partner);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!partnerToDelete) return;
    
    try {
      await partnerToDelete.destroy();
      toast({
        title: "Revendedor excluído",
        description: "O revendedor foi excluído com sucesso",
      });
      fetchPartners();
    } catch (error: any) {
      console.error("Error deleting partner:", error);
      toast({
        title: "Erro ao excluir revendedor",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setOpenDeleteDialog(false);
      setPartnerToDelete(null);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  if (loading && partners.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-bats-yellow/50 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Carregando revendedores...</p>
        </div>
      </div>
    );
  }

  if (partners.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed border-gray-700 rounded-lg">
        <p className="text-gray-400 mb-2">Nenhum revendedor encontrado</p>
        <p className="text-sm text-gray-500">Tente ajustar os filtros ou adicione um novo revendedor</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg border border-gray-800">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Cidade/Estado</TableHead>
              <TableHead className="hidden lg:table-cell">Endereço</TableHead>
              <TableHead className="hidden lg:table-cell">Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id} className="border-t border-gray-800">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="text-white">{partner.get("name")}</span>
                    {partner.get("featured") && (
                      <span className="text-xs text-bats-yellow mt-1">Destaque</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col">
                    <span>{partner.get("city")}</span>
                    <span className="text-xs text-gray-400">{partner.get("state")}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="truncate max-w-xs">
                    {partner.get("address")}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {partner.get("category") || "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    partner.get("status") 
                      ? "bg-green-900/30 text-green-400" 
                      : "bg-red-900/30 text-red-400"
                  }`}>
                    {partner.get("status") ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEditPartner(partner)}
                      className="border-bats-blue/30 hover:bg-bats-blue/10"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Editar</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteClick(partner)}
                      className="border-red-900/30 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {renderPagination()}

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir o revendedor <strong>{partnerToDelete?.get("name")}</strong>. 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PartnersList;
