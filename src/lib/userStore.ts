import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';
interface UserData {
  uid?: string;
  username?: string;
  email?: string;
  profilePic?: string;
  profileDetails?: string;
  backgroundCover?: string;
}

interface UserStore {
  currentUser: UserData | null;
  isLoading: boolean;
  fetchUserInfo: (uid: string | null) => Promise<void>;
}
export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: any) =>{
    if(!uid){
        return set ({currentUser: null, isLoading: false})
    }
    try{
     const docRef = doc(db, "users", uid);
     const docSnap = await getDoc(docRef);
     if(docSnap.exists()){
        console.log("Document data: ", docSnap.data)
        set({currentUser:docSnap.data(), isLoading: false})
     }else{
        set({currentUser: null, isLoading: false})
     }
    }catch(err){
        console.error(err);
        return set ({currentUser: null, isLoading: false})
    }
  }
}))

