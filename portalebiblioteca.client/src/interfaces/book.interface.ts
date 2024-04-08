import { Genre } from "./genre.interface";
import { Loan } from "./loans.interface";

export interface BookState {
	books: Book[];
	currentBook: Book | null;
	loansCurrentUser: Loan[];
}

export interface Book {
	idBook: number;
	author: string;
	title: string;
	description: string;
	idGenre: number;
	availableQuantity: number;
	warehouseQuantity: number;
	notAvailableQuantity: number;
	reservedToBePickedQuantity: number;
	atLibrarianDeskPickedQuantity: number;
	checkedOutForLoanQuantity: number;
	publicationDate: Date;
	isbn: string;
	coverImage: string;
	genre: Genre;
	reviews: null;
	loans: null;
}

export interface BookDTO {
	idBook?: number;
	author: string;
	title: string;
	description: string;
	idGenre: number;
	publicationDate?: Date;
	isbn: string;
	coverImage: string;
}

// export interface BookCreateForm {
// 	author: string;
// 	title: string;
// 	description?: string;
// 	idGenre?: number;
// 	genre: Genre;
// 	publicationDate?: Date;
// 	isbn?: string;
// 	coverImage?: string;
// }
