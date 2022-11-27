import { Order } from "../protocOutput/order";

export function turnObjectIdsToStrings(document: any): void {
  //_id
  if (document._id) {
    document.id = document._id.toString();
  }
}

export function getMongoOrderArray(ordersArray: any): Order[] {
  if (ordersArray) {
    const documents = ordersArray.map((mongoItem: any) => {
      const requestObj: any = mongoItem.toObject();
      turnObjectIdsToStrings(requestObj);
      return requestObj;
    });

    return documents as Order[];
  }

  return [];
}
