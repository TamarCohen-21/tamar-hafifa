import { useState } from "react";
import IItem from "../../types/IItem";
import ItemPopUp from "./itemPopUp";
import ItemsTable from "./itemsTable";
import { observer } from "mobx-react";

const Item = observer(() => {

  const [displayItemPopUp, setDisplayItemPopUp] = useState<boolean>(false);
  const [itemPopUp, setItemPopUp] = useState<IItem | undefined>();

  return (
    <div>
      <ItemsTable
        setItemPopUp={setItemPopUp}
        setDisplayItemPopUp={setDisplayItemPopUp}
      />

      <ItemPopUp
        itemPopUp={itemPopUp}
        displayItemPopUp={displayItemPopUp}
        setDisplayItemPopUp={setDisplayItemPopUp}
      />
    </div>
  );
});

export default Item;
