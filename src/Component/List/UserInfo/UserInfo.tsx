import "./UserInfo.scss";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { AuthContext } from "../../../Context/Autheciator";
import { useContext } from "react";
import myPic from "./WhatsApp Image 2025-05-12 at 10.29.12 AM.jpeg"
const UserInfo = ()=>{

    const { currentUser } = useContext(AuthContext);
    return(
        
        <div className="userInfo">
            <div className="user">
                <img src={myPic} alt="profile Picture" />
                <h2>{currentUser?.name} </h2>
            </div>
                <div className="icons">
                   <MoreHorizOutlinedIcon/>
                    <VideocamOutlinedIcon/>
                    <EditOutlinedIcon/>
                </div>
        </div>
    );
}

export default UserInfo;