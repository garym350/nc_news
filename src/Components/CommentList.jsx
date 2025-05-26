import { useEffect, useState, useContext } from "react";
import ncNewsAPI from "../api";
import CommentCard from "./CommentCard";
import ArticleCard from "./ArticleCard";
import Header from "./Header";
import { UserContext } from "../Contexts/UserContext";

const CommentList = ({ article_id }) => {
  const { user } = useContext(UserContext);

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState(null);
  const [commentAdded, setCommentAdded] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [commentBeingDeletedId, setCommentBeingDeletedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCommentFormId, setOpenCommentFormId] = useState(null);

  useEffect(() => {
    ncNewsAPI
      .get(`api/articles/${article_id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        setCommentsLoading(false);
      })
      .catch((err) => {
        setCommentsLoading(false);
        setError(err);
      });
  }, [article_id]);

  
  useEffect(() => {
    ncNewsAPI
      .get(`api/articles/${article_id}`)
      .then((res) => {
        setArticle(res.data.article);
        setArticleLoading(false);
      })
      .catch((err) => {
        setArticleLoading(false);
        setError(err);
      });
  }, [article_id]);

 
  useEffect(() => {
    if (commentAdded) {
      const timer = setTimeout(() => {
        setCommentAdded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [commentAdded]);

  
  useEffect(() => {
    if (commentDeleted) {
      const timer = setTimeout(() => {
        setCommentDeleted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [commentDeleted]);

  const handleCommentDelete = (comment_id) => {
    setCommentBeingDeletedId(comment_id);
    ncNewsAPI
      .delete(`api/comments/${comment_id}`)
      .then(() => {
        setComments((currComments) =>
          currComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setCommentDeleted(true);
        if (openCommentFormId === comment_id) {
          setOpenCommentFormId(null);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setCommentBeingDeletedId(null);
      });
  };

  const handleCommentSubmit = (newComment, comment_id) => {
    setIsSubmitting(true);
    ncNewsAPI
      .post(`api/articles/${article_id}/comments`, {
        username: user.username,
        body: newComment,
      })
      .then((res) => {
        setComments((curComments) => [res.data.comment, ...curComments]);
        setCommentAdded(true);
        setOpenCommentFormId(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const toggleCommentForm = (comment_id) => {
    setOpenCommentFormId((prev) => (prev === comment_id ? null : comment_id));
  };

  if (commentsLoading) return <p style={{ color: "orange" }}>Loading comments...</p>;
  if (articleLoading) return <p style={{ color: "orange" }}>Loading article...</p>;
  if (error) return <p style={{ color: "red" }}>ERROR: {String(error)}</p>;

  return (
    <>
      <Header />
      <h2>Comment List for Article "{article.title}"</h2>
      <ArticleCard article={article} />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {comments.map((comment) => (
          <li key={comment.comment_id} className="list">
            <CommentCard
              comment={comment}
              onDelete={handleCommentDelete}
              onSubmit={handleCommentSubmit}
              isDeleting={commentBeingDeletedId === comment.comment_id}
              isSubmitting={isSubmitting}
              showForm={openCommentFormId === comment.comment_id}
              onToggleForm={() => toggleCommentForm(comment.comment_id)}
            />
            {commentAdded && <p style={{ color: "green", fontSize: "18px" }}>✅ COMMENT ADDED</p>}
            {commentDeleted && <p style={{ color: "red", fontSize: "18px" }}>❌ COMMENT DELETED</p>}
          </li>
        ))}
      </ul>
     
    </>
  );
};

export default CommentList;
