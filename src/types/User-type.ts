import { IBooks } from "./Books-type";

export interface IUsers {
    id: number;
    password: string;
    email: string;
    books: IBooks[]
}