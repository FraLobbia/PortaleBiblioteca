import { Book } from "./book.interface";
import { User } from "./profile.interface";
import { ItemsEntity } from "./warehouse.interface";

export interface loanObjForm {
	idBook: string;
	IdUser: string;
}

export interface Loan {
	idLoan: number;
	loanDate: Date;
	returned: boolean;
	returnDate?: Date;
	idUser: number;
	user: User;
	item?: ItemsEntity;
	book: Book;
}
