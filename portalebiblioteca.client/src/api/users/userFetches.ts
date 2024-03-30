import { setLoggedProfile } from "../../redux/slicers/userSlice";
import { url } from "../../functions/config";
import {
	LoginModel,
	SignUpModel,
	User,
	UserToEdit,
	loggedProfile,
} from "../../interfaces/profile.interface";
import { AppDispatch, RootState, store } from "../../redux/store/store";
import { fetchWithAuth } from "../interceptor";
import { Toast } from "../../functions/utility";
import { NavigateFunction } from "react-router-dom";
// fetch per ottenere il token di autenticazione
export const fetchLogin =
	(loginObj: LoginModel, navigate?: NavigateFunction) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await fetch(url + "Auth/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginObj),
			});

			if (!response.ok) {
				response.json().then((err) => {
					Toast.fire({
						icon: "error",
						title: `${err.message}`,
					});
				});
			} else {
				const loggedProfileData: loggedProfile = await response.json();
				console.info("Accesso effettuato", loggedProfileData.user);
				dispatch(setLoggedProfile(loggedProfileData));
				Toast.fire({
					icon: "success",
					title: "Accesso effettuato!",
				});
				navigate();
			}
		} catch (error) {
			// Puoi gestire gli errori qui, se necessario
			console.error("Errore nel fetch:", error);
		}
	};

export const fetchCreateUser =
	(user: SignUpModel) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetchWithAuth(url + "Users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (!response.ok) {
				response.json().then((err) => {
					Toast.fire({
						icon: "error",
						title: `${err.message}`,
					});
				});
			} else {
				const createdUserData: User = await response.json();
				console.info("Utente creato: ", createdUserData);
				dispatch(
					fetchLogin({ email: user.Email, password: user.Password })
				);
			}
		} catch (error) {
			// Puoi gestire gli errori qui, se necessario
			console.error("Errore nel fetch:", error);
		}
	};

export const fetchEditUser =
	(user: UserToEdit, id?: string) => async (dispatch: AppDispatch) => {
		try {
			const state = store.getState() as RootState;
			const loggedUserData = state.profileState.loggedProfile.user;

			let endpoint;

			if (
				loggedUserData?.role === "admin" &&
				id === user.idUser.toString()
			) {
				endpoint = "Users/editWithRole/" + id;
			} else {
				endpoint = "Users/" + loggedUserData?.idUser;
			}

			const response = await fetchWithAuth(url + endpoint, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (!response.ok) {
				response.json().then((err) => {
					Toast.fire({
						icon: "error",
						title: `${err.message}`,
					});
				});
			} else {
				const editedProfileData = await response.json();
				console.info("Utente modificato: ", editedProfileData.user);
				dispatch(setLoggedProfile(editedProfileData));
				Toast.fire({
					icon: "success",
					title: "Profilo modificato!",
				});
			}
		} catch (error) {
			// Puoi gestire gli errori qui, se necessario
			console.error("Errore nel fetch:", error);
		}
	};
