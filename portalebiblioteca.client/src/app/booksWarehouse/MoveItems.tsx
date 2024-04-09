import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import InventoryTable from "./components/InventoryTable";
import { getAisles } from "../../api/warehouse/AislesShelvesFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";

const MoveItems = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	// store variables
	const book = useAppSelector((state) => state.bookState.currentBook);
	const aisles = useAppSelector((state) => state.warehouseState.aisles);

	//variables
	const [quantity, setQuantity] = useState<number>(1);
	const [choosenAisle, setChoosenAisle] = useState<number | null>(null);

	// what appens when the component is mounted
	useEffect(() => {
		if (!id) return;
		dispatch(fetchBookById(id));
		dispatch(getAisles());
	}, []);
	return (
		<Container>
			<BackButton />
			<h1>Sposta libri dal magazzino</h1>
			<InventoryTable book={book} />
			<Form className="mt-4">
				<Form.Group controlId="formQuantity">
					<Form.Label>Quantità</Form.Label>
					<Form.Control
						value={quantity}
						type="number"
						placeholder="Inserisci la quantità"
						onChange={(e) => setQuantity(parseInt(e.target.value))}
					/>
				</Form.Group>
				<Form.Group controlId="formAisle">
					<Form.Label>Corsia</Form.Label>
					<Form.Control
						value={choosenAisle ? choosenAisle : ""}
						onChange={(e) =>
							setChoosenAisle(parseInt(e.target.value))
						}
						as="select">
						<option>Scegli una corsia</option>
						{aisles.map((aisle) => (
							<option key={aisle.idAisle} value={aisle.idAisle}>
								{aisle.aisleNumber}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				{choosenAisle && <h1>rwfognwero</h1>}
			</Form>
		</Container>
	);
};

export default MoveItems;
