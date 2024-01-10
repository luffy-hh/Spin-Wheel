import { Fragment, useContext } from "react";
import Login from "./components/login/Login";
import "./App.scss";
import Wheel from "./components/user/Wheel";
import { Route, Routes } from "react-router-dom";
import StateContext from "./context/StateContext";
import Role from "./components/role/Role";

import Home from "./components/admin/components/Home";
import Dashboard from "./components/admin/components/Dashboard";
import Reward from "./components/admin/components/Reward";
import EditForm from "./components/admin/components/EditForm";
import Create from "./components/admin/components/Create";
import AdmReport from "./components/admin/components/AdmReport";
import { useState } from "react";
import Popup from "./components/user/components/Popup";
import GetNumber from "./components/agents/components/GetNumber";
import AgReport from "./components/agents/components/AgReport";
import Top10 from "./components/admin/components/Top10";
import AgentAndTerm from "./components/admin/components/AgentAndTerm";
import Batman from "./components/user/Batman";
import Live22 from "./components/user/Live22";
import Download from "./components/user/components/Download";
import LoginAgain from "./components/globalComponents/LoginAgain";

function App() {
  const ctxData = useContext(StateContext);
  const { login, loginUser } = ctxData;
  const [showPop, setShowPop] = useState(false);
  // console.log(loginUser.role);

  const onShow = () => setShowPop(true);

  const onClose = () => {
    setShowPop(false);
  };
  // const closeRightClick = (e) => {
  //   e.preventDefault();
  // };
  return (
    <Fragment>
      <div>
        {showPop && <Popup onClose={onClose} />}
        <LoginAgain />
        <Routes>
          <Route path="/" element={<Batman />} />
          <Route path="/live22" element={<Live22 />} />
          <Route path={"/spin-wheel"} element={<Wheel onShow={onShow} />} />
          <Route path={"/downloadApks"} element={<Download />} />

          <Route path={"/admin"} element={login ? <Role /> : <Login />}>
            {loginUser?.role === "Admin" ? (
              <Fragment>
                <Route path="/admin/home" element={<Home />} />
                <Route path="/admin/top10" element={<Top10 />} />
                <Route path="/admin/luckyNumber" element={<Dashboard />} />
                <Route path="/admin/rewards" element={<Reward />} />
                <Route path="/admin/list&term" element={<AgentAndTerm />} />
                <Route path="/admin/edit" element={<EditForm />} />
                <Route path="/admin/agents" element={<Create />} />
                <Route path="/admin/report" element={<AdmReport />} />
              </Fragment>
            ) : (
              <Fragment>
                <Route path="/admin/getNumber" element={<GetNumber />} />
                <Route path="/admin/agReport" element={<AgReport />} />
              </Fragment>
            )}
          </Route>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
