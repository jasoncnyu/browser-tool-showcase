import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, name?: string) => void;
  signOut: () => void;
  updateName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("localtools-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const signIn = (email: string, _password: string, name?: string) => {
    const u: User = { email, name: name || email.split("@")[0] };
    localStorage.setItem("localtools-user", JSON.stringify(u));
    setUser(u);
  };

  const signOut = () => {
    localStorage.removeItem("localtools-user");
    setUser(null);
  };

  const updateName = (name: string) => {
    if (!user) return;
    const updated = { ...user, name };
    localStorage.setItem("localtools-user", JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateName }}>
      {children}
    </AuthContext.Provider>
  );
};
