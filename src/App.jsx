import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ArticleCard from "./Components/ArticleCard";
import CommentList from "./Components/CommentList";
import ArticleList from "./Components/ArticleList";
import CommentCard from "./Components/CommentCard";
import CommentsPage from "./Components/CommentsPage";
import TopicsPage from "./Components/TopicsPage";
import TopicsArticlesPage from "./Components/TopicsArticlesPage" 
import { UserProvider } from "./Contexts/UserContext";
import ArticlePage from "./Components/ArticlePage";

function App() {
  
  // const [article, setArticle] = useState({"article_id": 1,
  //   "title": "Running a Node App",
  //   "topic": "coding",
  //   "author": "jessjelly",
  //   "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
  //   "created_at": "2020-11-07T06:03:00.000Z",
  //   "votes": 0,
  //   "article_img_url": "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700"});


  return (
      <UserProvider>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/" element={<ArticleList />} />
      <Route path="/articles/:article_id" element={<ArticleCard />} />
      <Route path="/comments/:article_id" element={<CommentList />} />
      <Route path="/comment/:comment_id" element={<CommentCard />} />
      <Route path="/commentspage/:article_id" element={<CommentsPage />} />
      <Route path="/topics/" element={<TopicsPage />} /> 
      <Route path="/topics/:topic" element={<TopicsArticlesPage />} /> 
      <Route path="/article/:article_id" element={<ArticlePage />}></Route>
      </Routes>
      </UserProvider>
  );
}

export default App;
