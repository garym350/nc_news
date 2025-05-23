
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

const CommentsPage = () => {

    const { article_id } = useParams()

    return(
        <div>
        <CommentList article_id={article_id} />
    </div>
    )
}

export default CommentsPage;