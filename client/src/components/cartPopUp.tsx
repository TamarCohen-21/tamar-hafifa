import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { cartStore } from "../store/cartStore";
import { observer } from "mobx-react";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../comCss/shoppingCart.css";

const CartPopUp = observer(() => {
  const [shopCartDialog, setShopCartDialog] = useState(false);

  const handleCartPopUp = () => {
    setShopCartDialog((shopD) => !shopD);
    cartStore.sumCartPrice();
  };

  const createOrder = () => {
    cartStore.createNewOrder();
    setShopCartDialog(false);
  };

  const footer = (
    <div>
      <Button label="רכישה" onClick={createOrder}></Button>
    </div>
  );

  return (
    <div>
      <Dialog
        visible={shopCartDialog}
        header="סל קניות"
        modal
        className="p-fluid"
        onHide={handleCartPopUp}
        dismissableMask={true}
        footer={footer}
        id="cart-dialog"
      >
        <DataTable
          header="רשימת פריטים"
          value={cartStore.items}
          showGridlines
          responsiveLayout="scroll"
          emptyMessage={"הסל שלך ריק"}
        >
          <Column field="name" header="שם"></Column>
          <Column field="unitsToOrder" header="כמות"></Column>
          <Column field="price" header="מחיר ליחידה"></Column>
        </DataTable>
        <h3>סה"כ:</h3>
        <h3>{cartStore.totalPrice}</h3>
      </Dialog>
      <Button
        icon="pi pi-shopping-cart"
        className="p-button-rounded"
        onClick={handleCartPopUp}
      ></Button>
    </div>
  );
});

export default CartPopUp;
