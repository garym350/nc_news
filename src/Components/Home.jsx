import "../../src/App.css";
import ArticleList from "./ArticleList";
import { Link } from 'react-router-dom';
import React, { useEffect, useState} from "react"

function Home() {

     const [articles, setArticles] = useState([])
     const [article, setArticle] = useState([])

    useEffect(()=>{
        if(articles.length>0){
        setArticle(articles[0]);}
                },[articles]) /// square brackets - only runs when articles changes
  return (
  <div>
  <h2>HELLO....</h2>
  {article && (
    <Link to={`/article/${article.article_id}`}>Go To Article Page</Link>
  )}
  <ArticleList setArticles={setArticles} articles={articles} />
</div>

  );

}

export default Home;
