
import React, { useEffect, useState} from "react"
import { useParams } from "react-router"
import ncNewsAPI from "../api"
import {Scrollbar } from 'react-scrollbars-custom';

const ArticleCard = () => {
const {article_id}=useParams(); // gives access to parameters defined in url

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
const [article, setArticle] = useState({})

console.log(article_id, "<==== article id passed into articlecard")


useEffect(()=>{
    ncNewsAPI.get(`/api/articles/${article_id}`)
    .then((res)=>{
        setArticle(res.data.article)
        setLoading(false)
    })
        .catch((err)=>{
            console.error("Error fetching data:", err);
            setError("Failed to load article...");
        })
},[])


if (loading){
  return <p>Loading...</p>
}
    return(<>
            <h2> { article.title } </h2>
            <p>Written by { article.author} </p>
            <img src = {article.article_img_url} alt="Article image" className="article-image" />
            <p>Published on: {new Date(article.created_at).toLocaleDateString("en-GB")}</p>
            <Scrollbar style={{height: '150px'}} axis="y">
                {article.body}
            </Scrollbar>
            <p></p>
            <button>Comments: 10</button><p></p>
            <button>Votes: {article.votes}</button>

            </>)
}
export default ArticleCard;