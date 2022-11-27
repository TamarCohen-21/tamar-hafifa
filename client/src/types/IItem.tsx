interface IItem {
  id: string;
  name: string;
  price: number;
  category: string;
  idNumber?: number;
  units: number;
  unitsToOrder?: number;
  unitsToAdd?: number;
}

export default IItem;