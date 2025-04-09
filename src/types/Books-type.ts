import { IUsers } from "./User-type";

export interface IBooks {
  id: string;
  name: string;
  author: IUsers;
  authorId: number;
  image: string;
  describe: string;
  price: number;
}
