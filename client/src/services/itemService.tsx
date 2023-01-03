import { http } from "../http-common";
import IItem from "../types/IItem";

const itemUrl = "/item";

export default class ItemService {
  static async getAll() {
    return (await http.get<Array<IItem>>(`${itemUrl}/`)).data;
  }

  static async buyItem(item: IItem) {
    return (await http.put(`${itemUrl}/buy/`, item)).data;
  }

  static async addUnitsToItem(units: any){
    return (await http.put(`${itemUrl}/add/units/`, units)).data;
  }
}
