
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import ncNewsAPI from "../api";
import { Scrollbar } from "react-scrollbars-custom";

const CommentCard = ({comment}) => {
  
  const [localComment, setLocalComment] = useState(comment);

  return (
    <div className="comment-card">
      <h2> {localComment.title} </h2>
      <p>Written by {localComment.author} </p>
  
      <p>
        Published on: {new Date(localComment.created_at).toLocaleDateString("en-GB")}
      </p>
      <Scrollbar style={{ height: "150px" }} axis="y">
        {localComment.body}
      </Scrollbar>
      <p></p>
      
      <button className="btn btn-primary">Votes: {localComment.votes}</button>
    </div>
  );
};
export default CommentCard;
