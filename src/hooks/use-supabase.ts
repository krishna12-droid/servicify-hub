
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useCallback } from 'react';
import type { ProfessionalWithCategory, Category } from '@/types';

// Hook to fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });
}

// Hook to fetch professionals
export function useProfessionals() {
  return useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals')
        .select(`
          *,
          profiles (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ProfessionalWithCategory[];
    },
  });
}

// Hook to fetch professionals by category
export function useProfessionalsByCategory(categoryId: string | null) {
  return useQuery({
    queryKey: ['professionals', 'category', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      
      const { data, error } = await supabase
        .from('professionals')
        .select(`
          *,
          profiles (*)
        `)
        .eq('category_id', categoryId);
      
      if (error) throw error;
      return data as ProfessionalWithCategory[];
    },
    enabled: !!categoryId,
  });
}

// Hook to search professionals by location
export function useProfessionalsByLocation(lat: number | null, lng: number | null, radius: number = 10) {
  return useQuery({
    queryKey: ['professionals', 'location', lat, lng, radius],
    queryFn: async () => {
      if (lat === null || lng === null) return [];
      
      // First, get the professionals in radius using the RPC function
      const { data: professionalsInRadius, error: rpcError } = await supabase
        .rpc('professionals_in_radius', { 
          latitude: lat,
          longitude: lng,
          radius_in_km: radius
        });
      
      if (rpcError) throw rpcError;
      
      if (!professionalsInRadius || professionalsInRadius.length === 0) {
        return [];
      }
      
      // Get the IDs of professionals within radius
      const professionalIds = professionalsInRadius.map(pro => pro.id);
      
      // Then fetch complete professional data with profiles for those IDs
      const { data: professionals, error } = await supabase
        .from('professionals')
        .select(`
          *,
          profiles (*)
        `)
        .in('id', professionalIds);
      
      if (error) throw error;
      
      // Combine the distance info from professionalsInRadius with the full data
      const result = professionals?.map(professional => {
        const proWithRadius = professionalsInRadius.find(p => p.id === professional.id);
        return {
          ...professional,
          distance: proWithRadius ? undefined : undefined // We'll calculate this in the component
        };
      });
      
      return result as ProfessionalWithCategory[];
    },
    enabled: lat !== null && lng !== null,
  });
}

// Hook to create a booking
export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking created",
        description: "Your booking has been successfully created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating booking",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
