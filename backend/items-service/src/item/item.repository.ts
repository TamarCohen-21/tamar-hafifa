import { ItemModel } from "./itemModel";
import { Increment } from "mongoose-auto-increment-ts";
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
import { getMongoItemArray } from "../utils/item.utils";

export default class ItemRepository {
  static findAllItems = async (
    getAllItemsReq: GetAllItemsReq
  ): Promise<AllItems> => {
    const allItems: any = await ItemModel.find({});

    return { Items: getMongoItemArray(allItems) };
  };

  static findItemById = async (itemIdReq: ItemIdReq): Promise<Item> => {
    const item: any = await ItemModel.findById(itemIdReq.id);
    return item as Item;
  };

  static deleteItemById = async (itemIdReq: ItemIdReq): Promise<Item> => {
    const item: any = await ItemModel.findByIdAndDelete(itemIdReq.id);
    return item as Item;
  };

  static addItem = async (addItemReq: AddItemReq): Promise<Item> => {
    addItemReq.idNumber = await Increment("Item");
    const item: any = await ItemModel.create(addItemReq);

    return item as Item;
  };

  static updateItem = async (itemToUpdate: ItemToUpdate): Promise<Item> => {
    const item: any = await ItemModel.findByIdAndUpdate(
      itemToUpdate.id,
      itemToUpdate,
      {
        new: true,
      }
    );
    return item as Item;
  };

  static buyItemAndUpdate = async (
    itemToBuyAndUpdateReq: ItemToBuyAndUpdateReq,
    newUnitsToSet: number
  ): Promise<Item> => {
    const item: any = await ItemModel.findByIdAndUpdate(
      itemToBuyAndUpdateReq.id,
      { units: newUnitsToSet },
      { new: true }
    );

    return item as Item;
  };

  static addUnitsToItem = async (
    addUnitsToItemReq: AddUnitsToItemReq,
    newUnitsToSet: number
  ): Promise<Item> => {
    const item: any = await ItemModel.findByIdAndUpdate(
      addUnitsToItemReq.id,
      { units: newUnitsToSet },
      { new: true }
    );

    return item as Item;
  };
}
