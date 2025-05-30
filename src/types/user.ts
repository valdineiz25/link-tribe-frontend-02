
export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  state: string;
  city: string;
  avatar?: string;
  coverImage?: string;
  isVerified: boolean;
  totalEarnings: number;
  activeLinks: number;
  totalClicks: number;
  joinedAt: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  state: string;
  city: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  topEarners: User[];
}
