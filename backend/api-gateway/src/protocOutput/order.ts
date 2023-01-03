/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "OrderService";

export interface GetAllOrdersReq {
}

export interface Order {
  id: string;
  idNumber: number;
  date: string;
  items: items[];
}

export interface AllOrders {
  orders: Order[];
}

export interface OrderIdReq {
  id: string;
}

export interface AddOrderReq {
  date?: string | undefined;
  items: items[];
  idNumber?: number | undefined;
}

export interface items {
  id: string;
  units: number;
}

export interface OrderToUpdateReq {
  date: string;
  items: items[];
  id: string;
}

function createBaseGetAllOrdersReq(): GetAllOrdersReq {
  return {};
}

export const GetAllOrdersReq = {
  encode(_: GetAllOrdersReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAllOrdersReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllOrdersReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetAllOrdersReq {
    return {};
  },

  toJSON(_: GetAllOrdersReq): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAllOrdersReq>, I>>(_: I): GetAllOrdersReq {
    const message = createBaseGetAllOrdersReq();
    return message;
  },
};

function createBaseOrder(): Order {
  return { id: "", idNumber: 0, date: "", items: [] };
}

export const Order = {
  encode(message: Order, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.idNumber !== 0) {
      writer.uint32(16).int32(message.idNumber);
    }
    if (message.date !== "") {
      writer.uint32(26).string(message.date);
    }
    for (const v of message.items) {
      items.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.idNumber = reader.int32();
          break;
        case 3:
          message.date = reader.string();
          break;
        case 4:
          message.items.push(items.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Order {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      idNumber: isSet(object.idNumber) ? Number(object.idNumber) : 0,
      date: isSet(object.date) ? String(object.date) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => items.fromJSON(e)) : [],
    };
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.idNumber !== undefined && (obj.idNumber = Math.round(message.idNumber));
    message.date !== undefined && (obj.date = message.date);
    if (message.items) {
      obj.items = message.items.map((e) => e ? items.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Order>, I>>(object: I): Order {
    const message = createBaseOrder();
    message.id = object.id ?? "";
    message.idNumber = object.idNumber ?? 0;
    message.date = object.date ?? "";
    message.items = object.items?.map((e) => items.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAllOrders(): AllOrders {
  return { orders: [] };
}

export const AllOrders = {
  encode(message: AllOrders, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllOrders {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllOrders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AllOrders {
    return { orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => Order.fromJSON(e)) : [] };
  },

  toJSON(message: AllOrders): unknown {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? Order.toJSON(e) : undefined);
    } else {
      obj.orders = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllOrders>, I>>(object: I): AllOrders {
    const message = createBaseAllOrders();
    message.orders = object.orders?.map((e) => Order.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrderIdReq(): OrderIdReq {
  return { id: "" };
}

export const OrderIdReq = {
  encode(message: OrderIdReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderIdReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderIdReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OrderIdReq {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: OrderIdReq): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrderIdReq>, I>>(object: I): OrderIdReq {
    const message = createBaseOrderIdReq();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseAddOrderReq(): AddOrderReq {
  return { date: undefined, items: [], idNumber: undefined };
}

export const AddOrderReq = {
  encode(message: AddOrderReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.date !== undefined) {
      writer.uint32(10).string(message.date);
    }
    for (const v of message.items) {
      items.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.idNumber !== undefined) {
      writer.uint32(24).int32(message.idNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddOrderReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddOrderReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = reader.string();
          break;
        case 2:
          message.items.push(items.decode(reader, reader.uint32()));
          break;
        case 3:
          message.idNumber = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddOrderReq {
    return {
      date: isSet(object.date) ? String(object.date) : undefined,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => items.fromJSON(e)) : [],
      idNumber: isSet(object.idNumber) ? Number(object.idNumber) : undefined,
    };
  },

  toJSON(message: AddOrderReq): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date);
    if (message.items) {
      obj.items = message.items.map((e) => e ? items.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    message.idNumber !== undefined && (obj.idNumber = Math.round(message.idNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddOrderReq>, I>>(object: I): AddOrderReq {
    const message = createBaseAddOrderReq();
    message.date = object.date ?? undefined;
    message.items = object.items?.map((e) => items.fromPartial(e)) || [];
    message.idNumber = object.idNumber ?? undefined;
    return message;
  },
};

function createBaseitems(): items {
  return { id: "", units: 0 };
}

export const items = {
  encode(message: items, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.units !== 0) {
      writer.uint32(16).int32(message.units);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): items {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseitems();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.units = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): items {
    return { id: isSet(object.id) ? String(object.id) : "", units: isSet(object.units) ? Number(object.units) : 0 };
  },

  toJSON(message: items): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.units !== undefined && (obj.units = Math.round(message.units));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<items>, I>>(object: I): items {
    const message = createBaseitems();
    message.id = object.id ?? "";
    message.units = object.units ?? 0;
    return message;
  },
};

function createBaseOrderToUpdateReq(): OrderToUpdateReq {
  return { date: "", items: [], id: "" };
}

export const OrderToUpdateReq = {
  encode(message: OrderToUpdateReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.date !== "") {
      writer.uint32(10).string(message.date);
    }
    for (const v of message.items) {
      items.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderToUpdateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderToUpdateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = reader.string();
          break;
        case 2:
          message.items.push(items.decode(reader, reader.uint32()));
          break;
        case 3:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OrderToUpdateReq {
    return {
      date: isSet(object.date) ? String(object.date) : "",
      items: Array.isArray(object?.items) ? object.items.map((e: any) => items.fromJSON(e)) : [],
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: OrderToUpdateReq): unknown {
    const obj: any = {};
    message.date !== undefined && (obj.date = message.date);
    if (message.items) {
      obj.items = message.items.map((e) => e ? items.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrderToUpdateReq>, I>>(object: I): OrderToUpdateReq {
    const message = createBaseOrderToUpdateReq();
    message.date = object.date ?? "";
    message.items = object.items?.map((e) => items.fromPartial(e)) || [];
    message.id = object.id ?? "";
    return message;
  },
};

export interface OrderService {
  GetAllOrders(request: GetAllOrdersReq): Promise<AllOrders>;
  GetOrderById(request: OrderIdReq): Promise<Order>;
  DeleteOrderById(request: OrderIdReq): Promise<Order>;
  CreateOrder(request: AddOrderReq): Promise<Order>;
  UpdateOrder(request: OrderToUpdateReq): Promise<Order>;
}

export class OrderServiceClientImpl implements OrderService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAllOrders = this.GetAllOrders.bind(this);
    this.GetOrderById = this.GetOrderById.bind(this);
    this.DeleteOrderById = this.DeleteOrderById.bind(this);
    this.CreateOrder = this.CreateOrder.bind(this);
    this.UpdateOrder = this.UpdateOrder.bind(this);
  }
  GetAllOrders(request: GetAllOrdersReq): Promise<AllOrders> {
    const data = GetAllOrdersReq.encode(request).finish();
    const promise = this.rpc.request("OrderService.OrderService", "GetAllOrders", data);
    return promise.then((data) => AllOrders.decode(new _m0.Reader(data)));
  }

  GetOrderById(request: OrderIdReq): Promise<Order> {
    const data = OrderIdReq.encode(request).finish();
    const promise = this.rpc.request("OrderService.OrderService", "GetOrderById", data);
    return promise.then((data) => Order.decode(new _m0.Reader(data)));
  }

  DeleteOrderById(request: OrderIdReq): Promise<Order> {
    const data = OrderIdReq.encode(request).finish();
    const promise = this.rpc.request("OrderService.OrderService", "DeleteOrderById", data);
    return promise.then((data) => Order.decode(new _m0.Reader(data)));
  }

  CreateOrder(request: AddOrderReq): Promise<Order> {
    const data = AddOrderReq.encode(request).finish();
    const promise = this.rpc.request("OrderService.OrderService", "CreateOrder", data);
    return promise.then((data) => Order.decode(new _m0.Reader(data)));
  }

  UpdateOrder(request: OrderToUpdateReq): Promise<Order> {
    const data = OrderToUpdateReq.encode(request).finish();
    const promise = this.rpc.request("OrderService.OrderService", "UpdateOrder", data);
    return promise.then((data) => Order.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
