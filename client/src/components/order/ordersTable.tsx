import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import IOrder from "../../types/IOrder";
import { Button } from "primereact/button";
import OrderPopUp from "./orderPopUp";
import { ordersStore } from "../../store/ordersStore";
import { observer } from "mobx-react";
import IItem from "../../types/IItem";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../comCss/orders.css";

interface IOrderTableProps {
  orderPopUp: IOrder | undefined;
  setOrderPopUp: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
  displayOrderPopUp: boolean;
  setDisplayOrderPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrdersTable: React.FC<IOrderTableProps> = ({ orderPopUp,setOrderPopUp,displayOrderPopUp,setDisplayOrderPopUp }) => {

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orderPrice, setOrderPrice] = useState<number>(0);

  const handleOrderDialog = async(orderData: IOrder) => {
    setOrderPopUp({...orderData});
    const orderPrice = sumOrderPrice(orderData);
    handleOrderPrice(orderPrice);
    setDisplayOrderPopUp((orderD) => !orderD); 
  }

  const handleOrderPrice =(orderPrice: number)=>{
    setOrderPrice(orderPrice)
  }

  const sumItemsUnits = (orderData: any) => {
    let sumUnits = 0;
    orderData.items.map((item: IItem)=>
     {sumUnits += item.units;})
    return <>{sumUnits}</>;
  };

  const sumOrderPrice = (orderData: any) => {    
    const price = orderData.items.reduce((sumPrice: number,item: any)=>
      sumPrice + item.item.price * item.units,0
    )
    return price;
  };

  const showOrderPopUp = (orderData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-external-link"
          className="p-button-rounded"
          onClick={() => handleOrderDialog(orderData)}
        ></Button>
      </React.Fragment>
    );
  };

  return (
    <div>
      <div className="div-orders-table">
        <div className="card">
          <DataTable
            value={ordersStore.ordersFilter}
            header="רשימת הזמנות"
            showGridlines
            responsiveLayout="scroll"
            selection={selectedOrder}
            onSelectionChange={(e) => {
              setSelectedOrder(e.value);
            }}
            emptyMessage={"אין הזמנות"}
          >
            <Column field="idNumber" header="מזהה"></Column>
            <Column header="כמות" body={sumItemsUnits}></Column>
            <Column header="תאריך" field="date"></Column>
            <Column header="סך הכל" body={sumOrderPrice}></Column>
            <Column
              header="פרטי הזמנה"
              field="showDetails"
              body={showOrderPopUp}
              exportable={false}
            ></Column>
          </DataTable>
          <OrderPopUp
            orderPopUp={orderPopUp}
            displayOrderPopUp={displayOrderPopUp}
            setDisplayOrderPopUp={setDisplayOrderPopUp}
            orderPrice={orderPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(OrdersTable);
