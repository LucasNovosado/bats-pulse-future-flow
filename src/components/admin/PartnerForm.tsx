
import React, { useState, useEffect } from "react";
import Parse from "parse";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PartnerFormProps {
  partner?: any;
  onSubmitSuccess: () => void;
  isEditing: boolean;
}

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  cep: z.string().min(8, "CEP deve ter pelo menos 8 caracteres"),
  phone: z.string().optional(),
  category: z.string().optional(),
  googleMapsUrl: z.string().url("URL inválida").or(z.string().length(0)),
  featured: z.boolean().default(false),
  status: z.boolean().default(true),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

const PartnerForm: React.FC<PartnerFormProps> = ({ 
  partner, 
  onSubmitSuccess, 
  isEditing 
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      district: "",
      city: "",
      state: "",
      cep: "",
      phone: "",
      category: "",
      googleMapsUrl: "",
      featured: false,
      status: true,
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (partner && isEditing) {
      // Get coordinates if available
      let latitude = "";
      let longitude = "";
      const coordinates = partner.get("coordinates");
      if (coordinates) {
        latitude = coordinates.latitude?.toString() || "";
        longitude = coordinates.longitude?.toString() || "";
      }
      
      form.reset({
        name: partner.get("name") || "",
        address: partner.get("address") || "",
        district: partner.get("district") || "",
        city: partner.get("city") || "",
        state: partner.get("state") || "",
        cep: partner.get("cep") || partner.get("zipCode") || "",
        phone: partner.get("phone") || "",
        category: partner.get("category") || "",
        googleMapsUrl: partner.get("googleMapsUrl") || "",
        featured: partner.get("featured") || false,
        status: partner.get("status") !== false, // default to true if undefined
        latitude,
        longitude,
      });
    }
  }, [partner, isEditing, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const Partner = Parse.Object.extend("Partner");
      let partnerObject;
      
      if (isEditing && partner) {
        partnerObject = partner;
      } else {
        partnerObject = new Partner();
      }
      
      // Convert coordinates to Parse.GeoPoint if both values are provided
      let coordinates = null;
      if (values.latitude && values.longitude) {
        const lat = parseFloat(values.latitude);
        const lng = parseFloat(values.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          coordinates = new Parse.GeoPoint({ latitude: lat, longitude: lng });
        }
      }

      // Set all fields
      partnerObject.set("name", values.name);
      partnerObject.set("address", values.address);
      partnerObject.set("district", values.district);
      partnerObject.set("city", values.city);
      partnerObject.set("state", values.state);
      partnerObject.set("cep", values.cep);
      partnerObject.set("zipCode", values.cep); // To maintain compatibility
      partnerObject.set("phone", values.phone || null);
      partnerObject.set("category", values.category || null);
      partnerObject.set("googleMapsUrl", values.googleMapsUrl || null);
      partnerObject.set("featured", values.featured);
      partnerObject.set("status", values.status);
      
      if (coordinates) {
        partnerObject.set("coordinates", coordinates);
      }
      
      await partnerObject.save();
      
      toast({
        title: isEditing ? "Revendedor atualizado" : "Revendedor adicionado",
        description: isEditing 
          ? "As alterações foram salvas com sucesso" 
          : "Um novo revendedor foi adicionado"
      });
      
      onSubmitSuccess();
    } catch (error: any) {
      console.error("Error saving partner:", error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Houve um erro ao salvar os dados",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glow-card p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Revendedor*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome da loja ou empresa" 
                      className="bg-bats-dark/50 border-bats-blue/30 focus:border-bats-yellow"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoria */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full h-10 px-3 py-2 rounded-md bg-bats-dark/50 border border-bats-blue/30 focus:border-bats-yellow text-white"
                      {...field}
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Supermercado">Supermercado</option>
                      <option value="Farmácia">Farmácia</option>
                      <option value="Conveniência">Loja de Conveniência</option>
                      <option value="Academia">Academia</option>
                      <option value="Distribuidor">Distribuidor</option>
                      <option value="Restaurante">Restaurante</option>
                      <option value="Bar">Bar</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Endereço */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Rua, número e complemento" 
                      className="resize-none bg-bats-dark/50 border-bats-blue/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bairro */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome do bairro" 
                      className="bg-bats-dark/50 border-bats-blue/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cidade */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome da cidade" 
                      className="bg-bats-dark/50 border-bats-blue/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado*</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full h-10 px-3 py-2 rounded-md bg-bats-dark/50 border border-bats-blue/30 focus:border-bats-yellow text-white"
                      {...field}
                    >
                      <option value="">Selecione um estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CEP */}
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="00000-000" 
                      className="bg-bats-dark/50 border-bats-blue/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(00) 00000-0000" 
                      className="bg-bats-dark/50 border-bats-blue/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Google Maps URL */}
            <FormField
              control={form.control}
              name="googleMapsUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Google Maps</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://maps.google.com/..." 
                      className="bg-bats-dark/50 border-bats-blue/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coordenadas */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="-23.550520" 
                        className="bg-bats-dark/50 border-bats-blue/30"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="-46.633308" 
                        className="bg-bats-dark/50 border-bats-blue/30"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Status e Destaque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="bg-bats-dark data-[state=checked]:bg-bats-yellow data-[state=checked]:text-black"
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Destacar na página principal
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="bg-bats-dark data-[state=checked]:bg-green-500 data-[state=checked]:text-black"
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Revendedor ativo
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-4 border-t border-gray-800 flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-bats-yellow to-bats-blue hover:from-bats-yellow/90 hover:to-bats-blue/90 text-black font-bold"
            >
              {isSubmitting ? "Salvando..." : isEditing ? "Atualizar Revendedor" : "Adicionar Revendedor"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PartnerForm;
