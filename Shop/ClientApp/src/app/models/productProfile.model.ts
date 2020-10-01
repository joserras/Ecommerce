import { Image } from "./image.model";
import { Opinion } from "./opinion.model";

export class ProductProfile {
  img: Image[] = [];
  opinions: Opinion[] = [];
  name: string;
  stock: string;
  description: string;
  price: number;
  id: string;
  dateRegister: string;
}
