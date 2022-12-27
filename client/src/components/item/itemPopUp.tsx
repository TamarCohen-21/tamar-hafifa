import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { cartStore } from "../../store/cartStore";
import { observer } from "mobx-react";
import { toast } from 'react-toastify';
import { itemsStore } from "../../store/itemsStore";
import IItem from "../../types/IItem";

import "../../comCss/item.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

interface ItemPopUpProps {
  itemPopUp: IItem | undefined;
  displayItemPopUp: boolean;
  setDisplayItemPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemPopUp: React.FC<ItemPopUpProps> = observer(({ itemPopUp,displayItemPopUp,setDisplayItemPopUp }) => {

  const [unitsToAdd, setUnitsToAdd] = useState<number>(0);

  const [isAddItemAvailable, setIsAddItemAvailable] = useState<boolean>(false);
  
  const handleItemDialog = () => {
    setIsAddItemAvailable(false);
    setDisplayItemPopUp((itemD) => !itemD);
  };

  const numUnits = (e: any) => {
    if(e > 0)
      setIsAddItemAvailable(true);
    else
      setIsAddItemAvailable(false);
    setUnitsToAdd(e);  
  };

  const addItemToCart = async() => {   
    await cartStore.addItemToCart(itemPopUp as IItem, unitsToAdd);
    itemsStore.reduceItemUnits(itemPopUp as IItem, (itemPopUp as IItem).unitsToOrder as number);
    handleItemDialog();
    toast.success('המוצר הוסף לסל');
  }

  const addItemButton = () =>{
    if(isAddItemAvailable === false){
      return (
        <React.Fragment>
          <Button
            id='buy-item-button'
            label="הוסף לסל"
            disabled={true}
          ></Button>
        </React.Fragment>
      )
    } else{
      return (
        <React.Fragment>
          <Button
            id='buy-item-button'
            label="הוסף לסל"
            onClick={addItemToCart}
          ></Button>
        </React.Fragment>
      )
    }
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
            id="item-popPup-input"
            value={0}
            showButtons
            onValueChange={(e) => numUnits(e.value)}
            buttonLayout="horizontal"
            incrementButtonIcon="pi pi-plus-circle"
            decrementButtonIcon="pi pi-minus-circle"
            min={0}
            max={itemPopUp.units}
          />
          {addItemButton()}
          <Button
            id='like-item-button'
            icon="pi pi-heart"
            className="p-button-rounded"
          />
        </Dialog>
      )}
    </div>
  );
});

export default ItemPopUp;

