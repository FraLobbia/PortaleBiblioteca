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

export interface BookToEdit {
	idBook: number;
	author: string;
	title: string;
	description?: string;
	genre?: string;
	availableQuantity?: number;
	publicationDate?: Date;
	isbn?: string;
	coverImage?: string;
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
