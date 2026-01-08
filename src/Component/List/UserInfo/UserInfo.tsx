import "./UserInfo.scss";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { AuthContext } from "../../../Context/Autheciator";
import { useContext } from "react";
import { useUserStore } from "../../../lib/userStore";

const UserInfo = ()=>{

    const { currentUser } = useContext(AuthContext);

    return(
        
        <div className="userInfo">
            <div className="user">
                <img src={currentUser?.profilePic} alt="profile Picture" />
                <h2>{currentUser?.username} </h2>
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