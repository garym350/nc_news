import { useEffect, useState } from "react";
import ncNewsAPI from "../api";
import CommentCard from "./CommentCard";
import ArticleCard from "./ArticleCard";

const CommentList = ({ setComments, comments, article }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    ncNewsAPI
      .get(`api/articles/${article.article_id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []); /// only runs once, when component mounts - if not added, may cause infinate loop

  if (loading) {
    return <p style={{ color: "amber" }}>"Loading..."</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>ERROR LOADING...{String(error)}</p>;
  }


  return (
    <>
      <h2>Comment List for Article "{article.title}"</h2>
      <ArticleCard article={article}/>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {comments.map((comment) => (
          <li key={comment.comment_id} className="list">
            <CommentCard comment={comment}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
