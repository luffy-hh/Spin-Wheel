import React, { Fragment, useContext } from "react";
import "./login.scss";
import StateContext from "../../context/StateContext";
import Loading from "../loading/Loading";

const Login = () => {
  const ctxData = useContext(StateContext);
  const {
    setUserNameEntered,
    setUserPasswordEntered,
    loginFetch,
    loadingStatus,
  } = ctxData;
  console.log(loadingStatus);
  function handleSubmit(e) {
    e.preventDefault();
    loginFetch();
  }
  // console.log(login);
  return (
    <Fragment>
      <div className="form-container">
        <div className="form-box login">
          <h2>Login</h2>
          {loadingStatus ? (
            <Loading
              message={"Logging In"}
              description={"Please Wait! Don't exit we are try to log you in."}
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  className="input"
                  required
                  onChange={(e) => setUserNameEntered(e.target.value)}
                />
                <span></span>
                <label>Username</label>
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  className="input"
                  required
                  onChange={(e) => setUserPasswordEntered(e.target.value)}
                />
                <span></span>
                <label>Password</label>
                <i className="fa-solid fa-lock"></i>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
