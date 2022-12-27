import { action, makeAutoObservable, observable } from "mobx";
import ItemService from "../services/itemService";
import IItem from "../types/IItem";
import { ordersStore } from "./ordersStore";
import { toast } from "react-toastify";
import IOrder from "../types/IOrder";

export class CartStore {
  items: IItem[] = [];
  totalPrice: number = 0;
  isCartEmpty: boolean = true;

  constructor() {
    makeAutoObservable(this, {
      items: observable,
      totalPrice: observable,
      isCartEmpty: observable,
      addItemToCart: action,
      changeUnits: action,
      removeItemFromCart: action,
      itemIdList: action,
      sumCartPrice: action,
      setItemUnits: action,
      createNewOrder: action,
      cleanCart: action,
    });
  }

  async itemIdList() {
    const idList = this.items.map((item: IItem) => {
      return item.id;
    });
    return idList;
  }

  async changeUnits(
    itemToReduce: IItem,
    unitsToOrder: number,
    newUnits: number
  ) {
    this.items.filter((item: IItem) => {
      if (item.id === itemToReduce.id) {
        item.unitsToOrder = unitsToOrder;
        item.units = newUnits;
      }
    });
    this.sumCartPrice();
  }

  async addItemToCart(itemToAdd: any, unitsToAdd: number) {
    this.isCartEmpty = false;
    const itemsidList = await this.itemIdList();
    if (itemsidList.includes(itemToAdd.id)) {
      this.items.filter((item: any) => {
        if (item.id === itemToAdd.id) {
          item.unitsToOrder += unitsToAdd;
          item.units -= unitsToAdd;
        }
      });
    } else {
      itemToAdd.unitsToOrder = unitsToAdd;
      itemToAdd.units -= unitsToAdd;
      this.items.push({ ...itemToAdd });
    }
    this.sumCartPrice();
  }

  async removeItemFromCart(itemToDelete: IItem) {
    const index = this.items.findIndex((item) => {
      return item.id === itemToDelete.id;
    });
    this.items.splice(index, 1);
    this.items = [...this.items];
    if (this.items.length === 0) {
      this.isCartEmpty = true;
    }
    this.sumCartPrice();
  }

  async sumCartPrice() {
    this.totalPrice = 0;
    this.totalPrice = this.items.reduce(
      (sumPrice: number, item: IItem) =>
        sumPrice + item.price * (item.unitsToOrder as number),
      0
    );
    return this.totalPrice;
  }

  async setItemUnits() {
    await Promise.all(
      this.items.map((item: IItem) => {
        return ItemService.buyItem(item);
      })
    );
  }

  async cleanCart() {
    this.items = [];
  }

  async createNewOrder() {
    await cartStore.setItemUnits();
    const itemsIdToOrder: string[] = await Promise.all(
      this.items.map((item) => {
        const newItemToOrder: any = {
          id: item.id,
          units: item.unitsToOrder,
        };
        return newItemToOrder;
      })
    );
    const newOrder: IOrder = {
      items: itemsIdToOrder,
    };

    await ordersStore.addNewOrder(newOrder);
    this.cleanCart();
    toast.success("ההזמנה בוצעה בהצלחה");
  }
}

export const cartStore = new CartStore();
