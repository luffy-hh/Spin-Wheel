import { useContext } from "react";
import React, { Fragment } from "react";
import "./create.scss";
import StateContext from "../../../context/StateContext";

const Create = () => {
  const ctxData = useContext(StateContext);
  const {
    setAgentName,
    fetchCreate,
    agentReturnData,
    setAgentPassword,
    agentName,
    agentPassword,
  } = ctxData;
  const submitHandler = (e) => {
    e.preventDefault();
    setAgentName("");
    setAgentPassword("");
    fetchCreate();
  };
  // console.log(agentReturnData);

  const agentList = agentReturnData ? (
    agentReturnData.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.userName} </td>
          <td>{new Date(item.created).toLocaleDateString()} </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td>-</td>
      <td>- </td>
      <td>-</td>
    </tr>
  );
  return (
    <Fragment>
      <div className="cards">
        <div className="card">
          <div className="card-create">
            <h2>Create Agents</h2>
            <p>
              You created <strong>{agentReturnData.length}</strong> Agents total
            </p>

            <form onSubmit={submitHandler} className="form">
              <label htmlFor="userName">
                <span>Agent Name</span>
                <input
                  type="text"
                  placeholder="Agent Name"
                  name="userName"
                  id="userName"
                  value={agentName}
                  onChange={(e) => {
                    setAgentName(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="password">
                <span>Password</span>
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={agentPassword}
                  onChange={(e) => {
                    setAgentPassword(e.target.value);
                  }}
                />
              </label>
              <button type="submit" className="btn">
                Create
              </button>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <p className="card-header__text">Agent List</p>
          </div>
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>Agents Name</td>
                <td>Created</td>
              </tr>
            </thead>
            <tbody>{agentList}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
