import { Book } from "./book.interface";

export interface Genre {
	idGenre?: number | null;
	name: string;
	description: string;
	books?: Book[];
}
