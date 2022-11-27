import { Item } from "../protocOutput/item";

export function turnObjectIdsToStrings(document: any): void {
  //_id
  if (document._id) {
    document.id = document._id.toString();
  }
}

export function getMongoItemArray(itemsArray: any): Item[] {
  if (itemsArray) {
    const documents = itemsArray.map((mongoItem: any) => {
      const requestObj: any = mongoItem.toObject();
      turnObjectIdsToStrings(requestObj);
      return requestObj;
    });

    return documents as Item[];
  }

  return [];
}
