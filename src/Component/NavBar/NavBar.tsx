import React, { useEffect, useState } from "react";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import "./NavBar.scss";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Grid3x3OutlinedIcon from '@mui/icons-material/Grid3x3Outlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from "react-router-dom";
import me from "./WhatsApp Image 2025-05-12 at 10.29.12 AM.jpeg";
import "../../style.scss";
import { useContext } from "react";
import { AuthContext } from "../../Context/Autheciator";
import { DarkModeContext } from "../../Context/DarkModeContext";

const NavBar = ()=>{

const { darkMode, toggle } = useContext(DarkModeContext)
const { currentUser } = useContext(AuthContext);
 const [viewedComment, setViewedComment] = useState(false);
 const [search, setSearch] =  useState<string>('');

 const handleNotifications  = (e: any) => {
  setViewedComment(!viewedComment);
 }

const keyDownHandler = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "k") {
    console.log("You just pressed Control and K!");
  }
};

useEffect(() => {
  window.addEventListener("keydown", keyDownHandler);
  return () => {
     window.removeEventListener("keydown", keyDownHandler);
  };
});
 

    return(
        <div className="navBar">
            <div className="left">
                <Link to="/" style={{textDecoration: "none"}}>
                  <span>Likeme!</span>
                </Link>
                <AddHomeOutlinedIcon/>
                <div onClick={toggle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {darkMode ? (
            <WbSunnyOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </div>
                <Link to="/Reels">
                <Grid3x3OutlinedIcon style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}/>
                </Link>
                <div className="search" >
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search anything..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="right">
                <EmailOutlinedIcon/>
                <Link to="/ChatBox">
                <ChatBubbleOutlineOutlinedIcon/>
                </Link>
                <div className="notification">
                    <div onClick={handleNotifications} className="notifications" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {viewedComment ? (
                        <NotificationsNoneOutlinedIcon/>
                    ) : (
                        <NotificationsActiveOutlinedIcon/>
                    )}
                </div>
                </div>
                <Link to="/Profile/:id"> 
                <div className="user">
                    <img src={me} alt="profile pic" />
                    <span>Feranmi</span>
                </div>
                </Link>
                <ArrowDownwardOutlinedIcon className="icon"/>
                 <div className="options">
                    <span>Settings</span>
                    <span>Help and Support</span>
                    <span>Give Feedback</span>
                    <Link to="/Login" className="navLink">
                        <span>Log-out</span>
                    </Link>
                    <p>Privacy . Terms . Cookies . More . Likeme! © 2025</p>
                </div>
            </div>
        </div>
    );
}

export default NavBar;