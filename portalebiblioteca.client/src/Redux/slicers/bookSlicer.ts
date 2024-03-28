import { createSlice } from "@reduxjs/toolkit";
import { Book, BookState } from "../../interfaces/book.interface";
//=================================================================================

const initialState: BookState = {
	books: [],
	currentBook: null,
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
	},
});
//=================================================================================
export const { setBooks, setCurrentBook } = bookSlice.actions;
export default bookSlice.reducer;
