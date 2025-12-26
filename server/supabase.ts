import { createClient } from "@supabase/supabase-js";
import type { User } from "@shared/schema";

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL || "https://btuwfohndxhoqayxqqvc.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "sb_publishable_GvM9icx1fiuN9ScnzrXOlg_Hp1wAtvb";

// For server-side operations, use service role key if available
// Otherwise, use anon key (with RLS policies)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client
// Use service role key for server-side operations if available
export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Database table name
export const USERS_TABLE = "users";

// Type for database user (matches Supabase table structure)
export type DatabaseUser = {
  id: string;
  username: string;
  password: string;
  created_at?: string;
  updated_at?: string;
};

