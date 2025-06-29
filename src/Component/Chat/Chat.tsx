import { useContext } from "react";
import { AuthContext } from "../../Context/Autheciator";
import "./Chat.scss";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const Chat = ()=>{
      const { currentUser } = useContext(AuthContext);
    return(
        <div className="chats">
            <div className="top">
                <div className="user">
                    <img src={currentUser?.profilePic} alt="Profile pic" />
                    <div className="texts">
                        <span>{currentUser?.name}</span>
                        <br />
                        <p>bruh i just tried cereal with *orange juice* instead of milk... send help 😭🧃</p>
                    </div>
                </div>
                <div className="userIcons">
                    <LocalPhoneOutlinedIcon/>
                    <VideocamOutlinedIcon/>
                    <InfoOutlinedIcon/>
                </div>
            </div>
            <div className="center"></div>
            <div className="bottom"></div>
        </div>
    );
}

export default Chat;