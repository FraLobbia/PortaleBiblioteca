import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { fetchBookById } from "../../api/booksCatalog/bookCRUDFetches";
import { getAisles } from "../../api/warehouse/AislesShelvesFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import {
	fetchBaysByAisleId,
	fetchHeightsByBayId,
	fetchItemsEntityByBookId,
	fetchMove,
	getMaxQuantityInTheShelf,
} from "../../api/warehouse/warehouseFetches";
import { MoveObject } from "../../interfaces/warehouse.interface";

const MoveItems = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	// store variables
	const { aisles } = useAppSelector((state) => state.warehouseState);
	const { bays } = useAppSelector((state) => state.warehouseState);
	const { heights } = useAppSelector((state) => state.warehouseState);
	const { moveSource, moveSourceShelfId, sourceMaxQuantity } = useAppSelector(
		(state) => state.warehouseState
	);
	//variables
	const [quantity, setQuantity] = useState<number>(1);
	const [choosenAisle, setChoosenAisle] = useState<number | null>(null);
	const [choosenBay, setChoosenBay] = useState<number | null>(null);
	const [choosenHeight, setChoosenHeight] = useState<string | null>(null);

	// what appens when the component is mounted
	useEffect(() => {
		if (!id) return;
		dispatch(fetchBookById(id));
		dispatch(fetchItemsEntityByBookId(parseInt(id)));
		dispatch(getAisles());
		dispatch(getMaxQuantityInTheShelf(moveSourceShelfId, parseInt(id)));
	}, []);

	// fetch bays when an aisle is choosen
	useEffect(() => {
		if (choosenAisle) {
			dispatch(fetchBaysByAisleId(choosenAisle));
		}
	}, [choosenAisle]);

	// fetch heights when a bay is choosen
	useEffect(() => {
		if (choosenBay && choosenAisle) {
			dispatch(fetchHeightsByBayId(choosenAisle, choosenBay));
		}
	}, [choosenBay]);

	// function to handle submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id || !choosenAisle || !choosenBay || !choosenHeight) return;
		const newMove: MoveObject = {
			moveSourceShelfId: moveSourceShelfId,
			idBook: parseInt(id),
			quantity: quantity,
			idAisle: choosenAisle,
			shelfBay: choosenBay,
			heightChar: choosenHeight,
		};
		dispatch(fetchMove(newMove));
	};

	return (
		<Container>
			<BackButton />

			<div className="text-center alert alert-info">
				<h1 className="m-0">
					Stai muovendo da <br />
					<span className="fw-bold">
						{moveSource ? moveSource : ""}
					</span>
				</h1>
				<h5 className="m-0">
					Quantità disponibile: {sourceMaxQuantity}
				</h5>
			</div>

			<Form className="mt-4" onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Control
						placeholder="Quantità"
						value={quantity}
						min={1}
						max={sourceMaxQuantity}
						className="text-center mx-auto fs-1 fw-bold"
						style={{ maxWidth: "200px", height: "100px" }}
						onChange={(e) => setQuantity(parseInt(e.target.value))}
						type="number"
					/>
				</Form.Group>
				<Form.Group controlId="formAisle">
					<Form.Label>Scegli una corsia di destinazione</Form.Label>
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
								Corsia {aisle.aisleNumber}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				{choosenAisle && (
					<Form.Group className="my-4" controlId="formShelf">
						<Form.Label>Scegli una baia di destinazione</Form.Label>
						<Form.Control
							as="select"
							value={choosenBay ? choosenBay : ""}
							onChange={(e) =>
								setChoosenBay(parseInt(e.target.value))
							}>
							<option>Scegli la baia</option>
							{bays.map((bay) => (
								<option key={"bay" + bay} value={bay}>
									Baia {bay}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				)}

				{choosenBay && choosenAisle && (
					<Form.Group controlId="formHeight">
						<Form.Label>Scegli l'altezza</Form.Label>
						<Form.Control
							as="select"
							value={choosenHeight ? choosenHeight : ""}
							onChange={(e) => setChoosenHeight(e.target.value)}>
							<option>Scegli l'altezza</option>
							{heights.map((height) => (
								<option key={"height" + height} value={height}>
									{height}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				)}

				{choosenBay && choosenAisle && choosenHeight && (
					<>
						<h1 className="text-center alert alert-info">
							Destinazione <br />
							<span className="fw-bold">
								Corsia {choosenAisle} -{choosenHeight}
								{choosenBay}
							</span>
						</h1>
						<Form.Group className="d-flex justify-content-center">
							<Button
								variant="success"
								className="my- py-3 w-50 fs-3"
								type="submit">
								Conferma
							</Button>
						</Form.Group>
					</>
				)}
			</Form>
		</Container>
	);
};

export default MoveItems;
