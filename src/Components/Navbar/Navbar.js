import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import avatar from "../../assets/icons/avatar.png";
import { Routes } from "../../Routes/routes";

export default function Navbar() {
  const { user } = useAuth();
  const { logout } = useAuth();
  
  const imgBorder = `2px solid ${user.isAdmin ? "#00ba88" : "#d6d8e7"}`;

  return (
    <div className="navbar">
      <div className="navbar__content container">
        <Link to={Routes.homePage} className="navbar__user">
          <img style={{ border: imgBorder }} src={avatar} alt="userAvatar" />
          <div className="navbar__user-name">{user.username}</div>
        </Link>

        <div className="navbar__links">
          {user.isAdmin && (
            <>
              <Link to={Routes.profiles} className="navbar__links-item">
                Profiles
              </Link>
              <Link to={Routes.dashboard} className="navbar__links-item">
                Dashboard
              </Link>
              <Link to={Routes.users} className="navbar__links-item">
                Users
              </Link>
            </>
          )}
          <button onClick={logout}>Log out</button>
        </div>
      </div>
    </div>
  );
}
