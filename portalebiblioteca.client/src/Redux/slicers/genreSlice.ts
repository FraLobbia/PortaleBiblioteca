import { createSlice } from "@reduxjs/toolkit";
import { Genre } from "../../interfaces/genre.interface";

interface GenreState {
	genres: Genre[];
	currentGenre: Genre | null;
	notChoosenGenresIDs: number[];
}
const initialState: GenreState = {
	genres: [],
	currentGenre: null,
	notChoosenGenresIDs: [],
};
//=================================================================================
const genreSlice = createSlice({
	name: "genre",
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
