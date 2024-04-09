import { Genre } from "./genre.interface";

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
