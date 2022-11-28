import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import IOrder from "../../types/IOrder";
import { ordersStore } from "../../store/ordersStore";
import { observer } from "mobx-react";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

interface OrderPopUpPtops {
  orderPopUp: IOrder | undefined;
  displayOrderPopUp: boolean;
  setDisplayOrderPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  orderPrice: number;
}

const OrderPopUp: React.FC<OrderPopUpPtops> = ({
  orderPopUp,
  displayOrderPopUp,
  setDisplayOrderPopUp,
  orderPrice,
}) => {
  const handleOrderDialog = () => {
    setDisplayOrderPopUp((orderD) => !orderD);
  };

  const deleteOrder = () => {
    ordersStore.deleteOrder(orderPopUp?.id!);
    handleOrderDialog();
  };

  const footer = (
    <div>
      <Button
        label="מחיקה"
        onClick={() => {
          deleteOrder();
        }}
      ></Button>
    </div>
  );

  return (
    <div>
      <Dialog
        visible={displayOrderPopUp}
        header="רשימת מוצרים :"
        modal
        className="p-fluid"
        onHide={handleOrderDialog}
        dismissableMask={true}
        footer={footer}
      >
        <DataTable showGridlines value={orderPopUp?.items}>
          <Column field="item.name" header="שם"></Column>
          <Column field="units" header="כמות"></Column>
          <Column field="item.price" header="מחיר"></Column>
        </DataTable>
        <h3>סה"כ:</h3>
        <h3>{orderPrice} ש"ח</h3>
      </Dialog>
    </div>
  );
};

export default observer(OrderPopUp);
