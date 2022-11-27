import OrderRepository from "./order.repository";
import { ObjectId } from "mongoose-typescript";
import MyError from "../myError";
import {
  Order,
  AllOrders,
  GetAllOrdersReq,
  OrderIdReq,
  AddOrderReq,
  OrderToUpdateReq,
} from "../protocOutput/order";

export default class OrderManager {
  static getAllOrders = async (
    getAllOrdersReq: GetAllOrdersReq
  ): Promise<AllOrders> => {
    return await OrderRepository.findAllOrders(getAllOrdersReq);
  };

  static getOrderById = async (orderIdReq: OrderIdReq): Promise<Order> => {
    if (!ObjectId.isValid(orderIdReq.id))
      throw new MyError(500, "invalid order id");

    return await OrderRepository.findOrderById(orderIdReq);
  };

  static createOrder = async (addOrderReq: AddOrderReq): Promise<Order> => { 
    return await OrderRepository.createOrder(addOrderReq);
  };

  static deleteOrderById = async (orderIdReq: OrderIdReq): Promise<Order> => {
    if (!ObjectId.isValid(orderIdReq.id))
      throw new MyError(500, "invalid order id");

    return await OrderRepository.deleteOrderById(orderIdReq);
  };

  static updateOrder = async (
    orderToUpdateReq: OrderToUpdateReq
  ): Promise<Order> => {
    if (!ObjectId.isValid(orderToUpdateReq.id))
      throw new MyError(500, "invalid order id");

    return await OrderRepository.updateOrder(orderToUpdateReq);
  };
}
