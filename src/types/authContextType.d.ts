import { User } from "firebase/auth";

export default interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => Promise<User>;
  logOut: () => Promise<void>;
}
