import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const UserCard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={`${user.name}'s avatar`}
        className="user-avatar"
      />
      <div className="user-info">
        <p className="user-name">{user.name}</p>
        <p className="user-username">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserCard;
