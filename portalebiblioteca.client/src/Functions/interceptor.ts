import { store } from "../redux/store/store";

export async function fetchWithAuth(url:string, options = {}) {
    // Ottieni il token dallo store Redux
    const state = store.getState();
    const token = state.profile.loggedProfile;

    // Imposta l'intestazione di autorizzazione
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token.token}`,
    };

    // Esegui la richiesta fetch con le nuove intestazioni
    const response = await fetch(url, { ...options, headers });

    return response;
}
