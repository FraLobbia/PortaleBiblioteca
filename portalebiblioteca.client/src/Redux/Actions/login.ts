import { url } from "../../functions/config";
import { setLoggedProfile } from "../reducers/profileReducer";

export const fetchLogin = (loginObj) => async (dispatch) => {
	try {
		const response = await fetch(url + "auth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginObj),
		});

		if (response.ok) {
			const dataProfile = await response.json();
			console.log(dataProfile);
			dispatch(setLoggedProfile(dataProfile));
		} else {
			throw new Error("Errore nel recupero dei risultati");
		}
	} catch (error) {
		// Puoi gestire gli errori qui, se necessario
		console.error("Errore nel fetch:", error.message);
	}
};
