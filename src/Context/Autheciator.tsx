
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import type { ReactNode } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useUserStore } from "../lib/userStore";

type User = {
  uid: string;
  email: string | null;
  profilePic?: string;
  username?: string;
  profileDetails?: string;
  backgroundCover?: string;
  createdAt?: string;
  bio?: string;
};

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  updateUserProfile: async () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
    const { isLoading, fetchUserInfo} = useUserStore()

    
        useEffect(() => {
      if (currentUser) {
        fetchUserInfo(currentUser.uid);
      } else {
        fetchUserInfo(null);
      }
    }, [currentUser]);
    
    


  // track user login state automatically
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed, user:", user);
      fetchUserInfo(user?.uid ?? null)
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
  const userData = userDoc.data();

  setTimeout(() => {
    setCurrentUser({
      uid: user.uid,
      email: user.email,
      username: userData.username,
      profilePic: userData.profilePic,
      createdAt: user.metadata.creationTime
    });
  }, 1500);
}
else {
          // CREATE THE MISSING PROFILE
          const defaultProfile = {
            email: user.email,
            username: user.email?.split('@')[0] || 'user',
            profilePic: ''
          };
          
          await setDoc(userDocRef, defaultProfile);
          
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            username: defaultProfile.username,
            profilePic: defaultProfile.profilePic,
            createdAt: user.metadata.creationTime
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setCurrentUser({ uid: user.uid, email: user.email });
      }
    } else {
      setCurrentUser(null);
    }
  });
  return unsubscribe;
}, []);

  // real Firebase login
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) {
      throw new Error("No user logged in");
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, updates);
      setCurrentUser({
        ...currentUser,
        ...updates
      });

      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw error;
    }
  };
      if(isLoading) return <div className="loading">Loading...</div>
  return (
    <AuthContext.Provider value={{ currentUser, login, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
//