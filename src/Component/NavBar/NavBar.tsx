import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import me from "./WhatsApp Image 2025-05-12 at 10.29.12 AM.jpeg";
import "../../style.scss";
import { useContext } from "react";
import { AuthContext } from "../../Context/Autheciator";
import { DarkModeContext } from "../../Context/DarkModeContext";
import homeData from "../../Data/HomeData";

const NavBar = ()=>{
 const [filteredContent, setFilteredContent] = useState<any[]>([]);
 const { darkMode, toggle } = useContext(DarkModeContext)
 const { currentUser } = useContext(AuthContext);
 const [viewedComment, setViewedComment] = useState(false);
 const [search, setSearch] =  useState<string>('');
 const [content, setContent] = useState<any[]>([]); 
 const navigate = useNavigate();
 const [showSearch, setShowSearch] = useState(false);
 const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (location.pathname.includes("games")) {
      setContent(homeData);
    } else {
      setContent([]); 
    }
  }, [location.pathname]);

      useEffect(() => {
    if (!search.trim()) {
      setFilteredContent([]);
      return;
    }

    const results = content.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.age.toString().includes(search.toLowerCase())
    );

    setFilteredContent(results);
  }, [search, content]);
 const handleNotifications  = (e: any) => {
  setViewedComment(!viewedComment);
 }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && search.trim()) {
    const searchText = search.trim();
    const encodedText = encodeURIComponent(searchText);
    const currentPage = location.pathname;
    navigate(`/search-results?query=${encodedText}&from=${currentPage}`);
    setSearch(""); 
  }
};

 useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      console.log("Hey there!");
      searchInputRef.current?.focus();
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);
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
                    <input 
                    ref={searchInputRef}
                    type="search" 
                    placeholder="Search anything..." 
                    value={search} 
                    onChange={(e)=> setSearch(e.target.value)}  
                    spellCheck="true" onKeyDown={handleKeyDown }
                  />
                   {filteredContent.length > 0 && (
                    <div className="searchResults">
                      {filteredContent.slice(0, 8).map((item) => (
                      <div key={item.id} className="search-result-item">
                        <span>{item.name}</span>
                        <span>{item.genre}</span>
                        <span>{item.age}</span>
                      </div>
                      ))}
                      </div>
                    )}
                     <button className="btn" onClick={() => setShowSearch((prevState) => !prevState)}></button>
                     {search && filteredContent.length === 0 && (
                      <p className="emptySearch">
                        No Search Found! 
                      </p>
                    )}
                  </div>
                </div>
               <div className="right">
                <Link to="/ChatBox">
              <EmailOutlinedIcon/>
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
                  <img src={currentUser?.profilePic} alt="profile Picture" />
                  <span>{currentUser?.username}</span>
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