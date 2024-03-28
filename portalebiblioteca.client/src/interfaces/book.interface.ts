// export interface Book {
// 	id: number; // Use 'id' instead of 'IdBooks' for clarity
// 	author: string;
// 	title: string;
// 	description?: string; // Optional property with type string
// 	genre: string;
// 	availableQuantity: number;
// 	loanQuantity: number;
// 	publicationDate: Date;
// 	isbn: string;
// 	coverImage?: string; // Optional property with type string
// }

export interface BookState {
	books: Book[];
	currentBook: Book | null;
}

export interface Book {
	idBook: number;
	author: string;
	title: string;
	description?: string;
	genre?: string;
	availableQuantity?: number;
	loanQuantity?: number;
	publicationDate?: Date;
	isbn?: string;
	coverImage?: string;
	locations?: null;
	reviews?: null;
	loans?: null;
}

export interface BookCreateForm {
	author: string;
	title: string;
	description?: string;
	genre?: string;
	publicationDate?: Date;
	isbn?: string;
	coverImage?: string;
}
