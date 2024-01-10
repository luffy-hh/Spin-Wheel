import React, { Fragment, useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import NavBar from "../navbar/Navbar";
import StateContext from "../../context/StateContext";
import Admin from "../admin/Admin";
import Agents from "../agents/Agents";
import "./role.scss";

const Role = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const { loginUser, login } = useContext(StateContext);
  // console.log(login);
  // const separateRole = loginUser.role === "Admin" ? <Admin /> : <Agents />;
  return (
    <Fragment>
      <div className="container">
        <NavBar sidebar={sidebar} />
        <div className={sidebar ? "role-main active" : "role-main"}>
          <div className="topbar">
            <div className="toggle">
              <Link to={"#"}>
                <FaBars onClick={showSidebar} />
              </Link>
            </div>
            <div className="user">
              <FaUser className="user-icon" />
              <span className="userName">{loginUser?.userName}</span>
            </div>
          </div>
          {/*separateRole*/}
          {<Outlet />}
        </div>
      </div>
    </Fragment>
  );
};

export default Role;
