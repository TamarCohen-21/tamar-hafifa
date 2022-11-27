
export default interface OrderInterface {
  name: string;
  items?: Array<{ id: string; units: number }>;
  date?: Date;
}