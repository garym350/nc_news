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
