import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import IItem from "../../types/IItem";
import { Button } from "primereact/button";
import { itemsStore } from "../../store/itemsStore";
import { observer } from "mobx-react";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../comCss/items.css";

interface IItemTableProps {
  setItemPopUp: React.Dispatch<React.SetStateAction<IItem | undefined>>;
  setDisplayItemPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemsTable: React.FC<IItemTableProps> = ({
  setItemPopUp,
  setDisplayItemPopUp,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemDialog = (itemData: any) => {
    setItemPopUp({ ...itemData });
    setDisplayItemPopUp((itemD) => !itemD);
  };



  const showItemPopUp = (itemData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-external-link"
          className="p-button-rounded"
          onClick={() => handleItemDialog(itemData)}
        ></Button>
      </React.Fragment>
    );
  };

  return (
    <div>
      <div className="div-items-table">
        <div className="card">
          <DataTable
            header="רשימת פריטים"
            value={itemsStore.items}
            showGridlines
            responsiveLayout="scroll"
            selection={selectedItem}
            onSelectionChange={(e) => {
              setSelectedItem(e.value);
            }}
            emptyMessage={'אין מוצרים מתאימים'}
          >
            <Column field="name" header="שם פריט"></Column>
            <Column field="price" header="מחיר ליחידה"></Column>
            <Column field="category" header="קטגוריה"></Column>
            <Column field="idNumber" header="מזהה מוצר"></Column>
            <Column
              field="showDetails"
              body={showItemPopUp}
              exportable={false}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default observer(ItemsTable);
