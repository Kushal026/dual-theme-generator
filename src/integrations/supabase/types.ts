export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      colleges: {
        Row: {
          courses: string[] | null
          created_at: string | null
          description: string | null
          fees: string | null
          id: string
          image_url: string | null
          location: string
          name: string
          ranking: number | null
          streams: string[]
          type: string
          website: string | null
        }
        Insert: {
          courses?: string[] | null
          created_at?: string | null
          description?: string | null
          fees?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          ranking?: number | null
          streams?: string[]
          type: string
          website?: string | null
        }
        Update: {
          courses?: string[] | null
          created_at?: string | null
          description?: string | null
          fees?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          ranking?: number | null
          streams?: string[]
          type?: string
          website?: string | null
        }
        Relationships: []
      }
      exams: {
        Row: {
          created_at: string | null
          description: string | null
          exam_date: string | null
          exam_type: string | null
          id: string
          name: string
          registration_end: string | null
          registration_start: string | null
          streams: string[] | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          exam_date?: string | null
          exam_type?: string | null
          id?: string
          name: string
          registration_end?: string | null
          registration_start?: string | null
          streams?: string[] | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          exam_date?: string | null
          exam_type?: string | null
          id?: string
          name?: string
          registration_end?: string | null
          registration_start?: string | null
          streams?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          college_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          college_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          college_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          class: string
          created_at: string | null
          id: string
          location: string | null
          name: string
          stream: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          class?: string
          created_at?: string | null
          id?: string
          location?: string | null
          name: string
          stream?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          class?: string
          created_at?: string | null
          id?: string
          location?: string | null
          name?: string
          stream?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          amount: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          eligibility: string | null
          id: string
          name: string
          streams: string[] | null
          website: string | null
        }
        Insert: {
          amount?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          name: string
          streams?: string[] | null
          website?: string | null
        }
        Update: {
          amount?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          name?: string
          streams?: string[] | null
          website?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
