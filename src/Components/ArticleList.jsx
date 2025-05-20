import React, { useEffect, useState} from "react"
import ncNewsAPI from "../api"

const ArticleList = ({setArticles, articles}) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(()=>{
        ncNewsAPI.get("api/articles")
        .then((res)=>{
            setArticles(res.data.articles);
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            console.error("Error fetching data:", err);
            setError("Failed to load articles...");
        })
},[])

if (loading){
  return <p>Loading...</p>
}

return (
  <>
    <h2>Article List</h2>
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {articles.map((article) => (
        <li
          key={article.article_id}
         className="list"
        >
          <h3 style={{ margin: "0.5px" }}>{article.title}</h3>
          <p>Written by {article.author}</p>
        </li>
      ))}
    </ul>
  </>
);
}

export default ArticleList;