import React, { Fragment, useContext, useState } from "react";
import "./agentAndTerm.scss";
import StateContext from "../../../context/StateContext";

const AgentAndTerm = () => {
  const [name, setName] = useState("");
  const [phNum, setPhNum] = useState("");
  const [terms, setTerms] = useState("");

  const ctx = useContext(StateContext);
  const { modifyUiAgent, modifyTerms } = ctx;

  const agentSubmitHandler = (e) => {
    e.preventDefault();
    modifyUiAgent(name, phNum);
    setName("");
    setPhNum("");
  };

  const termsHandler = (e) => {
    e.preventDefault();
    modifyTerms("policy", terms);
    setTerms("");
  };
  return (
    <Fragment>
      <div className="cards">
        <div className="card">
          <div className="card-create">
            <h2>Modify Agent List</h2>
            <form onSubmit={agentSubmitHandler} className="form">
              <label htmlFor="userName">
                <span>Agent Name</span>
                <input
                  type="text"
                  placeholder="Agent Name"
                  name="userName"
                  id="userName"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="phNum">
                <span>Phone Number</span>
                <input
                  type="text"
                  placeholder="Agent Ph Number"
                  name="phNum"
                  id="phNum"
                  value={phNum}
                  onChange={(e) => {
                    setPhNum(e.target.value);
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
          <div className="card-create">
            <h2>Modify Term And Policy</h2>
            <form className="form" onSubmit={termsHandler}>
              <label htmlFor="terms">Terms And Policies</label>
              <textarea
                name="terms"
                id="terms"
                cols="50"
                rows="10"
                value={terms}
                onChange={(e) => {
                  setTerms(e.target.value);
                }}
              ></textarea>

              <button className="btn">Create or Edit</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AgentAndTerm;
