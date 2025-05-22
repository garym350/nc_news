import "../../src/App.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import ArticleCard from "./ArticleCard";

function Home({ article }) {
  return (
    <div>
      <Header />
      <h2 className="mb-4 text-primary">Welcome to the News App!</h2>
      <div className="list-group">
        <ArticleCard article={article}/>
        {/* <Link to={`/articles/`} className="list-group-item list-group-item-action">
          Go To ArticleList Page
        </Link>
        <p></p> */}
        <Link to={`/articles/${article.article_id}`} className="list-group-item list-group-item-action">
          Go To ArticleCard Page
        </Link>
        <p></p>
        <Link to={`/comments/${article.article_id}`} className="list-group-item list-group-item-action">
          Go To CommentsList Page - initially using article defined in app.jsx
        </Link>
        <p></p>
        <Link to={`/comment/1`} className="list-group-item list-group-item-action">
          Go To CommentCard Page - initially showing comment defined in app.jsx
        </Link>
      </div>
    </div>
  );
}

export default Home;
