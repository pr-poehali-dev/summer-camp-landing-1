export const ADMIN_URL = "https://functions.poehali.dev/4fc3a949-19b1-496b-9b78-f0fe9d34a3d0";
export const TOKEN_KEY = "rd_admin_token";

export interface Review {
  id: number;
  parent_name: string;
  child_name: string | null;
  rating: number;
  text: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Application {
  id: number;
  full_name: string;
  age: string | null;
  phone: string;
  email: string | null;
  about: string | null;
  experience: string | null;
  created_at: string;
}

export interface Stats {
  pending_reviews: number;
  approved_reviews: number;
  applications: number;
}

export type ReviewFilter = "pending" | "approved" | "rejected" | "all";
export type AdminTab = "reviews" | "applications";
