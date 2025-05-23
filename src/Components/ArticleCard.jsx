import React, { useEffect, useState } from "react";
import ncNewsAPI from "../api";
import { Scrollbar } from "react-scrollbars-custom";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({article}) => {
const navigate=useNavigate();
const [error, setError] = useState(null)
const [articleVotes, setArticleVotes] = useState(article.votes);
const [comments, setComments]=useState([])
const [loading, setLoading] = useState(false)
const [numComments, setNumComments] = useState(0)

useEffect(() => {
    setLoading(true)
    ncNewsAPI
      .get(`/api/articles/${article.article_id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        setNumComments(res.data.comments.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching comments data:", err);
        setError("Failed to load articles...");
      });
  }, [article.article_id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>ERROR LOADING</p>;
  }

let votes=articleVotes;

  const handleVotes = () => {
    votes++
    setArticleVotes(votes)
    ncNewsAPI
    .patch(`/api/articles/${article.article_id}`, { inc_votes: 1 })
    .then((response)=>{
      console.log("Vote updated")
    })
    .catch((err)=>{
    setArticleVotes(votes-1)
    setError("Voting failed...")
    })
  }


  
  return (
    <div className="article-card">
      <h2> {article.title} </h2>
      <p>Written by {article.author} </p>
      <img style={{ height: "50px", width: "50px"}}
        src={article.article_img_url}
        alt="Article image"
        className="article-image"
      />
      <p>
        Published on: {new Date(article.created_at).toLocaleDateString("en-GB")}
      </p>
      <p>
        Article id: {article.article_id}
      </p>
      <Scrollbar style={{ height: "150px" }} axis="y">
        BODY
        {article.body}
      </Scrollbar>
      <p></p>

   
      <button
        className="list-group-item list-group-item-action"
        onClick={() => navigate(`/commentspage/${article.article_id}`)}
      >
        {numComments} comments
      </button>
      <p></p>
      <button onClick={handleVotes}>Votes: {articleVotes} - click to vote</button>
    </div>
  );
};
export default ArticleCard;
