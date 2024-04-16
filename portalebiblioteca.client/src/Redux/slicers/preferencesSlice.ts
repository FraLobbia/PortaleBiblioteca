import { createSlice } from "@reduxjs/toolkit";
//=================================================================================
interface preferencesState {
	AuthorsToExclude: number[];
	GenreToExclude: number[];
}
const initialState: preferencesState = {
	GenreToExclude: [],
	AuthorsToExclude: [],
};
//=================================================================================
const preferencesSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		setGenreToExclude(state, action: { payload: number[] }) {
			state.GenreToExclude = action.payload;
		},
		setAuthorsToExclude(state, action: { payload: number[] }) {
			state.AuthorsToExclude = action.payload;
		},
		intializePreferencesBooks(state) {
			state.GenreToExclude = [];
			state.AuthorsToExclude = [];
		},
	},
});
//=================================================================================
export const {
	setGenreToExclude,
	setAuthorsToExclude,
	intializePreferencesBooks,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
