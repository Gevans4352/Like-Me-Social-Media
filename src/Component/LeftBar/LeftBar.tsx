import React, { useContext } from "react";
import "./LeftBar.scss";
import 我 from "./WhatsApp Image 2025-05-12 at 10.29.12 AM.jpeg";
import 用户 from "../../assets/User.svg";
import 朋友 from "../../assets/friendsssssssss.svg"
import 小组 from "../../assets/Group.svg";
import 市场 from "../../assets/market.svg";
import 电视 from "../../assets/tv.svg";
import 秒表 from "../../assets/stopWatch.svg";
import 日历 from "../../assets/Calendar.svg";
import 游戏 from "../../assets/games.svg";
import 相册 from "../../assets/Gallery.svg";
import 视频 from "../../assets/videoCamera.svg";
import 消息 from "../../assets/Message.svg";
import actualgroup from "../../assets/groups.svg"
import 教程 from "../../assets/Untitled (2).svg";
import 已报 from "../../assets/Saved.svg";
import { AuthContext } from "../../Context/Autheciator";


const LeftBar = ()=>{

   const { currentUser } = useContext(AuthContext);
    return(
        <div className="leftBar">
           <div className="container">
            <div className="menu">
                <div className="user">
                     <img src={我} alt="profile pic" />
                    <span>{currentUser?.name}</span>
                </div>
                <div className="item">
                   <img src={朋友} alt="friends"  width="20px"/> 
                   <span>Friends</span>
                </div>
                <div className="item">
                   <img src={actualgroup} alt="Group(s)" width="20px"/> 
                   <span>Group(s)</span>
                </div>
                <div className="item">
                   <img src={市场} alt="Market Place"  width="20px"/> 
                   <span>Market Place</span>
                </div>
                <div className="item">
                   <img src={电视} alt="Watch"  width="20px"/> 
                   <span>Watch</span>
                </div>
                <div className="item">
                   <img src={秒表} alt="Memories" width="20px"/> 
                   <span>Memories</span>
                </div>
                <hr />
                <div className="menu">
                    <span>Shortcuts</span>
                    <div className="item">
                   <img src={日历} alt="Event(s)"  width="20px"/> 
                   <span>Event(s)</span>
                </div>
                <div className="item">
                   <img src={游戏} alt="Gaming" width="20px"/> 
                   <span>Gaming</span>
                </div>
                <div className="item">
                   <img src={相册} alt="Gallery"  width="20px"/> 
                   <span>Gallery</span>
                </div>
                <div className="item">
                   <img src={视频} alt="Videos"  width="20px"/> 
                   <span>Videos</span>
                </div>
                <div className="item">
                   <img src={消息} alt="Message(s)"  width="20px"/> 
                   <span>Message(s)</span>
                </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                     <div className="item">
                   <img src={小组} alt="Fundraiser" width="30px" color="#7A867C"/> 
                   <span>Fundraiser</span>
                </div>
                <div className="item">
                   <img src={教程} alt="Tutorial"  width="30px"/> 
                   <span>Tutorial</span>
                </div>
                <div className="item">
                   <img src={已报} alt="Saved" width="20px"/> 
                   <span>Saved</span>
                </div>
                </div>
            </div>
           </div>
        </div>
    );
}

export default LeftBar;