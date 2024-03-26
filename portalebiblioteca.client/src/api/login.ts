import { setLoggedProfile } from "../redux/slicers/userSlice";
import { url } from "../functions/config";
import { LoginModel } from "../interfaces/profile.interface";

export const fetchLogin = (loginObj: LoginModel) => async (dispatch) => {
	try {
		const response = await fetch(url + "Auth/token", {
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
		console.error("Errore nel fetch:");
	}
};
