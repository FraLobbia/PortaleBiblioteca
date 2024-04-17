import Swal from "sweetalert2";
import { url } from "../../Functions/config";
import { fetchWithAuth } from "../interceptor";
import { setAisles } from "../../Redux/slicers/warehouseSlice";
import { Aisle } from "../../interfaces/warehouse.interface";
import { AppDispatch } from "../../Redux/Store/store";

export const getAisles = () => async (dispatch: AppDispatch) => {
	try {
		const response = await fetchWithAuth(url + "api/Warehouse/aisle", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			response.json().then((err) => {
				Swal.fire({
					title: `${err.message}`,
					icon: "error",
					footer: `Errore ${response.status}`,
				});
			});
		} else {
			const aisles: Aisle[] = await response.json();
			dispatch(setAisles(aisles));
		}
	} catch (error) {
		console.error(error);
	}
};
