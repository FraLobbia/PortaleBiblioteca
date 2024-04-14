import { createSlice } from "@reduxjs/toolkit";

import { Review } from "../../interfaces/review.interface";

interface ReviewState {
	reviews: Review[];
}

const initialState: ReviewState = {
	reviews: [],
};
//=================================================================================
const bookSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {
		setReviews(state, action: { payload: Review[] }) {
			state.reviews = action.payload;
		},
	},
});
//=================================================================================
export const { setReviews } = bookSlice.actions;
export default bookSlice.reducer;
