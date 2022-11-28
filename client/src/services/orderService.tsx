import { http } from "../http-common";
import IOrder from "../types/IOrder";

const orderUrl = "/order";

export default class OrderService {
  static async getAll() {
    return (await http.get<Array<IOrder>>(`${orderUrl}/`)).data;
  }

  static async addOrder(order: IOrder){
    return (await http.post(orderUrl, order)).data;
  }

  static async ordersAndItemsById(orderId: string){
    return (await http.get(`${orderUrl}/${orderId}`)).data;
  }

  static async deleteOrderById(orderId: string){
    return (await http.delete(`${orderUrl}/${orderId}`)).data;
  }
}
