import { createSlice } from "@reduxjs/toolkit";
import { Aisle } from "../../interfaces/warehouse.interface";

interface warehouseState {
	aisles: Aisle[];
}

const initialState: warehouseState = {
	aisles: [],
};
//=================================================================================
const warehouseSlice = createSlice({
	name: "warehouse",
	initialState,
	reducers: {
		setAisles(state, action: { payload: Aisle[] }) {
			state.aisles = action.payload;
		},
	},
});
//=================================================================================
export const { setAisles } = warehouseSlice.actions;
export default warehouseSlice.reducer;
