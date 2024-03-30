import { createSlice } from "@reduxjs/toolkit";
import { ResponseInterface } from "../../interfaces/utility.interface";

//=================================================================================

const initialState: ResponseInterface = {
	response: false,
};
//=================================================================================
const utilitySlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		setResponseStatus(state, action: { payload: boolean }) {
			state.response = action.payload;
		},
	},
});
//=================================================================================
export const { setResponseStatus } = utilitySlice.actions;
export default utilitySlice.reducer;
