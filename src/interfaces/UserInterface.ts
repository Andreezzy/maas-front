export interface UserInterface {
  id: number;
  name: string;
  avatar: string;
  color: string;
  imageUrl: string | null;
  isAuthenticated?: boolean;
}