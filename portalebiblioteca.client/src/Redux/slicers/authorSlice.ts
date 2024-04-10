import { createSlice } from "@reduxjs/toolkit";
import { Author } from "../../interfaces/book.interface";

interface AuthorState {
	authors: Author[];
	currentAuthor: Author | null;
}
const initialState: AuthorState = {
	authors: [],
	currentAuthor: null,
};
//=================================================================================
const authorSlice = createSlice({
	name: "author",
	initialState,
	reducers: {
		setAuthors(state, action: { payload: Author[] }) {
			state.authors = action.payload;
		},
		setCurrentAuthor(state, action: { payload: Author }) {
			state.currentAuthor = action.payload;
		},
	},
});
//=================================================================================
export const { setAuthors, setCurrentAuthor } = authorSlice.actions;
export default authorSlice.reducer;
