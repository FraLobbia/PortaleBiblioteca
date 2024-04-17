import { Book } from "./book.interface";
import { User } from "./profile.interface";

export interface Aisle {
	idAisle: number;
	aisleNumber: number;
	Shelves?: Shelf[];
}

export interface Shelf {
	idShelf: number;
	idAisle: number;
	shelfHeight: Height;
	shelfBay: number;
	shelfName: string;
	shelfType: Type;
	items: ItemsEntity[];
	aisle: Aisle;
}

export enum Height {
	A = "A",
	B = "B",
	C = "C",
	D = "D",
	E = "E",
}

export enum Type {
	LibrarianDesk = 0,
	Warehouse = 1,
	Virtual = 2,
	Physical = 3,
}

export interface ItemsEntity {
	idItemsEntity: number;
	ownerId: number;
	user?: User;
	idBook: number;
	changeTime: Date;
	quantity: number;
	status: ItemsEntityStatus;
	idShelf: number;
	book: Book;
	shelf: Shelf;
}

export enum ItemsEntityStatus {
	Available = "Available",
	NotAvailable = "NotAvailable",
	ReservedToBePicked = "ReservedToBePicked",
	AtLibrarianDesk = "AtLibrarianDesk",
	AtWarehouse = "AtWarehouse",
	CheckedOutForLoan = "CheckedOutForLoan",
}

export interface MoveObject {
	moveSourceShelfId: number;
	idBook: number;
	quantity: number;
	idAisle: number;
	shelfBay: number;
	heightChar: string;
}
