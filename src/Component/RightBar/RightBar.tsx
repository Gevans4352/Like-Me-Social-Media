
import  { useState, useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import aiPic from "./WhatsApp Image 2025-05-12 at 10.29.12 AM.jpeg";
import "./RightBar.scss"
import randomPerson from "./Vibrant Beauty in Natural Light.png"
import anotherRandomPerson from "./Golden Hour Contemplation.png"
import ferret from "./ferret.jpg";
import weird from "./weird.jpg";
import creepy from "./creepy.jpg"
import girlieImage from "./girlieImage.jpg";


const RightBar = ()=>{
     const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      name: "Melana",
      img: randomPerson,
      followed: false
    },
    {
      id: 2,
      name: "Genny",
      img: anotherRandomPerson,
      followed: false
    },
    {
      id: 3,
      name: "Elyon",
      img: aiPic,
      followed: false
    },
    {
      id: 4,
      name: "Georgia",
      img: randomPerson,
      followed: false
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      username: "Fiona",
      action: "changed their profile pic",
      time: "2 min ago"
    },
    {
      id: 2,
      username: "Alex",
      action: "liked your photo",
      time: "15 min ago"
    },
    {
      id: 3,
      username: "Jordan",
      action: "commented on your post",
      time: "1 hour ago"
    }
  ]);

  const [online, setOnline] = useState([
    {
        id: 1, 
        username: "Diane",
        image: ferret
    },
    {
        id: 2,
        username: "David",
        image: weird
    },
    {
        id: 3,
        username: "Cassie",
        image: girlieImage
    },
    {
        id: 4,
        username: "Gilbert",
        image: creepy
    }
  ])
   
  const handleFollow = (id: number) => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id 
        ? { ...suggestion, followed: !suggestion.followed } 
        : suggestion
    ));
  };
  const handleDismiss = (id: number) => {
    setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Math.random(),
        username: ["Leo", "Maya", "Chris", "Tara"][Math.floor(Math.random() * 4)],
        action: ["liked your photo", "commented on your post", "shared your story", "mentioned you"][Math.floor(Math.random() * 4)],
        time: "just now"
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    const intervals = setInterval(()=>{
        const whoIsOnline = {
            id: Math.random(),
            username: ["Brian", "Gilbert", "Isaac", "Jeremiah", "Sharon", "Diane"][Math.floor(Math.random()*4)],
        };

        setOnline((prev: string | any[]) => [whoIsOnline, ...prev.slice(0,4)]);
    }, 60000);
    return () => clearInterval(intervals);
  })

    return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestions.map(suggestion => (
            <div className="user" key={suggestion.id}>
              <div className="userInfo">
                <img src={suggestion.img} alt={suggestion.name} />
                <span>{suggestion.name}</span>
              </div>
              <div className="buttons">
                <button onClick={() => handleFollow(suggestion.id)}>
                  {suggestion.followed ? 'Following' : 'Follow'}
                </button>
                <button onClick={() => handleDismiss(suggestion.id)}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="item">
          <span>Latest Activities</span>
          {activities.map(activity => (
            <div className="user" key={activity.id}>
              <div className="userInfo">
                <span>{activity.username} {activity.action}</span><p>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
            <span>Online Friends</span>
            {online.map((online: { id: Key | null | undefined; image: string; username: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; })=>(
                <div className="user" key={online.id}>
                    <div className="userInfo">
                        <img src={online.image} />
                        <div className="online"></div>
                        <span>{online.username}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
    }

export default RightBar 






 