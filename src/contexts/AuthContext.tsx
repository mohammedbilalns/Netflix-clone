import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import AuthContextType from "../types/authContextType";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function signUp(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const newUser = userCredential.user;
    setUser(newUser);

    await setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }

  async function logIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const loggedInUser = userCredential.user;
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function logOut() {
    await signOut(auth);
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthProvider");
  }
  return context;
}
