
import React, { useEffect, useState } from "react";
import ncNewsAPI from "../api";


const useArticleComments = (article_id) =>{

  const [comments, setComments] = useState(null)
  const [errorComments, setErrorComments] = useState(null)
  const [loadingComments, setLoadingComments] = useState(null)

     useEffect(() => {
      ncNewsAPI
      .get(`api/articles/${article_id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
        setCommentsLoading(false);
      })
      .catch((err) => {
        setLoadingComments(false);
      });
  }, [article_id]);

  if (loadingComments){<div>Loading...</div>}
  if (errorComments){<div style={{ color:"red"}}>LOADING ERROE</div>}

  return{errorComments, loadingComments, comments};

}

export default useArticleComments