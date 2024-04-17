import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../interfaces/book.interface";
import { ItemsEntity } from "../../interfaces/warehouse.interface";

interface BookState {
	books: Book[];
	currentBook: Book | null;
	bookEntities: ItemsEntity[];
}

const initialState: BookState = {
	books: [],
	currentBook: null,
	bookEntities: [],
};
//=================================================================================
const bookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		setBooks(state, action: { payload: Book[] }) {
			state.books = action.payload;
		},
		setCurrentBook(state, action: { payload: Book }) {
			state.currentBook = action.payload;
		},
		setBookEntities(state, action: { payload: ItemsEntity[] }) {
			state.bookEntities = action.payload;
		},
		DEBUG_emptyBooks(state) {
			state.books = [];
		},
	},
});
//=================================================================================
export const {
	setBooks,
	setCurrentBook,

	DEBUG_emptyBooks,
	setBookEntities,
} = bookSlice.actions;
export default bookSlice.reducer;
