import express from "express";
import OrderController from "./orderController";
import { errorWrapper } from "../utils";

const 
orderRouter = express.Router();

orderRouter.get("/", errorWrapper(OrderController.getAllOrders));
orderRouter.get("/:id", errorWrapper(OrderController.getOrderById));
orderRouter.post("/", errorWrapper(OrderController.createOrder));
orderRouter.delete("/:id", errorWrapper(OrderController.deleteOrderById));
orderRouter.put("/", errorWrapper(OrderController.updateOrder));

export default orderRouter;
