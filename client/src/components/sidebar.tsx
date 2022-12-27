import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../comCss/main.css";


interface SidebarProps {
  activeSidebar: boolean | undefined;
  setActiveSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setScreanFlag: React.Dispatch<React.SetStateAction<boolean >>;
}


const SidebarOptions: React.FC<SidebarProps> =({activeSidebar,setActiveSidebar,setScreanFlag})=>{
  
  const compNavigate = useNavigate();

  const navigateToItems = () => {
    setScreanFlag(false);
    compNavigate("/items");
  };

  const navigateToOrders = () => {
    setScreanFlag(true);
    compNavigate("/orders");
  };

    return(<Sidebar
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
       </Sidebar>)

}

export default SidebarOptions;