import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import OrderController from "./order/order.controller";
import { findPath } from "./utils/path";
import config from "./config";
const PROTO_PATH = `${findPath("proto")}/order.proto`;
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
const ordersPackage: any = grpcObject.OrderService;
const server = new grpc.Server();

server.addService(ordersPackage.OrderService.service, {
  GetAllOrders: OrderController.getAllOrders,
  GetOrderById: OrderController.getOrderById,
  CreateOrder: OrderController.createOrder,
  DeleteOrderById: OrderController.deleteOrderById,
  UpdateOrder: OrderController.updateOrder,
});

server.bindAsync(
  `0.0.0.0:${config.SERVER_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`Order server is currently running at port: ${port}`);
    server.start();
  }
);
