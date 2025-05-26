import Header from "./Header"
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ncNewsAPI from "../api";
import ArticleCard from "../Components/ArticleCard"

const TopicsArticlesPage = () => {

const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [articles, setArticles] = useState(null);
const [sortQueryList, setSortQueryList] = useState([["all","all"],["date","created_at"],["Number of comments","comment_count"], ["Number of votes","votes"]])
const [sortOrderList, setSortOrderList] = useState([["ascending", "asc"], ["descending","desc"]])
const [sortQuery, setSortQuery] = useState("all")
const [sortOrder, setSortOrder] = useState("asc")
const {topic} = useParams();

  useEffect(() => {
    setLoading(true)
    setError(false)
    ncNewsAPI
     .get("api/articles", { params: { topic, order: sortOrder, sortBy: sortQuery } })
      .then((res) => {
        setArticles(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching data:", err);
        setError("Failed to load articles...");
      });
  }, [sortOrder, sortQuery, topic]);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>ERROR LOADING</p>;
  }

   return (
    <div>
      <Header />
      <p></p>
      <p style={{ fontWeight:"bold" }}>ARTICLES FOR TOPIC: {topic}</p>
      <div style={{ fontSize:"13px"}}>
Sort By:{" "}
        <select
        onChange={(e) => setSortQuery(e.target.value)}
        value={sortQuery}
      >
        {sortQueryList.map((option) => (
          <option key={option[1]} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </select>

{" "}{" "}{" "}Order:{" "}
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        value={sortOrder}
      >
        {sortOrderList.map((option) => (
          <option key={option[1]} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </select>
      <br /><br />
      
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {articles.map((article) => {
            return(
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TopicsArticlesPage