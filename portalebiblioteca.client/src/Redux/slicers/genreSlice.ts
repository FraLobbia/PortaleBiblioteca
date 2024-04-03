import { createSlice } from "@reduxjs/toolkit";
import { Genre, GenreState } from "../../interfaces/genre.interface";
//=================================================================================

const initialState: GenreState = {
	genres: [],
	currentGenre: null,
};
//=================================================================================
const genreSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		setGenres(state, action: { payload: Genre[] }) {
			state.genres = action.payload;
		},
		setCurrentGenre(state, action: { payload: Genre }) {
			state.currentGenre = action.payload;
		},
	},
});
//=================================================================================
export const { setGenres, setCurrentGenre } = genreSlice.actions;
export default genreSlice.reducer;
