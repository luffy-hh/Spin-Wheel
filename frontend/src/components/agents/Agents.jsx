import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import React, { Fragment } from "react";

import GetNumber from "./components/GetNumber";
import AgReport from "./components/AgReport";

const Agents = () => {
  return (
    <Fragment>
      <Route path="/admin/getNumber" element={<GetNumber />} />
      <Route path="/admin/agReport" element={<AgReport />} />
    </Fragment>
  );
};

export default Agents;
