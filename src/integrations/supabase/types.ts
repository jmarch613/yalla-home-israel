export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      estate_agents: {
        Row: {
          company: string
          created_at: string
          email: string
          first_name: string
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          last_name: string
          password_hash: string
          phone: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_name: string
          password_hash: string
          phone: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_name?: string
          password_hash?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      property_listings: {
        Row: {
          address: string
          air_conditioning: boolean | null
          area: number | null
          balcony: boolean | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          contact_email: string | null
          contact_name: string
          contact_phone: string
          created_at: string
          currency: string | null
          description: string | null
          elevator: boolean | null
          floor_number: number | null
          furnished: boolean | null
          garden: boolean | null
          heating: boolean | null
          id: string
          images: string[] | null
          listing_type: string
          neighborhood: string | null
          parking_spots: number | null
          pets_allowed: boolean | null
          price: number | null
          property_type: string
          status: string
          title: string
          total_floors: number | null
          updated_at: string
          user_id: string | null
          year_built: number | null
        }
        Insert: {
          address: string
          air_conditioning?: boolean | null
          area?: number | null
          balcony?: boolean | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          contact_email?: string | null
          contact_name: string
          contact_phone: string
          created_at?: string
          currency?: string | null
          description?: string | null
          elevator?: boolean | null
          floor_number?: number | null
          furnished?: boolean | null
          garden?: boolean | null
          heating?: boolean | null
          id?: string
          images?: string[] | null
          listing_type: string
          neighborhood?: string | null
          parking_spots?: number | null
          pets_allowed?: boolean | null
          price?: number | null
          property_type: string
          status?: string
          title: string
          total_floors?: number | null
          updated_at?: string
          user_id?: string | null
          year_built?: number | null
        }
        Update: {
          address?: string
          air_conditioning?: boolean | null
          area?: number | null
          balcony?: boolean | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          elevator?: boolean | null
          floor_number?: number | null
          furnished?: boolean | null
          garden?: boolean | null
          heating?: boolean | null
          id?: string
          images?: string[] | null
          listing_type?: string
          neighborhood?: string | null
          parking_spots?: number | null
          pets_allowed?: boolean | null
          price?: number | null
          property_type?: string
          status?: string
          title?: string
          total_floors?: number | null
          updated_at?: string
          user_id?: string | null
          year_built?: number | null
        }
        Relationships: []
      }
      scraped_properties: {
        Row: {
          address: string | null
          area: number | null
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          listing_url: string | null
          neighborhood: string | null
          price: string | null
          property_type: string | null
          raw_data: Json | null
          scraped_at: string
          source_website: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          listing_url?: string | null
          neighborhood?: string | null
          price?: string | null
          property_type?: string | null
          raw_data?: Json | null
          scraped_at?: string
          source_website?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          listing_url?: string | null
          neighborhood?: string | null
          price?: string | null
          property_type?: string | null
          raw_data?: Json | null
          scraped_at?: string
          source_website?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scraping_sessions: {
        Row: {
          completed_at: string | null
          completed_pages: number | null
          created_at: string
          credits_used: number | null
          error_message: string | null
          id: string
          properties_found: number | null
          source_url: string
          started_at: string
          status: string
          total_pages: number | null
        }
        Insert: {
          completed_at?: string | null
          completed_pages?: number | null
          created_at?: string
          credits_used?: number | null
          error_message?: string | null
          id?: string
          properties_found?: number | null
          source_url: string
          started_at?: string
          status?: string
          total_pages?: number | null
        }
        Update: {
          completed_at?: string | null
          completed_pages?: number | null
          created_at?: string
          credits_used?: number | null
          error_message?: string | null
          id?: string
          properties_found?: number | null
          source_url?: string
          started_at?: string
          status?: string
          total_pages?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
