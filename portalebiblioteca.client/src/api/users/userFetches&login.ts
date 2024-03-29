import { setLoggedProfile } from "../../redux/slicers/userSlice";
import { url } from "../../functions/config";
import { LoginModel, SignUpModel } from "../../interfaces/profile.interface";
import { AppDispatch } from "../../redux/store/store";
import { fetchWithAuth } from "./interceptor";

// fetch per ottenere il token di autenticazione
export const fetchLogin =
	(loginObj: LoginModel) => async (dispatch: AppDispatch) => {
		try {
			const response = await fetch(url + "Auth/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginObj),
			});

			if (response.ok) {
				const dataProfileEtoken = await response.json();
				console.log(dataProfileEtoken);
				dispatch(setLoggedProfile(dataProfileEtoken));
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Puoi gestire gli errori qui, se necessario
			console.error("Errore nel fetch:");
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

			if (response.ok) {
				const dataProfile = await response.json();
				console.log(dataProfile);

				dispatch(
					fetchLogin({ email: user.Email, password: user.Password })
				);
			} else {
				throw new Error("Errore nel recupero dei risultati");
			}
		} catch (error) {
			// Puoi gestire gli errori qui, se necessario
			console.error("Errore nel fetch:", error);
		}
	};
