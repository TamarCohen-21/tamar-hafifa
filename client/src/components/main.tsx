import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Sidebar } from "primereact/sidebar";
import { useNavigate, Routes, Route } from "react-router-dom";
import CartPopUp from "./cartPopUp";
import Item from "./item/item";
import Order from "./order/order";
import { AutoComplete } from "primereact/autocomplete";
import { itemsStore } from "../store/itemsStore";
import { ordersStore } from "../store/ordersStore";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../comCss/main.css";

export default function Main() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [screanFlag, setScreanFlag] = useState(false);
  const compNavigate = useNavigate();

  const navigateToItems = () => {
    setScreanFlag(false);
    compNavigate("/items");
  };

  const navigateToOrders = () => {
    setScreanFlag(true);
    compNavigate("/orders");
  };

  const citySelectItems = [
    { label: "FRUITS", value: "FRUITS" },
    { label: "VEGETABLES", value: "VEGETABLES" },
    { label: "MEAT", value: "MEAT" },
    { label: "DAIRY", value: "DAIRY" },
    { label: "*", value: "ALL_ITEMS" },
  ];

  const leftToolBar = (
    <React.Fragment>
      <CartPopUp></CartPopUp>
      <i>הסל שלי</i>
    </React.Fragment>
  );

  const rightToolBar = (
    <React.Fragment>
      <div
        className="col-12 md:col-4 input-order-item-by-id "
        style={{ visibility: screanFlag ? "visible" : "hidden" }}
      >
        <div className="p-inputgroup">
          <InputText placeholder="חיפוש שם לפי מזהה"
          onChange={(e) => {ordersStore.searchOrderById(e.target.value)}} />
        </div>
      </div>
      <div
        className="div-item-search"
        style={{ visibility: screanFlag ? "hidden" : "visible" }}
      >
        <Dropdown
          className="input-search-item-by-categ"
          options={citySelectItems}
          placeholder="חיפוש לפי קטגוריה"
          onChange={(e) => itemsStore.searchItemByCategory(e.target.value)}
        />
        <span className="p-float-label input-search-item-by-name">
          <AutoComplete
            id="name"
            suggestions={itemsStore.itemsNamesFilter}
            onChange={(e) => {
              itemsStore.searchItemByName(e.target.value);
            }}
          ></AutoComplete>
          <label htmlFor="in">חיפוש לפי שם פריט</label>
        </span>
      </div>
      <Button
        icon="pi pi-bars"
        className="p-button-rounded"
        onClick={() => setActiveSidebar(true)}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toolbar left={leftToolBar} right={rightToolBar} />
      <Sidebar
        visible={activeSidebar}
        position="right"
        onHide={() => setActiveSidebar(false)}
      >
        <div className="div-sidebar">
          <Button icon="pi pi-shopping-bag" onClick={navigateToItems}></Button>
          <i>חנות</i>
          <Button
            icon="pi pi-pencil"
            className="btn-order"
            onClick={navigateToOrders}
          ></Button>
          <i className="sd">הזמנות</i>
        </div>
      </Sidebar>
      <Routes>
        <Route path="/items" element={<Item />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </div>
  );
}
