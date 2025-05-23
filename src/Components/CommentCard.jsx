
import React, { useEffect, useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const CommentCard = ({comment, onDelete, onSubmit}) => {

  const { user } = useContext(UserContext);
  
  const [showCommentForm, setShowCommentForm]=useState(false)
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [commentAdded, setCommentAdded] = useState(false)

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onSubmit(newComment);
  }

  const handleCommentDelete = (e) => {
  e.preventDefault();
  onDelete(comment.comment_id);
};


  const handleCommentFormButtonClick = () => {
    if(showCommentForm){
      setShowCommentForm(false)
    }
    else(setShowCommentForm(true))
  }

  useEffect(()=>{
    if(commentAdded){
      const timer = setTimeout(()=>{
        setCommentAdded(false);
        setNewComment("")
      }, 6000)
      return () => clearTimeout(timer)
    }
  })

  return (
    <div className="comment-card">
      <h2> {comment.title} </h2>
      <p>Written by {comment.author} </p>
  
      <p>
        Published on: {new Date(comment.created_at).toLocaleDateString("en-GB")}
      </p>
      <Scrollbar style={{ height: "150px" }} axis="y">
        {comment.body}
      </Scrollbar>
      <p></p>

   <button onClick={handleCommentFormButtonClick}
            disabled={isLoading}>
      Have your say
      </button> 
      <p></p>
      <button className="btn btn-primary">Votes: {comment.votes}</button>

<button onClick={handleCommentDelete}
        disabled={user.username !== comment.author}>
      Delete Comment
      </button> 
      <p></p>

  {commentAdded ? <div style={{ color: "green", fontSize: "20px"}}> ✅ COMMENT ADDED</div>:<div></div>}
    
  {showCommentForm &&  
            <form onSubmit={handleCommentSubmit}>
            <label>comments 
            <input type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            />
        </label>
      </form>}

    </div>
  );
};

export default CommentCard;
