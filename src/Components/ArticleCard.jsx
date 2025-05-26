import React, { useEffect, useState } from "react";
import ncNewsAPI from "../api";
import { useNavigate } from "react-router-dom";
import useArticleComments from "./useArticleComments";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const [articleVotes, setArticleVotes] = useState(article.votes);
  const [numComments, setNumComments] = useState(0);

  // const { errorComments, loadingComments, comments } = useArticleComments;

  // useEffect(() => {
  //   if (comments) {
  //     setNumComments(comments.length);
  //   }
  // });

  // if (loadingComments) {
  //   return <p>Loading...</p>;
  // }
  // if (errorComments) {
  //   return <p style={{ color: "red" }}>ERROR LOADING</p>;
  // }

  let votes = articleVotes;

  const handleVotes = () => {
    votes++;
    setArticleVotes(votes);
    ncNewsAPI
      .patch(`/api/articles/${article.article_id}`, { inc_votes: 1 })
      .then((response) => {})
      .catch((err) => {
        setArticleVotes(votes - 1);
        setError("Voting failed...");
      });
  };

  return (
    <Link to={`/article/${article.article_id}`}>
      <div className="article-card">
        <h2> {article.title} </h2>
        <p>Written by {article.author} </p>
        <img
          style={{ height: "50px", width: "50px" }}
          src={article.article_img_url}
          alt="Article image"
          className="article-image"
        />
        <p></p>
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate(`/commentspage/${article.article_id}`)}
        >
          {article.comment_count} comments
        </button>
        <p></p>
        <button onClick={handleVotes}>
          Votes: {articleVotes} - click to vote
        </button>
      </div>
    </Link>
  );
};
export default ArticleCard;
