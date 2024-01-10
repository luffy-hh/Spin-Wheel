import React, { Fragment, useContext, useState } from "react";
import "./btnGroup.scss";
import StateContext from "../../../context/StateContext";
const BtnGroup = () => {
  const ctx = useContext(StateContext);
  const { policy, uiAgent } = ctx;
  const [showTerm, setShowTerm] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const agentList = uiAgent?.map((ag, i) => {
    return (
      <tr key={i}>
        <td>{ag.name}</td>
        <td>{ag.phNum}</td>
      </tr>
    );
  });
  const text = policy?.split("\n");
  //   console.log(text);
  const termsAndPolicy = text?.map((tx, i) => {
    return (
      <p className="terms-text" key={i}>
        {tx}
      </p>
    );
  });

  return (
    <Fragment>
      <div className="termAndAgent">
        <div className="btn-group">
          <button
            className="btn-terms ui-btn"
            onClick={() => {
              setShowTerm(!showTerm);
              setShowAgent(false);
            }}
          >
            Terms & Policy
          </button>
          <button
            className="btn-agents ui-btn"
            onClick={() => {
              setShowAgent(!showAgent);
              setShowTerm(false);
            }}
          >
            Agents List
          </button>
        </div>
        <div className={`agent-list ${showAgent ? "show" : "hide"}`}>
          <table className="table">
            <tbody>{agentList}</tbody>
          </table>
        </div>
        <div className={`terms ${showTerm ? "show" : "hide"}`}>
          {termsAndPolicy}
        </div>
      </div>
    </Fragment>
  );
};

export default BtnGroup;
