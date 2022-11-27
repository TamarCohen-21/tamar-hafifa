import { action, makeAutoObservable, observable } from "mobx";
import OrderService from "../services/orderService";
import IOrder from "../types/IOrder";
import { toast } from "react-toastify";

export class OrdersStore {
  orders: IOrder[] = [];
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this, {
      orders: observable,
      getAllOrders: action,
      searchOrderById: action,
    });

    this.getAllOrders();
  }

  async getAllOrders() {
    this.orders = await OrderService.getAll();
  }

  async searchOrderById(idInput: string) {
    await this.getAllOrders();
    const filteredorders: IOrder[] = [];
    this.orders.forEach((order: IOrder) => {
      if (order.idNumber?.toString().includes(idInput)) {
        filteredorders.push(order);
      }
    });
    this.orders = filteredorders;
  }

  async deleteOrder(orderId: string) {
    await OrderService.deleteOrderById(orderId);
    this.getAllOrders();
    toast.error("ההזמנה נמחקה בהצלחה");
  }

}

export const ordersStore = new OrdersStore();
