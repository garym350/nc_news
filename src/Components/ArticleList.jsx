import React, { useEffect, useState } from "react";
import ncNewsAPI from "../api";
import ArticleCard from "./ArticleCard";
import Header from "./Header";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([])

  useEffect(() => {
    ncNewsAPI
      .get("api/articles")
      .then((res) => {
        setArticles(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching data:", err);
        setError(true);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>ERROR LOADING</p>;
  }

  return (
    <div className="list">
      <Header />
      <h2>Article List</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {articles.map((article) => (
          <li key={article.article_id} className="list">
             <ArticleCard article={article}/>
            <Link to={`/article/${article.article_id}`}>
              <button>View Article</button>
           </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
