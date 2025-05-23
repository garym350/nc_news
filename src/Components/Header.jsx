import NavBar from "./NavBar";
import UserCard from "./UserCard";


const Header = () => {
  return (
    <div className="header-container">
      <div className="header-top">
        <img
          src="/images/nc news logo.jpg"
          alt="NC News Logo"
          className="header-logo"
        />
        <UserCard />
      </div>
      <NavBar />
    </div>
  );
};

export default Header;
