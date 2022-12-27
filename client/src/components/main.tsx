import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Routes, Route } from "react-router-dom";
import CartPopUp from "./cartPopUp";
import ItemPage from "./item";
import OrderPage from "./order";
import  SidebarOptions  from './sidebar';

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../comCss/main.css";
import RightToolBar from "./rightToolBar";

export default function Main() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [screanFlag, setScreanFlag] = useState(false);

  const leftToolBar = (
    <React.Fragment>
      <CartPopUp></CartPopUp>
      <i>הסל שלי</i>
    </React.Fragment>
  );

  const rightToolBar = (
    <RightToolBar screanFlag={screanFlag} setActiveSidebar={setActiveSidebar}></RightToolBar>
  );

  return (
    <div>
      <Toolbar left={leftToolBar} right={rightToolBar} />
      <SidebarOptions
      activeSidebar={activeSidebar}
      setActiveSidebar={setActiveSidebar}
      setScreanFlag={setScreanFlag}
      />
      <Routes>
        <Route path="*" element={<ItemPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </div>
  );
}
