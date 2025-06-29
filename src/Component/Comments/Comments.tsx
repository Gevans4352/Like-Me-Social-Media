import "./Comments.scss"
import cinanmonroll from "./d14035ae-b451-4268-8d32-3b9bde16b4dd.jpg";
import mememe from "./(not mine).jpg";
import slay from "./namjoon i love my boyfriend icon.jpg"
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Autheciator";
import useCreateDate from "../UseCreateDate";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
interface Comment {
    id: number;
    desc: string;
    userId?: number;
    name?: string;
    profilePic?: string;
    date?: string;
    details?: string;
}

const commentId = 0;

const Comments = ()=>{
    const {currentUser} = useContext(AuthContext)
    const [details, setDetails] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const date = useCreateDate();
    const navigate = useNavigate();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(details){
           const newComment: Comment = {
                id: comments.length + 1, 
                desc: details, 
                userId: currentUser?.id || 0,
                name: currentUser?.name || "Anonymous",
                profilePic: currentUser?.profilePic,
                date: date
            };
              setComments([...comments, newComment]);

              setDetails('');
            navigate('/');
        }
    }

    const handleEdits = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(memo){
            const newEdits: Comment = {
                id: comments.length,
                desc: details,
                userId: currentUser?.id || 0,
                name: currentUser?.name || "Anonymous",
                profilePic: currentUser?.profilePic,
                date: date
            };
            setComments([...comments, newEdits]);

            setMemo('');

        }
    }

    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            desc: "You didn’t eat. You devoured. You turned the table into crumbs.",
            userId: 1,
            name: "Isaac Wylers",
            profilePic: slay
        },
        {
            id: 2,
            desc: "This outfit slays so hard, I need emotional support.",
            userId: 2,
            name: "道明寺",
            profilePic: mememe
        },
        {
            id: 3,
            desc: "This is so uncalled for and yet so necessary.",
            userId: 3,
            name: "가을",
            profilePic: cinanmonroll
        },
    ]

)

const [editComment, setEditComment] = useState<number | null>(null);

const showPopUp = (commentId: number) => {
    setEditComment(commentId);
};

const removePopUp = () => {
    setEditComment(null);
};

const handleDelete = (id: number) =>{
     if(window.confirm('Are you sure you want to delete your comment?')) {
            const newComment = comments.filter(item => item.id !== id);
            setComments(newComment);
            navigate('/');
        }
}
    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser?.profilePic} alt="Current user profile pic" />
                <textarea placeholder="Add Comments..." value={details} onChange={(e)=> setDetails(e.target.value)} required></textarea>
                <button className="emojiButton"><EmojiEmotionsOutlinedIcon/></button>
                <button onClick={handleSubmit}>Send!</button>
            </div>
          {comments.map(comment =>(
            <div className="comment">
                <img src={comment.profilePic} alt="Comment profile pic" />
                <div className="info">
                    <div className="header">
                        <Link to="#" className="name">
                            <span>{comment.name}</span>
                        </Link>
                   <div className="actions">
                   <button  onClick={() => handleDelete(comment.id)}><DeleteIcon/></button>
                   <div className="splash">
                       <button id="modal" onClick={()=> showPopUp(commentId)}><EditIcon/></button>
                       {editComment === commentId && (
                       <div className="others" id="format">
                        <form className="editMe">
                            <div className="cancel">
                            <button type="button" onClick={removePopUp} ><CancelIcon/></button>
                            </div>
                            <textarea placeholder="Edit your comment..." value={memo} onChange={(e) => setMemo(e.target.value)}></textarea>
                            <div className="save">
                            <button type="submit" onClick={() => handleEdits}>SAVE</button>
                            </div>
                        </form>
                       </div>
                       )}
                   </div>
                   </div>
                    </div>
                <span className="date"> {comment.date || "1 hour ago"}</span>
                   <p>{comment.desc}</p>
                </div>
            </div>
        ))}
      </div>
    );
}

export default Comments;