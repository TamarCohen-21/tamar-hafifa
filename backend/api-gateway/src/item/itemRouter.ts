import express from "express";
import ItemController from "./itemController";
import { errorWrapper } from "../utils";

const itemRouter = express.Router();

itemRouter.get("/", errorWrapper(ItemController.getAllItems));
itemRouter.get("/:id", errorWrapper(ItemController.getItemById));
itemRouter.post("/", errorWrapper(ItemController.createItem));
itemRouter.delete("/:id", errorWrapper(ItemController.deleteItemById));
itemRouter.put("/", errorWrapper(ItemController.updateItem));
itemRouter.put("/buy", errorWrapper(ItemController.buyItemAndUpdate));
itemRouter.put(
  "/add/units",
  errorWrapper(ItemController.addUnitsToItem)
);

export default itemRouter;
