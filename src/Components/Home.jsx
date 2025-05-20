import "../../src/App.css";
import ArticleList from "./ArticleList";
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div>
      <h2>HELLO</h2>
      <Link to={"/article"}>Go To Article Page</Link>
      <ArticleList />
    </div>
  );
}

export default Home;
