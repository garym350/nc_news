import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ncNewsAPI from "../api";
import { Scrollbar } from "react-scrollbars-custom";



const ArticleCard = ({article}) => {

const [error, setError] = useState(null)
const [articleVotes, setArticleVotes] = useState(article.votes);

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
      <button>Comments: 10</button>
      <p></p>
      <button onClick={handleVotes}>Votes: {articleVotes} - click to vote</button>
    </div>
  );
};
export default ArticleCard;
