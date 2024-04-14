import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import InventoryTable from "./components/InventoryTable";
import { getAisles } from "../../api/warehouse/AislesShelvesFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import {
	fetchBaysByAisleId,
	fetchHeightsByBayId,
	fetchItemsEntityByBookId,
} from "../../api/warehouse/warehouseFetches";

const MoveItems = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	// store variables
	const { aisles } = useAppSelector((state) => state.warehouseState);
	const { bays } = useAppSelector((state) => state.warehouseState);
	const { heights } = useAppSelector((state) => state.warehouseState);

	//variables
	const [quantity, setQuantity] = useState<number>(1);
	const [choosenAisle, setChoosenAisle] = useState<number | null>(null);
	const [choosenBay, setChoosenBay] = useState<number | null>(null);

	// what appens when the component is mounted
	useEffect(() => {
		if (!id) return;
		dispatch(fetchBookById(id));
		dispatch(fetchItemsEntityByBookId(parseInt(id)));
		dispatch(getAisles());
	}, []);

	useEffect(() => {
		if (choosenAisle) {
			dispatch(fetchBaysByAisleId(choosenAisle));
		}
	}, [choosenAisle]);

	useEffect(() => {
		if (choosenBay && choosenAisle) {
			dispatch(fetchHeightsByBayId(choosenAisle, choosenBay));
		}
	}, [choosenBay]);
	return (
		<Container>
			<BackButton />
			<h1>Sposta libri dal magazzino</h1>

			<InventoryTable />

			<Form className="mt-4">
				<Form.Group>
					<Form.Control
						placeholder="Quantità"
						value={quantity}
						min={1}
						max={1000}
						className="text-center mx-auto fs-1"
						style={{ maxWidth: "200px", height: "100px" }}
						onChange={(e) => setQuantity(parseInt(e.target.value))}
						type="number"
					/>
				</Form.Group>
				<Form.Group controlId="formAisle">
					<Form.Label>Scegli una corsia</Form.Label>
					<Form.Control
						value={choosenAisle ? choosenAisle : ""}
						onChange={(e) =>
							setChoosenAisle(parseInt(e.target.value))
						}
						as="select">
						<option>Scegli una corsia</option>
						{aisles.map((aisle) => (
							<option
								key={"aisle" + aisle.idAisle}
								value={aisle.idAisle}>
								{aisle.aisleNumber}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				{choosenAisle && (
					<Form.Group controlId="formShelf">
						<Form.Label>Scegli la baia</Form.Label>
						<Form.Control
							as="select"
							onChange={(e) =>
								setChoosenBay(parseInt(e.target.value))
							}>
							<option>Scegli la baia</option>
							{bays.map((bay) => (
								<option key={"bay" + bay} value={bay}>
									{bay}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				)}

				{choosenBay && choosenAisle && (
					<Form.Group controlId="formHeight">
						<Form.Label>Scegli l'altezza</Form.Label>
						<Form.Control as="select">
							<option>Scegli l'altezza</option>
							{heights.map((height) => (
								<option key={"height" + height} value={height}>
									{height}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				)}

				<Form.Group className="d-flex justify-content-center">
					<Button
						variant="success"
						className="my-3 py-3 w-50 fs-3"
						type="submit">
						Sposta
					</Button>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default MoveItems;
