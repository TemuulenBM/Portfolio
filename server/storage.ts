import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { getSupabaseClient, USERS_TABLE } from "./supabase";

// Storage interface for database operations
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

// In-memory storage implementation (for development/testing)
export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

// Supabase storage implementation (for production)
export class SupabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const supabase = getSupabaseClient(true); // Use admin client to bypass RLS
    const { data, error } = await supabase
      .from(USERS_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return undefined;
      }
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const supabase = getSupabaseClient(true); // Use admin client to bypass RLS
    const { data, error } = await supabase
      .from(USERS_TABLE)
      .select("*")
      .eq("username", username)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return undefined;
      }
      throw new Error(`Failed to get user by username: ${error.message}`);
    }

    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const supabase = getSupabaseClient(true); // Use admin client to bypass RLS
    const id = randomUUID();
    const userData = {
      id,
      ...insertUser,
    };

    const { data, error } = await supabase
      .from(USERS_TABLE)
      .insert(userData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data as User;
  }
}

// Use Supabase storage if SUPABASE_URL is set, otherwise use in-memory storage
const useSupabase = !!process.env.SUPABASE_URL;
export const storage: IStorage = useSupabase
  ? new SupabaseStorage()
  : new MemStorage();
