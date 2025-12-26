import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { User } from "@shared/schema";

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: SUPABASE_URL and SUPABASE_ANON_KEY are required"
  );
}

// Create server-side Supabase client with service role key for admin operations
// This bypasses Row Level Security (RLS) policies
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Create client-side Supabase client with anon key
// This respects Row Level Security (RLS) policies
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database table names
export const USERS_TABLE = "users";

// Type for database user (matches Supabase table structure)
export type DatabaseUser = {
  id: string;
  username: string;
  password: string;
  created_at?: string;
  updated_at?: string;
};

// Helper function to get the appropriate Supabase client
// Use admin client for server-side operations that need to bypass RLS
export function getSupabaseClient(useAdmin = false): SupabaseClient {
  if (useAdmin && supabaseAdmin) {
    return supabaseAdmin;
  }
  return supabase;
}

