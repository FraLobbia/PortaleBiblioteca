import { Book } from "./book.interface";

export interface Genre {
	idGenre?: number;
	name: string;
	description: string;
	books?: Book[];
}
