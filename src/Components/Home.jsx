import "../../src/App.css";
import Header from "./Header";
import ArticleCard from "./ArticleCard";

function Home({ article }) {
 
  return (
    <div>
      <Header />
      <h2 className="mb-4 text-primary">Welcome to the News App!</h2>
      <div className="list-group">
        <ArticleCard article={article}/>
      </div>
    </div>
  );
}

export default Home;
