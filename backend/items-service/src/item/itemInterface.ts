export default interface ItemInterface {
  _id: string;
  name: string;
  price: number;
  category: string;
  idNumber?: number;
  units: number;
  imageUrl?: string;
  unitsToOrder?: number;
}
