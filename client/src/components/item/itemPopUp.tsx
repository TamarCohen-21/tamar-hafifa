import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import IItem from "../../types/IItem";
import { cartStore } from "../../store/cartStore";
import { observer } from "mobx-react";
import { toast } from 'react-toastify';

import "../../comCss/item.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

interface ItemPopUpPtops {
  itemPopUp: IItem | undefined;
  setItemPopUp: React.Dispatch<React.SetStateAction<IItem | undefined>>;
  displayItemPopUp: boolean;
  setDisplayItemPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemPopUp: React.FC<ItemPopUpPtops> = observer(({ itemPopUp,setItemPopUp,displayItemPopUp,setDisplayItemPopUp }) => {

  const [unitsToAdd, setUnitsToAdd] = useState<number>(0);

  const handleItemDialog = () => {
    setDisplayItemPopUp((itemD) => !itemD);
  };

  const numUnits = (e: any) => {  
    setUnitsToAdd(e);  
  };

  const addItemToCart = async() =>{   
    await cartStore.addItemToCart(itemPopUp!, unitsToAdd);
    await cartStore.setItemUnits();
    handleItemDialog();
    toast.success('המוצר הוסף לסל');
  }

  return (
    <div>
      {itemPopUp && (
        <Dialog
          visible={displayItemPopUp}
          header={itemPopUp.name}
          modal
          className="p-fluid"
          onHide={handleItemDialog}
          dismissableMask={true}
        >
          <h3>מוצר מספר: {itemPopUp.idNumber}</h3>
          <h4>מחיר: {itemPopUp.price} ש"ח</h4>
          <InputNumber
            value={0}
            showButtons
            onValueChange={(e) => numUnits(e.value)}
            buttonLayout="horizontal"
            incrementButtonIcon="pi pi-plus-circle"
            decrementButtonIcon="pi pi-minus-circle"
            // style={{ width: 130 }}
            inputId="item-popPup-input"
            min={1}
            max={itemPopUp.units}
          />
          <Button
            label="הוסף לסל"
            style={{ marginTop: 25 }}
            onClick={addItemToCart}
          ></Button>
          <Button
            icon="pi pi-heart"
            className="p-button-rounded"
            style={{ marginTop: 15 }}
          />
        </Dialog>
      )}
    </div>
  );
});

export default ItemPopUp;

