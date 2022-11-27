import { Request, Response } from "express";
import ApiGatewayManager from "./apiGatewayManager";

export default class ApiGatewayController {
  static getAllOrders = async (req: Request, res: Response) => {
    res.json(await ApiGatewayManager.getAllOrders());
  };

  static getPopulatedOrderById = async (req: Request, res: Response) => {
    res.json(await ApiGatewayManager.getPopulatedOrderById(req.params.id));
  };
}
