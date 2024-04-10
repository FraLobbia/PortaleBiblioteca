import { Book } from "./book.interface";
import { User } from "./profile.interface";

export interface Review {
	idReview?: number;
	idBook: number;
	idUser: number;
	reviewTitle: string;
	reviewBody: string;
	book?: Book;
	User?: User;
}
