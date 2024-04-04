import { Book } from "./book.interface";
import { User } from "./profile.interface";

export interface loanObjForm {
	idBook: string;
	IdUser: string;
}

export interface Loan {
	idLoan: number;
	loanDate: Date;
	returned: boolean;
	returnDate?: Date;
	idBook: number;
	idUser: number;
	book: Book;
	user: User;
}
