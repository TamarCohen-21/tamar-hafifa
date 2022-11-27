import ItemRepository from "./item.repository";
import { ObjectId } from "mongoose-typescript";
import MyError from "../myError";
import {
  AllItems,
  Item,
  ItemIdReq,
  GetAllItemsReq,
  AddItemReq,
  ItemToUpdate,
  ItemToBuyAndUpdateReq,
  AddUnitsToItemReq,
} from "../protocOutput/item";

export default class ItemManager {
  static getAllItems = async (
    getAllItemsReq: GetAllItemsReq
  ): Promise<AllItems> => {
    return await ItemRepository.findAllItems(getAllItemsReq);
  };

  static getItemById = async (itemIdReq: ItemIdReq): Promise<Item> => {
    if (!ObjectId.isValid(itemIdReq.id))
      throw new MyError(500, "invalid item id");
    return await ItemRepository.findItemById(itemIdReq);
  };

  static deleteItemById = async (itemIdReq: ItemIdReq): Promise<Item> => {
    if (!ObjectId.isValid(itemIdReq.id))
      throw new MyError(500, "invalid item id");
    return await ItemRepository.deleteItemById(itemIdReq);
  };

  static addItem = async (addItemReq: AddItemReq): Promise<Item> => {
    return await ItemRepository.addItem(addItemReq);
  };

  static updateItem = async (itemToUpdate: ItemToUpdate): Promise<Item> => {
    if (!ObjectId.isValid(itemToUpdate.id))
      throw new MyError(500, "invalid item id");
    return await ItemRepository.updateItem(itemToUpdate);
  };

  static buyItemAndUpdate = async (
    itemToBuyAndUpdateReq: ItemToBuyAndUpdateReq
  ): Promise<Item> => {
    if (!ObjectId.isValid(itemToBuyAndUpdateReq.id))
      throw new MyError(500, "invalid item id");
    const itemIdReq: ItemIdReq = { id: itemToBuyAndUpdateReq.id };
    const currItem: Item = await ItemManager.getItemById(itemIdReq);
    if (currItem.units >= itemToBuyAndUpdateReq.unitsToOrder) {
      const newUnitsToSet: number =
        currItem.units - itemToBuyAndUpdateReq.unitsToOrder;
      return await ItemRepository.buyItemAndUpdate(
        itemToBuyAndUpdateReq,
        newUnitsToSet
      );
    }

    return currItem;
  };

  static addUnitsToItem = async (
    addUnitsToItemReq: AddUnitsToItemReq
  ): Promise<Item> => {
    if (!ObjectId.isValid(addUnitsToItemReq.id))
      throw new MyError(500, "invalid item id");
    const itemIdReq: ItemIdReq = { id: addUnitsToItemReq.id };
    const currItem: Item = await ItemManager.getItemById(itemIdReq);
    const newUnitsToSet: number = currItem.units + addUnitsToItemReq.unitsToAdd;
    return await ItemRepository.addUnitsToItem(
      addUnitsToItemReq,
      newUnitsToSet
    );
  };
}
