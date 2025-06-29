import "./Post.scss";
import React, { useState } from "react";
import girl from "./09a097ae-5ccc-4484-849f-e3d9e6599060.jpg";
import boy from "./Cute black boy.jpg";
import gurl from "./Girl.jpg";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import smt from "./abaccf68-af9c-4322-8ea0-ae54150d3461.jpg";
import aesthetics from "./2014 aesthetic.jpg";
import joeGoldberg from "./joe Goldberg  Penn Badgley.jpg";
import badDescison from "./When you’re panicked and afraid, it's the worst….jpg";
import mainEnergy from "./ㅤ♡ྀི ₊ serving you a cutie midweek mood….jpg";
import { Link } from "react-router-dom";
import Posties from "../Posts/Posts";
import badass from "./2795745-uhd_3840_2160_25fps.mp4";
import Comments from "../Comments/Comments";

const allPost = [
  {
    id: 1,
    name: "Tanisha Colbert",
    userId: 1,
    profilePic: gurl,
    desc: "this post has main character energy and knows it",
    img: mainEnergy,
  },
  {
    id: 2,
    name: "Vinnie Laryn",
    userId: 2,
    profilePic: boy,
    desc: "i can’t explain it but this post feels like 2014 Tumblr and iced coffee",
    img: aesthetics,
  },
  {
    id: 3,
    name: "Kingsley Ramon",
    userId: 3,
    profilePic: girl,
    desc: "this post is sponsored by impulsive decisions and a playlist at 2am",
    img: badDescison,
  },
  {
    id: 4,
    name: "Guinevere Beck",
    userId: 4,
    profilePic: smt,
    desc: "POV: you’re obsessed and it’s justified 😌",
    img: joeGoldberg,
  },
  {
    id: 5,
    name: "Guinevere Beck",
    userId: 5,
    profilePic: girl,
    desc: "too online to function rn ♡ྀི",
  },
  {
    id: 6,
    name: "Jason Meyers",
    userId: 6,
    profilePic: gurl,
    desc: "You like what you see huh??",
    vid: badass,
  },
];

interface PostProps {
  post: {
    id: number;
    name: string;
    userId: number;
    profilePic: string;
    desc: string;
    img?: string;
    vid?: string;
  };
}

const Posts = ({ post }: PostProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [likedComment, setLikedComment] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

const handleClick = (e: any) => {
  setLikedComment(!likedComment);
  setIsAnimating(true);
  setTimeout(() => setIsAnimating(false), 300);
};

  //TEMPORARY STUFFS!

  return (
    <div className="posts">
      {allPost.map((post) => (
        <div className="post">
          <div className="container">
            <div className="user">
              <div className="userInfo">
                <MoreHorizOutlinedIcon />
                <img src={post.profilePic} alt="" />
                <div className="details">
                  <Link
                    to={`/profile/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="name">{post.name}</span>
                  </Link>
                  <span className="date">Location</span>
                  <span className="date">1 min ago</span>
                </div>
              </div>
            </div>
            <div className="content">
              <p>{post.desc}</p>
              {post.img && <img src={post.img} alt="post content" />}
              {post.vid && <video src={post.vid} controls width="100%" />}
            </div>
            <div className="info">
              <div
                className={`item ${isAnimating ? "pop" : ""}`}
                onClick={handleClick}
                style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              >
                {likedComment ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </div>
              <div
                className="item"
                onClick={() => setCommentOpen(!commentOpen)}
              >
                <TextsmsOutlinedIcon />
              </div>

              {/* <div onClick ={(e:any)=>setLikedComment(!liked)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {liked ? (<FavoriteOutlinedIcon />) : (<FavoriteBorderOutlinedIcon />)}
               </div> */}
              <div className="item">
                <SendOutlinedIcon />
              </div>
            </div>
            {commentOpen && <Comments />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
