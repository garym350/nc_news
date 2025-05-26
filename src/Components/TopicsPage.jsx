
import Header from "./Header";
import ncNewsAPI from "../api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("all")
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingTopicsError, setLoadingTopicsError] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingArticlesError, setLoadingArticlesError] = useState(false);
  
  
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    ncNewsAPI
      .get("api/topics")
      .then((response) => {
        setTopics([...response.data.topics,{"slug":"all"}]);
        setLoadingTopics(false);
      })
      .catch((err) => {
        console.log("TOPICS FAILED TO LOAD");
        setLoadingTopicsError(true);
      });
  }, []);

  ///-------

  useEffect(() => {
    ncNewsAPI
      .get("api/articles", { params: {topic}})
      .then((response) => {
        setArticles(response.data.articles);
        console.log("ARTICLES LOADED -->", response.data.articles);
        setLoadingArticles(false);
      })
      .catch((err) => {
        console.log("ARTICLES FAILED TO LOAD");
        setLoadingArticlesError(true);
      });
  }, [topic]);

  //-------------------

  if (loadingTopics) return <p>Loading Topics...</p>;
  if (loadingTopicsError) return <p style={{ color: "red" }}>LOADING TOPICS ERROR</p>;

  if (loadingArticles) return <p>Loading Articles...</p>;
  if (loadingArticlesError) return <p style={{ color: "red" }}>LOADING ARTICLES ERROR</p>;


  return (
    <>
      <Header />
      <h2>Topics Page</h2>

      <select
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      >
        <option value="" disabled>
          Select a topic
        </option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>

      <p style={{fontWeight: "bold"}}>Articles for {topic}</p>

      <Link to={`/topics/${topic}/`}>
      <button>URL: /topics/{topic}/</button>
      </Link>

      <div>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
  {articles.map((article) => (
    <li>
      <ArticleCard article={article}/>
    </li>
  ))}
</ul>
      </div>
    </>
  );
};

export default TopicsPage;
