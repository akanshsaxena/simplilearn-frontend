import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeIsLoggedIn } from "../slices/authSlice";
export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(changeIsLoggedIn({ isLoggedIn: false, userId: "" }));
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div className="header">
      <NavLink to="/" className="link">
        <h1 id="heading">simplilearn</h1>
      </NavLink>
      <div className="nav-bar">
        <NavLink to="/mycourses" className="link">
          <p className="nav-link">My courses</p>
        </NavLink>
        <p className="nav-link" onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}
