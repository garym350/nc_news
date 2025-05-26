import React, { useState, useContext } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { UserContext } from "../Contexts/UserContext";

const CommentCard = ({
  comment,
  onDelete,
  onSubmit,
  isDeleting,
  isSubmitting,
  showForm,
  onToggleForm
}) => {
  const { user } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");

  const handleCommentDelete = (e) => {
    e.preventDefault();
    onDelete(comment.comment_id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment, comment.comment_id);
      setNewComment(""); 
    }
  };

  return (
    <div className="comment-card">
      <h2>{comment.title}</h2>
      <p>Written by {comment.author}</p>
      <p>
        Published on:{" "}
        {new Date(comment.created_at).toLocaleDateString("en-GB")}
      </p>

      <Scrollbar style={{ height: "150px" }} axis="y">
        {comment.body}
      </Scrollbar>

      <p></p>

      <button onClick={onToggleForm} disabled={isSubmitting}>
        Have your say
      </button>

      <p></p>

      <button className="btn btn-primary">Votes: {comment.votes}</button>

      <button
        onClick={handleCommentDelete}
        disabled={user.username !== comment.author || isDeleting}
      >
        Delete Comment
      </button>

      <p></p>

      {showForm && (
        <form onSubmit={handleCommentSubmit}>
          <label>
            Comment:
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
          </label>
          <button type="submit" disabled={isSubmitting || !newComment.trim()}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentCard;
