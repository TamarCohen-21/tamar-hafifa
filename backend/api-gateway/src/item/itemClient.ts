import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  Item,
  AllItems,
  GetAllItemsReq,
  ItemIdReq,
  AddItemReq,
  ItemToUpdate,
  ItemToBuyAndUpdateReq,
  AddUnitsToItemReq,
} from "../protocOutput/item";
import { ITEMS_SERVER_PORT } from "../config";
import { findPath } from "../utils/path";
const PROTO_PATH = `${findPath("proto")}/item.proto`;
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
const itemsPackage: any = grpcObject.ItemsService;
const client = new itemsPackage.ItemsService(
  `0.0.0.0:${ITEMS_SERVER_PORT}`,
  grpc.credentials.createInsecure()
);

export default class ItemClient {
  static async getAllItems(getAllItemsReq: GetAllItemsReq): Promise<AllItems> {
    return new Promise((resolve, reject) => {
      client.GetAllItems(getAllItemsReq, (err: any, response: AllItems) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async getItemById(itemIdReq: ItemIdReq): Promise<Item> {
    return new Promise((resolve, reject) => {
      client.GetItemById(itemIdReq, (err: any, response: Item) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async addItem(addItemReq: AddItemReq): Promise<Item> {
    return new Promise((resolve, reject) => {
      client.AddItem(addItemReq, (err: any, response: Item) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async deleteItemById(itemIdReq: ItemIdReq): Promise<Item> {
    return new Promise((resolve, reject) => {
      client.DeleteItemById(itemIdReq, (err: any, response: Item) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async updateItem(itemToUpdate: ItemToUpdate): Promise<Item> {
    return new Promise((resolve, reject) => {
      client.UpdateItem(itemToUpdate, (err: any, response: Item) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async buyItemAndUpdate(
    itemToBuyAndUpdateReq: ItemToBuyAndUpdateReq
  ): Promise<Item> {
    return new Promise((resolve, reject) => {
      client.BuyItemAndUpdate(
        itemToBuyAndUpdateReq,
        (err: any, response: Item) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  static async addUnitsToItem(
    addUnitsToItemReq: AddUnitsToItemReq
  ): Promise<Item> {
    return new Promise((resolve, reject) => {
      client.AddUnitsToItem(addUnitsToItemReq, (err: any, response: Item) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}
