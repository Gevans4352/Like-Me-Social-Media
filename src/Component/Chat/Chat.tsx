import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/Autheciator";
import imagehhh from "./imagehhh.jpg"
import "./Chat.scss";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { MdEmojiEmotions } from "react-icons/md";
import { FaCamera } from "react-icons/fa6";
import { IoMdMic } from "react-icons/io";
import { LuGalleryHorizontal } from "react-icons/lu";
import hosk from "./hosk.jpg";
import User from "../../Pages/UserProfile/User";
import useCreateDate from "../../Component/UseCreateDate";
import useGeolocation from "../useCreateLocation";
const Chat = ()=>{
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const endRef = useRef<HTMLDivElement | null>(null);
      const { location, error, loading } = useGeolocation();
    useEffect(()=>{
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    },[])
    const handleEmoji = (e: EmojiClickData) =>{
        setText(prev=> prev + e.emoji)
        setOpen(false)
    }
      const { currentUser } = useContext(AuthContext);
      console.log("Current user:", currentUser);
        if (loading) {
          return <p>Loading location...</p>;
        }
    return(
        <div className="chats">
            <div className="top">
                <div className="user">
                    <div className="texts">
                      <span>{currentUser?.username }</span>
                        <br />
                        <p>{location?.latitude}, {location?.longitude} | {useCreateDate(new Date())}</p>
                    </div>
                </div>
                <div className="userIcons">
                    <LocalPhoneOutlinedIcon/>
                    <VideocamOutlinedIcon/>
                    <InfoOutlinedIcon/>
                </div>
            </div>
<div className="center">
  <div className="message">
    <img src={imagehhh} alt="Profile pic" />
    <div className="text">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elipm.</p>
      <span>1 min ago</span>
    </div>
  </div>

  <div className="message own">
    <img src={imagehhh} alt="Profile pic" />
    <div className="text">
      <img src={hosk} alt="imageSent" className="messageImage"/>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elipm.</p>
      <span>1 min ago</span>
    </div>
  </div>

  <div className="message">
    <img src={imagehhh} alt="Profile pic" />
    <div className="text">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elipm.</p>
      <span>1 min ago</span>
    </div>
  </div>

  <div className="message own">
    <img src={imagehhh} alt="Profile pic" />
    <div className="text">
        <img src={hosk} alt="imageSent" className="messageImage" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elipm.</p>
      <span>1 min ago</span>
    </div>
  </div>

  <div className="message">
    <img src={imagehhh} alt="Profile pic" />
    <div className="text">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elipm.</p>
      <span>1 min ago</span>
    </div>
  </div>
  <div ref={endRef}></div>
</div>
<div className="bottom">
                <div className="iconns">
                    <LuGalleryHorizontal className="anotherSet"/>
                    <FaCamera className="anotherSet"/>
                    <IoMdMic className="anotherSet"/>
                </div>
                <input 
                className="input" 
                type="text"  
                placeholder="Type a message..." 
                value={text} 
                onChange={e=>setText(e.target.value)}/>
                <div className="emoji">
                    <MdEmojiEmotions  className="smileyFace" onClick={()=>setOpen(prev=>!prev)}/>
                        <div className="picker">
                            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
}

export default Chat;