import { action, makeAutoObservable, observable } from "mobx";
import ItemService from "../services/itemService";
import IItem from "../types/IItem";
import { itemsStore } from "./itemsStore";
import { ordersStore } from "./ordersStore";
import { toast } from "react-toastify";
import IOrder from "../types/IOrder";
import OrderService from "../services/orderService";

export class CartStore {
  items: IItem[] = [];
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this, {
      items: observable,
      totalPrice: observable,
      addItemToCart: action,
      sumCartPrice: action,
      setItemUnits: action,
      createNewOrder: action,
      cleanCart: action,
    });
  }

  async addItemToCart(item: IItem, unitsToAdd: number) {
    item.unitsToOrder = unitsToAdd;
    this.items.push(item);
  }

  async sumCartPrice() {
    this.totalPrice = 0;
    this.items.forEach((item: IItem) => {
      this.totalPrice += item.price * item.unitsToOrder!;
    });
    return this.totalPrice;
  }

  async setItemUnits() {
    await Promise.all(
      this.items.map((item: IItem) => {
        return ItemService.buyItem(item);
      })
    );
    itemsStore.getAllItems(); 
  }
  
  async cleanCart() {
    this.items = [];
  }

  async createNewOrder() {
    const itemsIdToOrder: string[] = await Promise.all(
      this.items.map((item) => {
        const newItemToOrder: any = {
          id: item.id,
          units: item.unitsToOrder
        };
        return newItemToOrder;
      })
    );

    const newOrder: IOrder = {
      items: itemsIdToOrder,
    };

    await OrderService.addOrder(newOrder);
    await ordersStore.getAllOrders();
    this.cleanCart();
    toast.success("ההזמנה בוצעה בהצלחה");
  }
}

export const cartStore = new CartStore();
