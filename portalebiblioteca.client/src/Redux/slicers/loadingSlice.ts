import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
	isLoading: boolean;
};
const initialState: LoadingState = {
	isLoading: false,
};

//=================================================================================
const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		setLoading(state, action: { payload: boolean }) {
			state.isLoading = action.payload;
		},
	},
});
//=================================================================================
export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
