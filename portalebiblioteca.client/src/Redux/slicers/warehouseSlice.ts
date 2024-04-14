import { createSlice } from "@reduxjs/toolkit";
import { Aisle, Shelf } from "../../interfaces/warehouse.interface";

interface warehouseState {
	aisles: Aisle[];
	bays: number[];
	heights: string[];
	shelves: Shelf[];
}

const initialState: warehouseState = {
	aisles: [],
	bays: [],
	heights: [],
	shelves: [],
};
//=================================================================================
const warehouseSlice = createSlice({
	name: "warehouse",
	initialState,
	reducers: {
		setAisles(state, action: { payload: Aisle[] }) {
			state.aisles = action.payload;
		},
		setBays(state, action: { payload: number[] }) {
			state.bays = action.payload;
		},
		setHeights(state, action: { payload: string[] }) {
			state.heights = action.payload;
		},
		setShelves(state, action: { payload: Shelf[] }) {
			state.shelves = action.payload;
		},
	},
});
//=================================================================================
export const { setAisles, setShelves, setBays, setHeights } =
	warehouseSlice.actions;
export default warehouseSlice.reducer;
