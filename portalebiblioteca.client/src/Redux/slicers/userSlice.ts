import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces/profile.interface";
//=================================================================================

const initialState: UserState = {
	users: [],
	loggedProfile: {
		token: "",
		permissionsToEdit: false,
		user: null,
	},
};
//=================================================================================
const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		logout(state) {
			state.loggedProfile = initialState.loggedProfile;
		},
		setLoggedProfile: (state, action) => {
			if (action.payload.user) {
				if (
					action.payload.user.role === "admin" ||
					action.payload.user.role === "librarian"
				) {
					action.payload.permissionsToEdit = true;
				} else {
					action.payload.permissionsToEdit = false;
				}
			}
			state.loggedProfile = action.payload;
		},
	},
});
//=================================================================================
export const { logout, setLoggedProfile } = userSlice.actions;
export default userSlice.reducer;
