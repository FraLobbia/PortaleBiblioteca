import { createSlice } from "@reduxjs/toolkit";
import { User, loggedProfile } from "../../interfaces/profile.interface";
//=================================================================================

interface UserState {
	loggedProfile: loggedProfile;
	users: User[];
}

const initialState: UserState = {
	loggedProfile: {
		token: "",
		permissionsToEdit: false,
		user: null,
	},
	users: [],
};
//=================================================================================
const userSlice = createSlice({
	name: "user",
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
		setUsers: (state, action: { payload: User[] }) => {
			state.users = action.payload;
		},
	},
});
//=================================================================================
export const { logout, setLoggedProfile, setUsers } = userSlice.actions;
export default userSlice.reducer;
