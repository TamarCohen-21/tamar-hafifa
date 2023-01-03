import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { findPath } from "./utils/path";
import config from "./config";
import ItemController from "./item/item.controller";
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
const server = new grpc.Server();

server.addService(itemsPackage.ItemsService.service, {
  GetAllItems: ItemController.getAllItems,
  GetItemById: ItemController.getItemById,
  DeleteItemById: ItemController.deleteItemById,
  AddItem: ItemController.addItem,
  UpdateItem: ItemController.updateItem,
  BuyItemAndUpdate: ItemController.buyItemAndUpdate,
  AddUnitsToItem: ItemController.addUnitsToItem,
});

server.bindAsync(
  `0.0.0.0:${config.SERVER_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Item server is currently running at port: ${port}`);
    server.start();
  }
);
