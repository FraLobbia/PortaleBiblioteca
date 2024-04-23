import { createSlice } from "@reduxjs/toolkit";

import { Review } from "../../interfaces/review.interface";

interface ReviewState {
	reviews: Review[];
	bookReviews: Review[];
}

const initialState: ReviewState = {
	reviews: [],
	bookReviews: [],
};
//=================================================================================
const bookSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {
		setReviews(state, action: { payload: Review[] }) {
			state.reviews = action.payload;
		},
		setBookReviews(state, action: { payload: Review[] }) {
			state.bookReviews = action.payload;
		},
	},
});
//=================================================================================
export const { setReviews, setBookReviews } = bookSlice.actions;
export default bookSlice.reducer;
