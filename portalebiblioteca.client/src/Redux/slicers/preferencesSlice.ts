import { createSlice } from "@reduxjs/toolkit";
//=================================================================================
interface preferencesState {
	notChoosenAuthors: string[];
	notChoosenGenresIDs: number[];
}
const initialState: preferencesState = {
	notChoosenGenresIDs: [],
	notChoosenAuthors: [],
};
//=================================================================================
const preferencesSlice = createSlice({
	name: "preferences",
	initialState,
	reducers: {
		setChoosenGenresIDs(state, action: { payload: number[] }) {
			state.notChoosenGenresIDs = action.payload;
		},
		setChoosenAuthors(state, action: { payload: string[] }) {
			state.notChoosenAuthors = action.payload;
		},
	},
});
//=================================================================================
export const { setChoosenGenresIDs, setChoosenAuthors } =
	preferencesSlice.actions;
export default preferencesSlice.reducer;
