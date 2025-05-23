import { useEffect, useState } from "react";
import ncNewsAPI from "../api";
import CommentCard from "./CommentCard";
import ArticleCard from "./ArticleCard";
import Header from "./Header"
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const CommentList = ({ article_id }) => {
  const { user } = useContext(UserContext);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState(false);
  const [article, setArticle] = useState(null)

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

  if (commentsLoading) {
    return <p style={{ color: "amber" }}>"Loading comments..."</p>;
  }

  if (articleLoading) {
    return <p style={{ color: "amber" }}>"Loading articles..."</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>ERROR LOADING...{String(error)}</p>;
  }


const handleCommentDelete = (comment_id) => {
  ncNewsAPI
    .delete(`api/comments/${comment_id}`)
    .then(() => {
      setComments((currComments) =>
        currComments.filter((comment) => comment.comment_id !== comment_id)
      );
    })
    .catch((err) => {
      setError(err);
    });
};

const handleCommentSubmit = (newComment) => {
   ncNewsAPI
    .post(`api/articles/${article_id}/comments`,{"username": user.username, "body": newComment} )
    .then((res)=>{
      setComments((curComments)=>[res.data.comment, ...curComments])
      })
    .catch((err)=>{
      console.log("ERROR")
    })
  }

  return (
    <>
    <Header />
      <h2>Comment List for Article "{article.title}"</h2>
      <ArticleCard article={article}/>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {comments.map((comment) => (
          <li key={comment.comment_id} className="list">
            <CommentCard comment={comment}
                        onDelete={handleCommentDelete}
                        onSubmit={handleCommentSubmit}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
