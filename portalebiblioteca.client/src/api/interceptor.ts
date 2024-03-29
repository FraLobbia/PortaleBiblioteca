import { RootState, store } from "../redux/store/store";

interface FetchWithAuthOptions extends RequestInit {
	headers?: Record<string, string>;
}

export async function fetchWithAuth(
	url: string,
	options: FetchWithAuthOptions
) {
	// Ottieni il token dallo store Redux
	const state = store.getState() as RootState;
	const { token } = state.profileState.loggedProfile;

	// Imposta l'intestazione di autorizzazione
	const headers = {
		...options.headers,
		Authorization: `Bearer ${token}`,
	};

	// Esegui la richiesta fetch con le nuove intestazioni
	const response = await fetch(url, { ...options, headers });

	return response;
}
