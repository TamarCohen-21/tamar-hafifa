import {
  GetAllOrdersReq,
  OrderIdReq,
  AddOrderReq,
  OrderToUpdateReq,
} from "../protocOutput/order";
import { Response } from "express";
import OrderClient from "./orderClient";

export default class OrderController {
  static async getAllOrders(req: any, res: Response) {    
    const getAllOrdersReq: GetAllOrdersReq = {};
    res.json((await OrderClient.getAllOrders(getAllOrdersReq)).orders);
  }

  static async getOrderById(req: any, res: Response) {
    const orderIdReq: OrderIdReq = { id: req.params.id };
    res.json(await OrderClient.getOrderById(orderIdReq));
  }

  static async createOrder(req: any, res: Response) {
    const addOrderReq: AddOrderReq = {
      date: req.body.date,
      items: req.body.items,
    };
    res.json(await OrderClient.createOrder(addOrderReq));
  }

  static async deleteOrderById(req: any, res: Response) {
    const orderIdReq: OrderIdReq = { id: req.params.id };
    res.json(await OrderClient.deleteOrderById(orderIdReq));
  }

  static async updateOrder(req: any, res: Response) {
    const orderToUpdateReq: OrderToUpdateReq = {
      id: req.body.id,
      date: req.body.date,
      items: req.body.items,
    };
    res.json(await OrderClient.updateOrder(orderToUpdateReq));
  }
}
