import { OrderModel } from "./orderModel";
import { Increment } from "mongoose-auto-increment-ts";
import {
  GetAllOrdersReq,
  AllOrders,
  Order,
  OrderIdReq,
  AddOrderReq,
  OrderToUpdateReq,
} from "../protocOutput/order";
import { getMongoOrderArray } from "../utils/order.utils";

export default class OrderRepository {
  static findAllOrders = async (
    _getAllOrdersReq: GetAllOrdersReq
  ): Promise<AllOrders> => {
    const allOrders: any = await OrderModel.find({});
    return { orders: getMongoOrderArray(allOrders) };
  };

  static findOrderById = async (orderIdReq: OrderIdReq): Promise<Order> => {
    const order: any = await OrderModel.findById(orderIdReq.id);
    return order as Order;
  };

  static createOrder = async (addOrderReq: AddOrderReq): Promise<Order> => {   
    addOrderReq.idNumber = await Increment("Order");
    const order: any = await OrderModel.create(addOrderReq);
    return order as Order;
  };

  static deleteOrderById = async (orderIdReq: OrderIdReq): Promise<Order> => {
    const order: any = await OrderModel.findByIdAndDelete(orderIdReq.id);
    return order as Order;
  };

  static updateOrder = async (
    orderToUpdateReq: OrderToUpdateReq
  ): Promise<Order> => {
    const order: any = await OrderModel.findByIdAndUpdate(
      orderToUpdateReq.id,
      orderToUpdateReq,
      { new: true }
    );

    return order as Order;
  };
}
