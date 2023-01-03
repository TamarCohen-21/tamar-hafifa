import { action, makeAutoObservable, observable } from "mobx";
import OrderService from "../services/orderService";
import IOrder from "../types/IOrder";
import { toast } from "react-toastify";

export class OrdersStore {
  orders: IOrder[] = [];
  ordersFilter: IOrder[] = [];

  constructor() {
    makeAutoObservable(this, {
      orders: observable,
      ordersFilter: observable,
      getAllOrders: action,
      searchOrderById: action,
      addNewOrder: action,
      deleteOrder: action
    });
    this.getAllOrders();
  }

  async getAllOrders() {
    this.orders = await OrderService.getAll(); 
    this.ordersFilter = this.orders;
  }

  async searchOrderById(idInput: string) {
    this.ordersFilter = this.orders; 
    const filteredorders = this.ordersFilter.filter((order: IOrder) => {
      if (order.idNumber?.toString().includes(idInput)) {
        return order;
      }
    });
    this.ordersFilter = [...filteredorders];
  }

  async deleteOrder(orderId: string) {
    await OrderService.deleteOrderById(orderId);
    const index = this.ordersFilter.findIndex((order) => {
      return order.id === orderId;
    });
    this.ordersFilter.splice(index, 1);
    this.ordersFilter = [...this.ordersFilter];
    this.orders.splice(index, 1);
    this.orders = [...this.orders];
    toast.error("ההזמנה נמחקה בהצלחה");
  }

  async addNewOrder(newOrder: IOrder){
    const order = await OrderService.addOrder(newOrder);
    this.ordersFilter.push(order);
    this.ordersFilter = [...this.ordersFilter];
    this.orders.push(order);
    this.orders = [...this.orders];
  }
}

export const ordersStore = new OrdersStore();
