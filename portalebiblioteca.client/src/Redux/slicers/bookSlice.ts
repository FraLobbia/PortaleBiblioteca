import { createSlice } from "@reduxjs/toolkit";
import { Book, BookState } from "../../interfaces/book.interface";
import { Loan } from "../../interfaces/loans.interface";
//=================================================================================

const initialState: BookState = {
	books: [],
	currentBook: null,
	loansCurrentUser: [],
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
		setLoansOfUser(state, action: { payload: Loan[] }) {
			state.loansCurrentUser = action.payload;
		},
		DEBUG_emptyBooks(state) {
			state.books = [];
		},
	},
});
//=================================================================================
export const { setBooks, setCurrentBook, setLoansOfUser, DEBUG_emptyBooks } =
	bookSlice.actions;
export default bookSlice.reducer;
