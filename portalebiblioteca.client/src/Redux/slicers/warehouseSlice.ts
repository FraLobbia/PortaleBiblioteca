import { createSlice } from "@reduxjs/toolkit";
import {
	Aisle,
	ItemsEntity,
	Shelf,
} from "../../interfaces/warehouse.interface";

interface warehouseState {
	aisles: Aisle[];
	bays: number[];
	heights: string[];
	shelves: Shelf[];
	moveSource: string;
	reservedToBePicked: ItemsEntity[];
	librarianDesk: ItemsEntity[];
	sourceMaxQuantity: number;
	moveSourceShelfId: number;
}

const initialState: warehouseState = {
	aisles: [],
	bays: [],
	heights: [],
	shelves: [],
	moveSource: "",
	reservedToBePicked: [],
	librarianDesk: [],
	sourceMaxQuantity: 0,
	moveSourceShelfId: 0,
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
		setMoveSource(state, action: { payload: [string, number] }) {
			state.moveSource = action.payload[0];
			state.moveSourceShelfId = action.payload[1];
		},
		setReservedToBePicked(state, action: { payload: ItemsEntity[] }) {
			state.reservedToBePicked = action.payload;
		},
		setLibrarianDesk(state, action: { payload: ItemsEntity[] }) {
			state.librarianDesk = action.payload;
		},
		setSourceMaxQuantity(state, action: { payload: number }) {
			state.sourceMaxQuantity = action.payload;
		},
	},
});
//=================================================================================
export const {
	setAisles,
	setShelves,
	setBays,
	setHeights,
	setMoveSource,
	setSourceMaxQuantity,
	setReservedToBePicked,
	setLibrarianDesk,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
