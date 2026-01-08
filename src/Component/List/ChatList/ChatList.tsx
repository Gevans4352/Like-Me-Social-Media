import "./ChatList.scss";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useEffect, useState } from "react";
import ticktak from "./WhatsApp Image 2025-05-12 at 10.29.12 AM.jpeg"
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { AuthContext } from "../../../Context/Autheciator";
import AddUser from "./AddUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
const ChatList = ()=>{
    type ChatType = {
  [key: string]: any; 
};
    const [addUser, setAddUser] = useState(false);
    const [chats, setChats] = useState<ChatType[]>([]);
    const addinUser = (e: string) => {
    setAddUser(!addUser);
    console.log("clicked");
    
 }
 
 
  const { currentUser } = useContext(AuthContext);
  useEffect(()=>{
      if (!currentUser?.uid) return;
    const unSub = onSnapshot(doc(db, "userchats", currentUser?.uid), (doc) =>{
        console.log("Current data: ", doc.data());
        setChats(doc.data())
        
        return ()=>{
            unSub()
        }
    })
  },[])
   
    return(
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search..."/>
                </div>
                  <button onClick={addinUser} className="addButton" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <div className="addinUser" >
                    {addUser ? (
                         <RemoveOutlinedIcon/>
                    ) : (
                       <AddOutlinedIcon />
                    )}
                </div>
                </button>
            </div>
                <div className="item">
                    <img src={ticktak} alt="avatar" width={50} height={50}/>
                    <div className="textContainer">
                        <span>{currentUser?.name}</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="item">
                    <img src={ticktak} alt="avatar" width={50} height={50}/>
                    <div className="textContainer">
                        <span>{currentUser?.name}</span>
                        <p>Hello</p>
                    </div>
                </div>
                <div className="item">
                    <img src={ticktak} alt="avatar" width={50} height={50}/>
                    <div className="textContainer">
                        <span>{currentUser?.name}</span>
                        <p>Hello</p>
                    </div>
                </div>
                {addUser&& <AddUser/>}
        </div>
    );
}

export default ChatList;