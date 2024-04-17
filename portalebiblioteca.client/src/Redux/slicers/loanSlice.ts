import { createSlice } from "@reduxjs/toolkit";
import { Loan } from "../../interfaces/loans.interface";

interface LoanState {
	loansOfBook: Loan[];
	loansCurrentUser: Loan[];
}

const initialState: LoanState = {
	loansOfBook: [],
	loansCurrentUser: [],
};
//=================================================================================
const loanSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		setLoansOfBook(state, action: { payload: Loan[] }) {
			state.loansOfBook = action.payload;
		},
		setLoansOfUser(state, action: { payload: Loan[] }) {
			state.loansCurrentUser = action.payload;
		},
	},
});
//=================================================================================
export const { setLoansOfBook, setLoansOfUser } = loanSlice.actions;
export default loanSlice.reducer;
