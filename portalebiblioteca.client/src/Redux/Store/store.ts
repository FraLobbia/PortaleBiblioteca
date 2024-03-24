import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import profileReducer from "../Reducers/profileReducer";

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

const rootReducer = combineReducers({
/*    global: stateReducer,*/
    profile: profileReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
