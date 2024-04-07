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
	description?: string;
	idGenre?: number;
	genre?: Genre;
	availableQuantity?: number;
	loanQuantity?: number;
	publicationDate?: Date;
	isbn?: string;
	coverImage?: string;
	locations?: null;
	reviews?: null;
	loans?: null;
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
