import { Book } from "./book.interface";

export interface Genre {
	idGenre?: number;
	name: string;
	description: string;
	books?: Book[];
}

export interface GenreState {
	genres: Genre[];
	currentGenre: Genre | null;
}
