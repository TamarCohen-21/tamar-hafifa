import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { itemsStore } from "../store/itemsStore";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { ordersStore } from "../store/ordersStore";
import { ItemEnum } from "../types/itemEnum";

interface rightToolBarProps {
  screanFlag: boolean;
  setActiveSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightToolBar: React.FC<rightToolBarProps> = ({
  screanFlag,
  setActiveSidebar,
}) => {
  const [itemNameSearch, setItemNameSearch] = useState<string>("");
  const [orderIdSearch, setOrderIdSearch] = useState<string>("");
  const [itemCategorySearch, setItemCategorySearch] = useState<ItemEnum | undefined>();

  useEffect(() => {
    itemsStore.searchItemByName(itemNameSearch);
  }, [itemNameSearch]);

  useEffect(() => {
    ordersStore.searchOrderById(orderIdSearch);
  }, [orderIdSearch]);

  useEffect(() => {
    if (itemCategorySearch) {
      itemsStore.searchItemByCategory(itemCategorySearch);
    }
  }, [itemCategorySearch]);

  const citySelectItems = [
    { label: ItemEnum.FRUITS, value: ItemEnum.FRUITS },
    { label: ItemEnum.VEGETABLES, value: ItemEnum.VEGETABLES },
    { label: ItemEnum.MEAT, value: ItemEnum.MEAT },
    { label: ItemEnum.DAIRY, value: ItemEnum.DAIRY },
    { label: ItemEnum.ALL, value: ItemEnum.ALL },
  ];

  return (
    <React.Fragment>
      <div
        className={`col-12 md:col-4 input-order-item-by-id ${
          screanFlag ? "search-input-showItem" : "search-input-showOrder"
        }`}
      >
        <div className="p-inputgroup">
          <InputText
            placeholder="חיפוש הזמנה לפי מזהה"
            onChange={(e) => setOrderIdSearch(e.target.value)}
            value={orderIdSearch}
          />
        </div>
      </div>
      <div
        className={`div-item-search ${
          screanFlag ? "search-input-showOrder" : "search-input-showItem"
        }`}
      >
        <Dropdown
          className="input-search-item-by-categ"
          options={citySelectItems}
          placeholder="חיפוש לפי קטגוריה"
          onChange={(e) => setItemCategorySearch(e.target.value)}
          value={itemCategorySearch}
        />
        <span className="p-float-label input-search-item-by-name">
          <AutoComplete
            id="name"
            onChange={(e) => setItemNameSearch(e.target.value)}
            value={itemNameSearch}
          ></AutoComplete>
          <label htmlFor="in">חיפוש לפי שם פריט</label>
        </span>
      </div>
      <Button
        icon="pi pi-bars"
        className="p-button-rounded"
        onClick={() => setActiveSidebar(true)}
      />
    </React.Fragment>
  );
};

export default observer(RightToolBar);
