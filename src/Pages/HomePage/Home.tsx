import React, { useEffect } from "react";
import "./Home.scss";
import Stories from "../../Component/Stories/Stories";
import Posts from "../../Component/Post/Post";

// import Posts from "../../Component/Posts/Posts";
// import Posts from "../../Component/Post/Post";
const Home =()=>{
     useEffect(() => {
    document.title = "Home";
  }, []);
    return(
        <div className="homePage">
            <Stories/>
            <Posts post={{
                id: 0,
                name: "",
                userId: 0,
                profilePic: "",
                desc: "",
                img: undefined
            }}/>
        </div>
    )
}

export default Home;