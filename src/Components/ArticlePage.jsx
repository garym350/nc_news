import { useParams } from "react-router";
import ncNewsAPI from "../api";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import useArticleComments from "./useArticleComments";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [votes, setVotes] = useState(null);
  const [votesUpdating, setVotesUpdating] = useState(null);


  useEffect(() => {
    ncNewsAPI
      .get(`api/articles/${article_id}`)
      .then((res) => {
        setArticle(res.data.article);
        setVotes(res.data.article.votes);
        setLoading(false);
        console.log("DATA FETCHED");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(`ERROR LOADING ARTICLE ${article_id}`);
      });
  }, [article_id]);

  if (loading) {
    return (
      <div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>ERROR LOADING ARTCLE DATA</p>
      </div>
    );
  }

  const handleVotes = () => {
    setVotes((votes) => votes + 1);
    setVotesUpdating(true);
    ncNewsAPI
      .patch(`/api/articles/${article.article_id}`, { inc_votes: 1 })
      .then((response) => {
        setVotesUpdating(false);
        console.log("Vote updated");
      })
      .catch((err) => {
        setVotes((votes) => votes - 1);
        setError("Voting failed...");
      });
  };

  return (
    <div>
      <Header />
      <h2>Article Page</h2>
      <h2>{article.title}</h2>
      <div>{article.body}</div>
      <p>
        Published on: {new Date(article.created_at).toLocaleDateString("en-GB")}
      </p>
      <p>Article id: {article.article_id}</p>
      <Link to={`/commentspage/${article.article_id}`}>
        <button>{article.comment_count} COMMENTS</button>
      </Link>
      <p></p>
      <button onClick={handleVotes} disabled={votesUpdating}>
        Votes: {votes}
      </button>
    </div>
  );
};

export default ArticlePage;
