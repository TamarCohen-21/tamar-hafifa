import ItemManager from "./item.manager";
import * as grpc from "@grpc/grpc-js";
import { AllItems, Item } from "../protocOutput/item";

export default class ItemController {
  static getAllItems = async (call: any, callback: any) => {
    try {
      const allItems: AllItems = await ItemManager.getAllItems(call.request);
      callback(null, allItems);
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

  static getItemById = async (call: any, callback: any) => {
    try {
      const item: Item = await ItemManager.getItemById(call.request);
      callback(null, item);
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

  static deleteItemById = async (call: any, callback: any) => {
    try {
      const item: Item = await ItemManager.deleteItemById(call.request);
      callback(null, item);
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

  static addItem = async (call: any, callback: any) => {
    try {
      const item: Item = await ItemManager.addItem(call.request);
      callback(null, item);
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

  static updateItem = async (call: any, callback: any) => {
    try {
      const item: Item = await ItemManager.updateItem(call.request);
      callback(null, item);
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

  static buyItemAndUpdate = async (call: any, callback: any) => {
    try {
      const item: Item = await ItemManager.buyItemAndUpdate(call.request);
      callback(null, item);
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

  static addUnitsToItem = async (call: any, callback: any) => {
    try {
      const item: Item = await ItemManager.addUnitsToItem(call.request);
      callback(null, item);
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
