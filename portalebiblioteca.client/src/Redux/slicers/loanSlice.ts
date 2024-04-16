import { createSlice } from "@reduxjs/toolkit";
import { Loan } from "../../interfaces/loans.interface";

interface LoanState {
	loans: Loan[];
}

const initialState: LoanState = {
	loans: [],
};
//=================================================================================
const loanSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		setLoansOfBook(state, action: { payload: Loan[] }) {
			state.loans = action.payload;
		},
	},
});
//=================================================================================
export const { setLoansOfBook } = loanSlice.actions;
export default loanSlice.reducer;
