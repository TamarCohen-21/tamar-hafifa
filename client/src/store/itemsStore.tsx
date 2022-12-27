import { action, makeAutoObservable, observable } from "mobx";
import ItemService from "../services/itemService";
import IItem from "../types/IItem";
import { ItemEnum } from "../types/itemEnum";

export class ItemsStore {
  items: IItem[] = [];
  itemsFilter: IItem[] = [];
  isItemInStock: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      items: observable,
      itemsFilter: observable,
      isItemInStock: observable,
      getAllItems: action,
      changeUnits: action,
      reduceItemUnits: action,
      addItemUnits: action,
      searchItemByName: action,
      searchItemByCategory: action,
    });
    this.getAllItems();
  }

  async getAllItems() {
    this.items = await ItemService.getAll();
    this.itemsFilter = this.items;
  }

  async changeUnits(
    itemToReduce: IItem,
    unitsToOrder: number,
    newUnits: number
  ) {
    this.itemsFilter.filter((item: IItem) => {
      if (item.id === itemToReduce.id) {
        item.unitsToOrder = unitsToOrder;
        item.units = newUnits;
      }
    });
    this.itemsFilter = [...this.itemsFilter];
    this.items = [...this.itemsFilter];
  }

  async reduceItemUnits(itemToDelete: IItem, unitsToDelete: number) {
    const index = this.itemsFilter.findIndex((item) => {
      return item.id === itemToDelete.id;
    });
    this.itemsFilter[index].units -= unitsToDelete;
    if (this.itemsFilter[index].unitsToOrder === undefined) {
      this.itemsFilter[index].unitsToOrder = unitsToDelete;
    } else {
      this.itemsFilter[index].unitsToOrder! += unitsToDelete;
    }
    this.itemsFilter = [...this.itemsFilter];
    this.items = [...this.itemsFilter];
  }

  async addItemUnits(itemToAdd: IItem, unitsToAdd: number) {
    const index = this.itemsFilter.findIndex((item) => {
      return item.id === itemToAdd.id;
    });
    this.itemsFilter[index].units += unitsToAdd;
    this.itemsFilter[index].unitsToOrder! -= unitsToAdd;
    this.itemsFilter = [...this.itemsFilter];
    this.items = [...this.itemsFilter];
  }

  async searchItemByName(itmNameInput: string) {
    this.itemsFilter = this.items;
    const filteredItems = this.itemsFilter.filter((item: IItem) => {
      if (item.name.includes(itmNameInput)) return item;
    });
    this.itemsFilter = filteredItems;
  }

  async searchItemByCategory(categoryInput: string) {
    this.itemsFilter = this.items;
    if (categoryInput === ItemEnum.ALL) {
    } else {
      const filteredItems = this.itemsFilter.filter((item: IItem) => {
        return item.category === categoryInput;
      });
      this.itemsFilter = filteredItems;
    }
  }
}

export const itemsStore = new ItemsStore();
