import { Link } from "react-router";


const NavBar = () =>{
    return(
        <div>
            <Link to="/">
            <button>Home</button>
            </Link>
            <Link to="/articles/">
            <button>Articles</button>
            </Link>
        </div>
    )
}

export default NavBar;