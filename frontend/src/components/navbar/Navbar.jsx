import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxColorWheel } from "react-icons/rx";
import { SidebarAdminData } from "./SidebarAdminData";
import { SidebarAgentsData } from "./SidebarAgentData";

import "./navbar.scss";
import StateContext from "../../context/StateContext";

const Navbar = (props) => {
  const ctxData = useContext(StateContext);
  const { loginUser, setLogin } = ctxData;
  const navTo = useNavigate();
  const data =
    loginUser?.role === "Admin" ? SidebarAdminData : SidebarAgentsData;
  const logOutHandler = () => {
    setLogin(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navTo("/admin");
  };
  return (
    <nav className={props.sidebar ? "nav active" : "nav"}>
      <ul className="nav-list">
        <li className="nav-list__item">
          <div className="nav-list__item--link">
            <span className="icon">
              <RxColorWheel />
            </span>
            <span className="title">Magic Spin Wheel</span>
          </div>
        </li>
        {data.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path} className="nav-list__item--link">
                <span className="icon">{item.icon}</span>
                <span className="title">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="logout-btn">
        <button onClick={logOutHandler} className="btn">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
