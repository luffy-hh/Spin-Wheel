import React, { useContext } from "react";
import "./top10Win.scss";
import StateContext from "../../../context/StateContext";

const Top10Win = () => {
  const ctx = useContext(StateContext);
  const {
    top1Name,
    top2Name,
    top3Name,
    top4Name,
    top5Name,
    top6Name,
    top7Name,
    top8Name,
    top9Name,
    top10Name,
  } = ctx;

  return (
    <div className="top-winner">
      <div className="table">
        <table>
          <tbody>
            <tr>
              <td>{top1Name}</td>
              <td>{top2Name}</td>
            </tr>
            <tr>
              <td>{top3Name}</td>
              <td>{top4Name}</td>
            </tr>
            <tr>
              <td>{top5Name}</td>
              <td>{top6Name}</td>
            </tr>
            <tr>
              <td>{top7Name}</td>
              <td>{top8Name}</td>
            </tr>
            <tr>
              <td>{top9Name}</td>
              <td>{top10Name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Top10Win;
