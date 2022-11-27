import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  AllOrders,
  GetAllOrdersReq,
  Order,
  OrderIdReq,
  AddOrderReq,
  OrderToUpdateReq,
} from "../protocOutput/order";
import { ItemIdReq } from "../protocOutput/item";
import ItemClient from "../item/itemClient";
import { ORDERS_SERVER_PORT } from "../config";
import { findPath } from "../utils/path";

const PROTO_PATH = `${findPath("proto")}/order.proto`;
const packageDef: protoLoader.PackageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const grpcObject: grpc.GrpcObject = grpc.loadPackageDefinition(packageDef);
const ordersPackage: any = grpcObject.OrderService;
const client = new ordersPackage.OrderService(
  `0.0.0.0:${ORDERS_SERVER_PORT}`,
  grpc.credentials.createInsecure()
);

export default class OrderClient {
  static async getAllOrders(
    getAllOrdersReq: GetAllOrdersReq
  ): Promise<AllOrders> {
    const allOrders: AllOrders = await new Promise((resolve, reject) => {
      client.GetAllOrders(getAllOrdersReq, (err: any, response: AllOrders) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    const promisePopulatedOrders: any = allOrders.orders.map((order: Order) => {
      return OrderClient.getPopulatedOrder(order);
    });

    const populatedOrders: any = await Promise.all(promisePopulatedOrders);

    return { orders: populatedOrders };
  }

  static async getOrderById(orderIdReq: OrderIdReq): Promise<Order> {
    const order: Order = await new Promise((resolve, reject) => {
      client.GetOrderById(orderIdReq, (err: any, response: Order) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    return await OrderClient.getPopulatedOrder(order);
  }

  static async createOrder(addOrderReq: AddOrderReq): Promise<Order> {
    const order: Order = await new Promise((resolve, reject) => {
      client.CreateOrder(addOrderReq, (err: any, response: Order) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    return await OrderClient.getPopulatedOrder(order);
  }

  static async deleteOrderById(orderIdReq: OrderIdReq): Promise<Order> {
    const order: Order = await new Promise((resolve, reject) => {
      client.DeleteOrderById(orderIdReq, (err: any, response: Order) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    return await OrderClient.getPopulatedOrder(order);
  }

  static async updateOrder(orderToUpdateReq: OrderToUpdateReq): Promise<Order> {
    const order: Order = await new Promise((resolve, reject) => {
      client.UpdateOrder(orderToUpdateReq, (err: any, response: Order) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });

    return await OrderClient.getPopulatedOrder(order);
  }

  static async getPopulatedOrder(order: Order): Promise<Order> {
    const promiseItems = order.items.map(async(item: any) => {
      const itemIdReq: ItemIdReq = { id: item.id };
      const itemPop ={
        units: item.units,
        item: await ItemClient.getItemById(itemIdReq)
      };  
      return itemPop;
    });
    const result = await Promise.all(promiseItems);
    const populatedOrder: any = order as any;
    populatedOrder.items = result;
    return populatedOrder as Order;
  }
}
