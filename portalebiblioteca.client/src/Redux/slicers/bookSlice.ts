import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../interfaces/book.interface";
import { Loan } from "../../interfaces/loans.interface";
import { ItemsEntity } from "../../interfaces/warehouse.interface";

interface BookState {
	books: Book[];
	currentBook: Book | null;
	loansCurrentUser: Loan[];
	booksEntities: ItemsEntity[];
}

const initialState: BookState = {
	books: [],
	currentBook: null,
	loansCurrentUser: [],
	booksEntities: [],
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
		setBooksEntities(state, action: { payload: ItemsEntity[] }) {
			state.booksEntities = action.payload;
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
	setLoansOfUser,
	DEBUG_emptyBooks,
	setBooksEntities,
} = bookSlice.actions;
export default bookSlice.reducer;
