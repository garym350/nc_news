
import React, { useEffect, useState} from "react"
import { useParams } from "react-router"

const ArticleCard = () => {
const {article_id}=useParams(); // gives access to parameters defined in url

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
    return(<>
            <h2>ARTICLE CARD - user {article_id}</h2>
            </>)
}
export default ArticleCard;