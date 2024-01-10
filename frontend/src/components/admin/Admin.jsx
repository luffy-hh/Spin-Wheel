import React, { Fragment } from "react";
import Dashboard from "./components/Dashboard";
import Reward from "./components/Reward";
import Home from "./components/Home";
import EditForm from "./components/EditForm";
import Create from "./components/Create";
import { Route, Routes } from "react-router-dom";
import AdmReport from "./components/AdmReport";
import Top10 from "./components/Top10";
import AgentAndTerm from "./components/AgentAndTerm";

const Admin = () => {
  return (
    <Fragment>
      <Route path="/admin/home" element={<Home />} />
      <Route path="/admin/top10" element={<Top10 />} />
      <Route path="/admin/luckyNumber" element={<Dashboard />} />
      <Route path="/admin/list&term" element={<AgentAndTerm />} />
      <Route path="/admin/rewards" element={<Reward />} />
      <Route path="/admin/edit" element={<EditForm />} />
      <Route path="/admin/agents" element={<Create />} />
      <Route path="/admin/report" element={<AdmReport />} />
    </Fragment>
  );
};

export default Admin;
