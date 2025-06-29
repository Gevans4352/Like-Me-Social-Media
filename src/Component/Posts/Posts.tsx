//  vite
import "./Posts.scss"
// import Posties from "../Post/Post";
import girl from "./09a097ae-5ccc-4484-849f-e3d9e6599060.jpg";
import boy from "./Cute black boy.jpg";
import gurl from "./Girl.jpg";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import smt from "./abaccf68-af9c-4322-8ea0-ae54150d3461.jpg";
import aesthetics from "./2014 aesthetic.jpg";
import joeGoldberg from "./joe Goldberg  Penn Badgley.jpg";
import badDescison from "./When you’re panicked and afraid, it's the worst….jpg";
import mainEnergy from "./ㅤ♡ྀི ₊ serving you a cutie midweek mood….jpg";
import { Link } from "@mui/material";
import Post from "../Post/Post";

const Posts = () => {

    const allPost = [
        {
            id: 1,
            name: "Tanisha Colbert",
            userId: 1,
            profilePic: gurl,
            desc: "this post has main character energy and knows it",
            img: mainEnergy
        }, 
        {
            id: 2,
            name: "Vinnie Laryn",
            userId: 2,
            profilePic: boy,
            desc: "i can’t explain it but this post feels like 2014 Tumblr and iced coffee",
            img: aesthetics
        }, 
        {
            id: 3,
            name: "Kingsley Ramon",
            userId: 3,
            profilePic: girl,
            desc: "this post is sponsored by impulsive decisions and a playlist at 2am",
            img: badDescison
        }, 
        {
            id: 4,
            name: "Guinevere Beck",
            userId: 4,
            profilePic: smt,
            desc: "POV: you’re obsessed and it’s justified 😌",
            img: joeGoldberg
        }, 
        {
            id: 5,
            name: "Guinevere Beck",
            userId: 5,
            profilePic: girl,
            desc: "too online to function rn ♡ྀི"
        }, 
    ];

    return (
    <div className="posts">
        {allPost.map(post =>(
            <Post key={post.id} post={post} />
        ))}
    </div>
);
}
export default Posts;