//slice reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedProfile: null,
};

const profileReducer = createSlice({
    name: "profileReducer",
    initialState,
    reducers: {
        // Azione definita nello slice
        setLoggedProfile: (state, action) => {
            state.loggedProfile = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { setLoggedProfile } = profileReducer.actions;
export default profileReducer.reducer;
