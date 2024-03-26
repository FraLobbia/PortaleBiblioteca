import { createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../interfaces/profile.interface";
//=================================================================================

const initialState: UserState = {
	users: [],
	currentUser: null,
	loggedProfile: null,
};
//=================================================================================
const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		login(state, action: { payload: User }) {
			state.currentUser = action.payload;
		},
		logout(state) {
			state.currentUser = null;
		},
		setLoggedProfile: (state, action) => {
			state.loggedProfile = action.payload;
		},
	},
});
//=================================================================================
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
