import { action, makeAutoObservable, observable } from "mobx";
import ItemService from "../services/itemService";
import IItem from "../types/IItem";

export class ItemsStore {
  items: IItem[] = [];
  itemsNamesFilter: string[] = [];

  constructor() {
    makeAutoObservable(this, {
      items: observable,
      itemsNamesFilter: observable,
      getAllItems: action,
      searchItemByName: action,
      getItemsNames: action,
    });
    this.getAllItems();
  }

  async getAllItems() {
    this.items = await ItemService.getAll();
  }

  async getItemsNames(items: IItem[]) {
    const itemsNames: string[] = [];
    items.forEach((item: IItem) => {
      itemsNames.push(item.name);
    });
    return itemsNames;
  }

  async searchItemByName(itmNameInput: string) {
    await this.getAllItems();
    const filteredItems: IItem[] = [];
    this.items.forEach((item: IItem) => {
      if (item.name.includes(itmNameInput)) {
        filteredItems.push(item);
      }
    });
    this.items = filteredItems;
    this.itemsNamesFilter =await this.getItemsNames(filteredItems);
  }

  async searchItemByCategory(categoryInput: string) {
    await this.getAllItems();
    const filteredItems: IItem[] = [];
    if (categoryInput === "ALL_ITEMS") {
    } else {
      this.items.forEach((item: IItem) => {
        if (item.category === categoryInput) {
          filteredItems.push(item);
        }
      });
      this.items = filteredItems;
    }
  }
}

export const itemsStore = new ItemsStore();
