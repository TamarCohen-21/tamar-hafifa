import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import IOrder from "../../types/IOrder";
import IItem from "../../types/IItem";
import { Button } from "primereact/button";
import OrderPopUp from "./orderPopUp";
import { ordersStore } from "../../store/ordersStore";
import { observer } from "mobx-react";

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

  const handleOrderDialog = (orderData: IOrder) => {
    setOrderPopUp({...orderData});
    setDisplayOrderPopUp((orderD) => !orderD);
    sumOrderPrice(orderData);
  }

  const itemsUnits = (orderData: IOrder) => {
    return <>{orderData.items?.length}</>;
  };

  const orderDate = (orderData: IOrder) => {
    if (orderData.date) {
      const date = new Date(orderData.date.toString());
      const year = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate() + 2;
      let day = dd.toString();
      let month = mm.toString();

      if (dd < 10) day = "0" + dd;
      if (mm < 10) month = "0" + mm;
      return (
        <p>
          {day}/{month}/{year}
        </p>
      );
    }
    return <p>Error</p>;
  };

  const sumOrderPrice = (orderData: any) => {    
    let price: number = 0;
    orderData.items.forEach((item: any) => {
      price += item.units * item.item.price;
    });
    setOrderPrice(price);
    return <>{price} ש"ח</>;
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
            value={ordersStore.orders}
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
            <Column header="כמות פריטים" body={itemsUnits}></Column>
            <Column header="תאריך" body={orderDate}></Column>
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
