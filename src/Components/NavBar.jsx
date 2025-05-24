import { Link } from "react-router-dom"; // corrected import

const NavBar = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/articles/">
        <button>Articles</button>
      </Link>
      <Link to="/topics/">
        <button>Topics</button>
      </Link>
    </div>
  );
};

export default NavBar;