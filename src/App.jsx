import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ArticleCard from "./Components/ArticleCard";
import CommentList from "./Components/CommentList";
import ArticleList from "./Components/ArticleList";
import CommentCard from "./Components/CommentCard";


function App() {
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({"article_id": 1,
    "title": "Running a Node App",
    "topic": "coding",
    "author": "jessjelly",
    "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
    "created_at": "2020-11-07T06:03:00.000Z",
    "votes": 0,
    "article_img_url": "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"});

  const [comment, setComment] = useState({
      "comment_id": 89,
      "votes": 2,
      "created_at": "2020-10-24T07:08:00.000Z",
      "author": "cooljmessy",
      "body": "Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum.",
      "article_id": 1
    })

  return (
    <Routes>
      <Route path="/" element={<Home article={article}/>} />
      <Route path="/articles/" element={<ArticleList articles={articles} setArticles={setArticles} />} />
      <Route path="/articles/:article_id" element={<ArticleCard article={article} setArticle={setArticle}/>} />
      <Route path="/comments/:article_id" element={<CommentList comments={comments} setComments={setComments} article={article} />} />
      <Route path="/comment/:comment_id" element={<CommentCard comment={comment} />} />
    </Routes>
  );
}

export default App;
