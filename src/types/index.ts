
// Custom types for our application
import { Database } from "@/integrations/supabase/types";

// Convenience types from the generated Supabase types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Professional = Database['public']['Tables']['professionals']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];

// Extended types with additional properties
export interface ProfessionalWithCategory extends Professional {
  profile?: Profile;
  categories?: Category;
  distance?: number;
  rating?: number;
}

export interface BookingWithDetails extends Booking {
  professional?: Professional;
  client?: Profile;
}

export interface ReviewWithDetails extends Review {
  client?: Profile;
}
