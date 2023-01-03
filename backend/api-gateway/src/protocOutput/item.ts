/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "ItemsService";

export enum Category {
  FRUITS = 0,
  VEGETABLES = 1,
  FAT = 2,
  PROTEIN = 3,
  DAIRY = 4,
  SWEETS = 5,
  CARBOHYDRATES = 6,
  MEAT = 7,
  UNRECOGNIZED = -1,
}

export function categoryFromJSON(object: any): Category {
  switch (object) {
    case 0:
    case "FRUITS":
      return Category.FRUITS;
    case 1:
    case "VEGETABLES":
      return Category.VEGETABLES;
    case 2:
    case "FAT":
      return Category.FAT;
    case 3:
    case "PROTEIN":
      return Category.PROTEIN;
    case 4:
    case "DAIRY":
      return Category.DAIRY;
    case 5:
    case "SWEETS":
      return Category.SWEETS;
    case 6:
    case "CARBOHYDRATES":
      return Category.CARBOHYDRATES;
    case 7:
    case "MEAT":
      return Category.MEAT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Category.UNRECOGNIZED;
  }
}

export function categoryToJSON(object: Category): string {
  switch (object) {
    case Category.FRUITS:
      return "FRUITS";
    case Category.VEGETABLES:
      return "VEGETABLES";
    case Category.FAT:
      return "FAT";
    case Category.PROTEIN:
      return "PROTEIN";
    case Category.DAIRY:
      return "DAIRY";
    case Category.SWEETS:
      return "SWEETS";
    case Category.CARBOHYDRATES:
      return "CARBOHYDRATES";
    case Category.MEAT:
      return "MEAT";
    case Category.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetAllItemsReq {
}

export interface ItemIdReq {
  id: string;
}

export interface Item {
  name: string;
  price: number;
  category: Category;
  units: number;
  idNumber: number;
  imageUrl: string;
  id: string;
}

export interface AddItemReq {
  name: string;
  price: number;
  category: Category;
  units: number;
  imageUrl?: string | undefined;
  idNumber?: number | undefined;
}

export interface ItemToUpdate {
  name: string;
  price: number;
  category: Category;
  units: number;
  id: string;
  imageUrl?: string | undefined;
}

export interface ItemToBuyAndUpdateReq {
  id: string;
  unitsToOrder: number;
}

export interface AddUnitsToItemReq {
  id: string;
  unitsToAdd: number;
}

export interface AllItems {
  Items: Item[];
}

function createBaseGetAllItemsReq(): GetAllItemsReq {
  return {};
}

export const GetAllItemsReq = {
  encode(_: GetAllItemsReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAllItemsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllItemsReq();
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

  fromJSON(_: any): GetAllItemsReq {
    return {};
  },

  toJSON(_: GetAllItemsReq): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAllItemsReq>, I>>(_: I): GetAllItemsReq {
    const message = createBaseGetAllItemsReq();
    return message;
  },
};

function createBaseItemIdReq(): ItemIdReq {
  return { id: "" };
}

export const ItemIdReq = {
  encode(message: ItemIdReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemIdReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemIdReq();
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

  fromJSON(object: any): ItemIdReq {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: ItemIdReq): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemIdReq>, I>>(object: I): ItemIdReq {
    const message = createBaseItemIdReq();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseItem(): Item {
  return { name: "", price: 0, category: 0, units: 0, idNumber: 0, imageUrl: "", id: "" };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.price !== 0) {
      writer.uint32(16).int32(message.price);
    }
    if (message.category !== 0) {
      writer.uint32(24).int32(message.category);
    }
    if (message.units !== 0) {
      writer.uint32(32).int32(message.units);
    }
    if (message.idNumber !== 0) {
      writer.uint32(40).int32(message.idNumber);
    }
    if (message.imageUrl !== "") {
      writer.uint32(50).string(message.imageUrl);
    }
    if (message.id !== "") {
      writer.uint32(58).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.price = reader.int32();
          break;
        case 3:
          message.category = reader.int32() as any;
          break;
        case 4:
          message.units = reader.int32();
          break;
        case 5:
          message.idNumber = reader.int32();
          break;
        case 6:
          message.imageUrl = reader.string();
          break;
        case 7:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      category: isSet(object.category) ? categoryFromJSON(object.category) : 0,
      units: isSet(object.units) ? Number(object.units) : 0,
      idNumber: isSet(object.idNumber) ? Number(object.idNumber) : 0,
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.price !== undefined && (obj.price = Math.round(message.price));
    message.category !== undefined && (obj.category = categoryToJSON(message.category));
    message.units !== undefined && (obj.units = Math.round(message.units));
    message.idNumber !== undefined && (obj.idNumber = Math.round(message.idNumber));
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.name = object.name ?? "";
    message.price = object.price ?? 0;
    message.category = object.category ?? 0;
    message.units = object.units ?? 0;
    message.idNumber = object.idNumber ?? 0;
    message.imageUrl = object.imageUrl ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseAddItemReq(): AddItemReq {
  return { name: "", price: 0, category: 0, units: 0, imageUrl: undefined, idNumber: undefined };
}

export const AddItemReq = {
  encode(message: AddItemReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.price !== 0) {
      writer.uint32(16).int32(message.price);
    }
    if (message.category !== 0) {
      writer.uint32(24).int32(message.category);
    }
    if (message.units !== 0) {
      writer.uint32(32).int32(message.units);
    }
    if (message.imageUrl !== undefined) {
      writer.uint32(42).string(message.imageUrl);
    }
    if (message.idNumber !== undefined) {
      writer.uint32(48).int32(message.idNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddItemReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddItemReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.price = reader.int32();
          break;
        case 3:
          message.category = reader.int32() as any;
          break;
        case 4:
          message.units = reader.int32();
          break;
        case 5:
          message.imageUrl = reader.string();
          break;
        case 6:
          message.idNumber = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddItemReq {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      category: isSet(object.category) ? categoryFromJSON(object.category) : 0,
      units: isSet(object.units) ? Number(object.units) : 0,
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : undefined,
      idNumber: isSet(object.idNumber) ? Number(object.idNumber) : undefined,
    };
  },

  toJSON(message: AddItemReq): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.price !== undefined && (obj.price = Math.round(message.price));
    message.category !== undefined && (obj.category = categoryToJSON(message.category));
    message.units !== undefined && (obj.units = Math.round(message.units));
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.idNumber !== undefined && (obj.idNumber = Math.round(message.idNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddItemReq>, I>>(object: I): AddItemReq {
    const message = createBaseAddItemReq();
    message.name = object.name ?? "";
    message.price = object.price ?? 0;
    message.category = object.category ?? 0;
    message.units = object.units ?? 0;
    message.imageUrl = object.imageUrl ?? undefined;
    message.idNumber = object.idNumber ?? undefined;
    return message;
  },
};

function createBaseItemToUpdate(): ItemToUpdate {
  return { name: "", price: 0, category: 0, units: 0, id: "", imageUrl: undefined };
}

export const ItemToUpdate = {
  encode(message: ItemToUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.price !== 0) {
      writer.uint32(16).int32(message.price);
    }
    if (message.category !== 0) {
      writer.uint32(24).int32(message.category);
    }
    if (message.units !== 0) {
      writer.uint32(32).int32(message.units);
    }
    if (message.id !== "") {
      writer.uint32(42).string(message.id);
    }
    if (message.imageUrl !== undefined) {
      writer.uint32(50).string(message.imageUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemToUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemToUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.price = reader.int32();
          break;
        case 3:
          message.category = reader.int32() as any;
          break;
        case 4:
          message.units = reader.int32();
          break;
        case 5:
          message.id = reader.string();
          break;
        case 6:
          message.imageUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemToUpdate {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      category: isSet(object.category) ? categoryFromJSON(object.category) : 0,
      units: isSet(object.units) ? Number(object.units) : 0,
      id: isSet(object.id) ? String(object.id) : "",
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : undefined,
    };
  },

  toJSON(message: ItemToUpdate): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.price !== undefined && (obj.price = Math.round(message.price));
    message.category !== undefined && (obj.category = categoryToJSON(message.category));
    message.units !== undefined && (obj.units = Math.round(message.units));
    message.id !== undefined && (obj.id = message.id);
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemToUpdate>, I>>(object: I): ItemToUpdate {
    const message = createBaseItemToUpdate();
    message.name = object.name ?? "";
    message.price = object.price ?? 0;
    message.category = object.category ?? 0;
    message.units = object.units ?? 0;
    message.id = object.id ?? "";
    message.imageUrl = object.imageUrl ?? undefined;
    return message;
  },
};

function createBaseItemToBuyAndUpdateReq(): ItemToBuyAndUpdateReq {
  return { id: "", unitsToOrder: 0 };
}

export const ItemToBuyAndUpdateReq = {
  encode(message: ItemToBuyAndUpdateReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.unitsToOrder !== 0) {
      writer.uint32(16).int32(message.unitsToOrder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemToBuyAndUpdateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemToBuyAndUpdateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.unitsToOrder = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemToBuyAndUpdateReq {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      unitsToOrder: isSet(object.unitsToOrder) ? Number(object.unitsToOrder) : 0,
    };
  },

  toJSON(message: ItemToBuyAndUpdateReq): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.unitsToOrder !== undefined && (obj.unitsToOrder = Math.round(message.unitsToOrder));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemToBuyAndUpdateReq>, I>>(object: I): ItemToBuyAndUpdateReq {
    const message = createBaseItemToBuyAndUpdateReq();
    message.id = object.id ?? "";
    message.unitsToOrder = object.unitsToOrder ?? 0;
    return message;
  },
};

function createBaseAddUnitsToItemReq(): AddUnitsToItemReq {
  return { id: "", unitsToAdd: 0 };
}

export const AddUnitsToItemReq = {
  encode(message: AddUnitsToItemReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.unitsToAdd !== 0) {
      writer.uint32(16).int32(message.unitsToAdd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddUnitsToItemReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddUnitsToItemReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.unitsToAdd = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddUnitsToItemReq {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      unitsToAdd: isSet(object.unitsToAdd) ? Number(object.unitsToAdd) : 0,
    };
  },

  toJSON(message: AddUnitsToItemReq): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.unitsToAdd !== undefined && (obj.unitsToAdd = Math.round(message.unitsToAdd));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddUnitsToItemReq>, I>>(object: I): AddUnitsToItemReq {
    const message = createBaseAddUnitsToItemReq();
    message.id = object.id ?? "";
    message.unitsToAdd = object.unitsToAdd ?? 0;
    return message;
  },
};

function createBaseAllItems(): AllItems {
  return { Items: [] };
}

export const AllItems = {
  encode(message: AllItems, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Items) {
      Item.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllItems {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllItems();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Items.push(Item.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AllItems {
    return { Items: Array.isArray(object?.Items) ? object.Items.map((e: any) => Item.fromJSON(e)) : [] };
  },

  toJSON(message: AllItems): unknown {
    const obj: any = {};
    if (message.Items) {
      obj.Items = message.Items.map((e) => e ? Item.toJSON(e) : undefined);
    } else {
      obj.Items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllItems>, I>>(object: I): AllItems {
    const message = createBaseAllItems();
    message.Items = object.Items?.map((e) => Item.fromPartial(e)) || [];
    return message;
  },
};

export interface ItemsService {
  GetAllItems(request: GetAllItemsReq): Promise<AllItems>;
  GetItemById(request: ItemIdReq): Promise<Item>;
  DeleteItemById(request: ItemIdReq): Promise<Item>;
  AddItem(request: AddItemReq): Promise<Item>;
  UpdateItem(request: ItemToUpdate): Promise<Item>;
  BuyItemAndUpdate(request: ItemToBuyAndUpdateReq): Promise<Item>;
  AddUnitsToItem(request: AddUnitsToItemReq): Promise<Item>;
}

export class ItemsServiceClientImpl implements ItemsService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAllItems = this.GetAllItems.bind(this);
    this.GetItemById = this.GetItemById.bind(this);
    this.DeleteItemById = this.DeleteItemById.bind(this);
    this.AddItem = this.AddItem.bind(this);
    this.UpdateItem = this.UpdateItem.bind(this);
    this.BuyItemAndUpdate = this.BuyItemAndUpdate.bind(this);
    this.AddUnitsToItem = this.AddUnitsToItem.bind(this);
  }
  GetAllItems(request: GetAllItemsReq): Promise<AllItems> {
    const data = GetAllItemsReq.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "GetAllItems", data);
    return promise.then((data) => AllItems.decode(new _m0.Reader(data)));
  }

  GetItemById(request: ItemIdReq): Promise<Item> {
    const data = ItemIdReq.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "GetItemById", data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
  }

  DeleteItemById(request: ItemIdReq): Promise<Item> {
    const data = ItemIdReq.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "DeleteItemById", data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
  }

  AddItem(request: AddItemReq): Promise<Item> {
    const data = AddItemReq.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "AddItem", data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
  }

  UpdateItem(request: ItemToUpdate): Promise<Item> {
    const data = ItemToUpdate.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "UpdateItem", data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
  }

  BuyItemAndUpdate(request: ItemToBuyAndUpdateReq): Promise<Item> {
    const data = ItemToBuyAndUpdateReq.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "BuyItemAndUpdate", data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
  }

  AddUnitsToItem(request: AddUnitsToItemReq): Promise<Item> {
    const data = AddUnitsToItemReq.encode(request).finish();
    const promise = this.rpc.request("ItemsService.ItemsService", "AddUnitsToItem", data);
    return promise.then((data) => Item.decode(new _m0.Reader(data)));
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
