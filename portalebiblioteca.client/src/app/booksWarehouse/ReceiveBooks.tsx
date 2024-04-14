import { Button, Form } from "react-bootstrap";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import { useState } from "react";
import { fetchAddToWarehouse } from "../../api/warehouse/warehouseFetches";
import { Book } from "../../interfaces/book.interface";
import InventoryTable from "./components/InventoryTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../functions/hooks";

interface ReceiveNewBookProps {
	book: Book | null;
}

const ReceiveBooks = ({ book }: ReceiveNewBookProps) => {
	// define hooks
	const dispatch = useAppDispatch();

	//variables
	const [quantity, setQuantity] = useState<number>(1);

	// functions to handle the form
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!book) return;
		dispatch(fetchAddToWarehouse(quantity, book.idBook));
	};

	return (
		<>
			<h1 className="my-3 text-center">Ricezione libri</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label className="alert alert-secondary p-1 w-100 text-center">
						I libri verranno aggiunti nello scaffale
						<b> 200-A1</b> del magazzino in attesa di essere riposti
						nelle corsie aperte al pubblico{" "}
					</Form.Label>
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
				<Form.Group className="d-flex justify-content-center">
					<Button
						variant="success"
						className="my-3 py-3 w-75 fs-3"
						type="submit">
						Aggiungi quantità in magazzino
					</Button>
				</Form.Group>
			</Form>

			<hr />

			<InventoryTable book={book} />

			<hr />

			<h3>Dettagli</h3>
			<h3 className="my-3 alert alert-info d-flex align-items-center gap-4">
				<FontAwesomeIcon className="fs-1" icon={faCircleInfo} /> Prima
				di aggiungere controlla che i dati corrispondano al libro
				arrivato
			</h3>
			<DetailsBook book={book} />
		</>
	);
};
export default ReceiveBooks;
