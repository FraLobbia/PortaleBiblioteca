import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../slicers/userSlice";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import bookSlicer from "../slicers/bookSlicer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["profile", "cart"],

	transforms: [
		expireReducer("profile", {
			expireSeconds: 7 * 24 * 60 * 60, // 7 days
			expiredState: { loggedProfile: null },
			autoExpire: true,
		}),
	],
};

//1) =================================================================================
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices({ user: userSlice, book: bookSlicer });
//2) =================================================================================
// Infer the `RootState` type from the root reducer
// Ottengo il tipo del mio rootReducer e lo chiamo RootState. Userò RootState da
// ora in poi per definire il tipo del mio stato
export type RootState = ReturnType<typeof rootReducer>;
//3) =================================================================================
// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
	});
	// configure listeners using the provided defaults
	// optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
	setupListeners(store.dispatch);
	return store;
};
//4) =================================================================================
export const store = makeStore();

export const persistor = persistStore(store);
//=================================================================================
// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
