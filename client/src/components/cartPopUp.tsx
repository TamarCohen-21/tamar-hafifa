import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { observer } from "mobx-react";
import { cartStore } from "../store/cartStore";
import { itemsStore } from "../store/itemsStore";
import IItem from "../types/IItem";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../comCss/shoppingCart.css";

const CartPopUp = observer(() => {
  const [shopCartDialog, setShopCartDialog] = useState<boolean>(false);

  const handleCartPopUp = () => {
    setShopCartDialog((shopD) => !shopD);
    cartStore.sumCartPrice();
  };

  const createOrder = () => {
    cartStore.createNewOrder();
    setShopCartDialog(false);
  };

  const removeItemFromCart = (itemData: IItem) => {
    itemsStore.addItemUnits(itemData, itemData.unitsToOrder as number);
    cartStore.removeItemFromCart(itemData);
  };

  const trashButton = (itemData: IItem) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        onClick={() => removeItemFromCart(itemData)}
      ></Button>
    );
  };

  const changeOrderUnits = async (itemData: IItem, units: number, unitsToOrder: number) => {
    const newUnits = units - unitsToOrder;
    cartStore.changeUnits(itemData,unitsToOrder, newUnits);
    itemsStore.changeUnits(itemData,unitsToOrder, newUnits);
  };

  const orderUnitsInput = (itemData: IItem) => {
    const unitsToOrder = itemData.unitsToOrder!;
    const units = itemData.units + itemData.unitsToOrder!;
    
    return (
      <InputNumber
        value={unitsToOrder}
        size={3}
        showButtons
        buttonLayout="horizontal"
        onValueChange={(e) =>{          
          changeOrderUnits(itemData, units, e.target.value as number)}
        }
        incrementButtonIcon="pi pi-plus-circle"
        decrementButtonIcon="pi pi-minus-circle"
        min={1}
        max={units}
      />
    );
  };

  const footer = (
    <div>
      <Button
        label="רכישה"
        onClick={createOrder}
        disabled={cartStore.isCartEmpty}
      ></Button>
    </div>
  );

  return (
    <div>
      <Dialog
        visible={shopCartDialog}
        header="סל קניות"
        modal
        className={classNames("cartPopUp")}
        onHide={handleCartPopUp}
        dismissableMask={true}
        footer={footer}
        id="cartPopUp"
      >
        <DataTable
          header="רשימת פריטים"
          value={cartStore.items}
          showGridlines
          responsiveLayout="scroll"
          emptyMessage={"הסל שלך ריק"}
        >
          <Column field="name" header="שם"></Column>
          <Column
            header="כמות"
            body={orderUnitsInput}
            // field="unitsToOrder"
          ></Column>
          <Column field="price" header="מחיר"></Column>
          <Column body={trashButton}></Column>
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
