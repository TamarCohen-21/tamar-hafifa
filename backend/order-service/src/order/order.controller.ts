import OrderManager from "./order.manager";
import * as grpc from "@grpc/grpc-js";
import { Order, AllOrders } from "../protocOutput/order";

export default class OrderController {
  static getAllOrders = async (call: any, callback: any) => {
    try {
      const allOrders: AllOrders = await OrderManager.getAllOrders(
        call.request
      );
      callback(null, allOrders);
    } catch (error: any) {
      callback(
        {
          code: 400,
          message: error.message,
          status: grpc.status.CANCELLED,
        },
        null
      );
    }
  };

  static getOrderById = async (call: any, callback: any) => {
    try {
      const order: Order = await OrderManager.getOrderById(call.request);
      callback(null, order);
    } catch (error: any) {
      callback(
        {
          code: 400,
          message: error.message,
          status: grpc.status.CANCELLED,
        },
        null
      );
    }
  };

  static createOrder = async (call: any, callback: any) => {
    try {  
      console.log(call.request);
       
      const order: Order = await OrderManager.createOrder(call.request);
      callback(null, order);
    } catch (error: any) {
      callback(
        {
          code: 400,
          message: error.message,
          status: grpc.status.CANCELLED,
        },
        null
      );
    }
  };

  static deleteOrderById = async (call: any, callback: any) => {
    try {
      const order: Order = await OrderManager.deleteOrderById(call.request);
      callback(null, order);
    } catch (error: any) {
      callback(
        {
          code: 400,
          message: error.message,
          status: grpc.status.CANCELLED,
        },
        null
      );
    }
  };

  static updateOrder = async (call: any, callback: any) => {
    try {
      const order: Order = await OrderManager.updateOrder(call.request);
      callback(null, order);
    } catch (error: any) {
      callback(
        {
          code: 400,
          message: error.message,
          status: grpc.status.CANCELLED,
        },
        null
      );
    }
  };
}
