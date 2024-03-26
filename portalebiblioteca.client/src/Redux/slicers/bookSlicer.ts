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
		getBooks(state, action: { payload: Book[] }) {
			state.books = action.payload;
		},
	},
});
//=================================================================================
export const { getBooks } = bookSlice.actions;
export default bookSlice.reducer;
