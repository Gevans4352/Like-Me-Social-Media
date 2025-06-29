import "./Stories.scss"
import React, { useContext, useState } from "react"
import boy from "./09a097ae-5ccc-4484-849f-e3d9e6599060.jpg";
import boys from "./Cute black boy.jpg";
import guy from "./abaccf68-af9c-4322-8ea0-ae54150d3461.jpg";
import gurlie from "./c787faa8-06ab-4f52-b6d7-fc24da1fdcf7.jpg";
import girlie from "./cd66c191-a237-401c-8e96-737ad2e89c62.jpg";
import gurlll from "./girls.jpg";
import { AuthContext } from "../../Context/Autheciator";


const Stories = ()=>{

    const {currentUser} = useContext(AuthContext)

    //TEMPORARY DATA 
    const stories = [
    {   id: 1,
        name: "Katrina Meyers",
        pics: gurlie
    },
    {
        id: 2,
        name: "Noah Nelson",
        pics: guy
    },
    {
        id: 3,
        name: "Treasure Sailor",
        pics: girlie
    },
    {
        id: 4,
        name: "Damilola Damain",
        pics: boys
    }
    ]

return(
    <div className="Stories">
         <div className="story">
            <img src={currentUser?.profilePic} alt="story image" />
            <span>{currentUser?.name}</span>
            <button>+</button>
        </div>
       {stories.map(story=>(
        <div className="story" >
            <img src={story.pics} alt="story image" />
            <span>{story.name}</span>
        </div>
       ))} 
    </div>
)

}


export default Stories;












