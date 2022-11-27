import { Response } from "express";
import {
  GetAllItemsReq,
  ItemIdReq,
  AddItemReq,
  ItemToUpdate,
  ItemToBuyAndUpdateReq,
  AddUnitsToItemReq,
} from "../protocOutput/item";
import ItemClient from "./itemClient";

export default class ItemController {
  static async getAllItems(req: any, res: Response) {
    const getAllItemsReq: GetAllItemsReq = {};
    res.json((await ItemClient.getAllItems(getAllItemsReq)).Items);
  }

  static async getItemById(req: any, res: Response) {
    const itemIdReq: ItemIdReq = { id: req.params.id };
    res.json(await ItemClient.getItemById(itemIdReq));
  }

  static async createItem(req: any, res: Response) {
    const addItemReq: AddItemReq = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      units: req.body.units,
      imageUrl: req.body.imageUrl,
      idNumber: req.body.idNumber,
    };
    res.json(await ItemClient.addItem(addItemReq));
  }

  static async deleteItemById(req: any, res: Response) {
    const itemIdReq: ItemIdReq = { id: req.params.id };
    res.json(await ItemClient.deleteItemById(itemIdReq));
  }

  static async updateItem(req: any, res: Response) {
    const itemToUpdate: ItemToUpdate = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      units: req.body.units,
      id: req.body.id,
      imageUrl: req.body.imageUrl,
    };
    res.json(await ItemClient.updateItem(itemToUpdate));
  }

  static async buyItemAndUpdate(req: any, res: Response) {
    const itemToBuyAndUpdateReq: ItemToBuyAndUpdateReq = {
      id: req.body.id,
      unitsToOrder: req.body.unitsToOrder,
    };
    console.log(req.body.unitsToOrder);
    
    res.json(await ItemClient.buyItemAndUpdate(itemToBuyAndUpdateReq));
  }

  static async addUnitsToItem(req: any, res: Response) {
    const addUnitsToItemReq: AddUnitsToItemReq = {
      id: req.body.id,
      unitsToAdd: req.body.unitsToAdd,
    };
    res.json(await ItemClient.addUnitsToItem(addUnitsToItemReq));
  }
}
