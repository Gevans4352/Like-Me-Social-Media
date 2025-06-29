import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import me from "../Context/Vibrant Beauty in Natural Light.png";

type User = {
  id: number;
  name: string;
  profilePic: string;
};

interface AuthContextType {
  currentUser: User | null;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = () => {
    setCurrentUser({
      id: 1,
      name: "Feranmi",
      profilePic: me
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log("User value updated in localStorage:", currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
