import { ObjectId } from "mongoose-typescript";
import MyError from "../myError";
import OrderI from "../orderInterface";
import axios from "axios";
import { config } from "../config";

const ITEMS_SERVER_API = `${config.ITEMS_TARGET_URL}/item`;
const ORDERS_SERVER_API = `${config.ORDERS_TARGET_URL}/order`;

export default class ApiGatewayManager {
  static getAllOrders = async () => {
    const allOrders = (await axios.get(`${ORDERS_SERVER_API}/`)).data;

    const allOrdersWithItems = allOrders.map((order: OrderI) => {
      return ApiGatewayManager.getPopulatedOrder(order);
    });

    return await Promise.all(allOrdersWithItems);
  };

  static getPopulatedOrderById = async (orderId: string) => {
    if (!ObjectId.isValid(orderId)) throw new MyError(500, "Invalid order id");
    const currOrder = (await axios.get(`${ORDERS_SERVER_API}/${orderId}`)).data;

    const promiseItems = currOrder.items.map((itemId: string) => {
      return axios.get(`${ITEMS_SERVER_API}/${itemId}`);
    });
    const result = await Promise.all(promiseItems);
    const newItems: any = result.map((item) => {
      return item.data;
    });
    
    currOrder.items = newItems;
    return currOrder;
  };

  static getPopulatedOrder = async (order: OrderI) => {
    if (order.items) {
      const promiseItems = order.items.map((itemId: any) => {
        return axios.get(`${ITEMS_SERVER_API}/${itemId}`);
      });
      const result = await Promise.all(promiseItems);
      const newItems: any = result.map((item) => {
        return item.data;
      });
      order.items = newItems;
      return order;
    }
    return order;
  };
}
