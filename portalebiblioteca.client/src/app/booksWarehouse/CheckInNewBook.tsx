import { Button, Form } from "react-bootstrap";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import { useState } from "react";
import { addToWarehouse } from "../../api/warehouse/warehouseFetches";
import { Book } from "../../interfaces/book.interface";
import InventoryWarehouseTable from "./components/InventoryWarehouseTable";

interface CheckInNewBookProps {
	book: Book | null;
}

const CheckInNewBook = ({ book }: CheckInNewBookProps) => {
	// define hooks

	//variables
	const [quantity, setQuantity] = useState<number>(0);

	//functions
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!book) return;
		addToWarehouse(quantity, parseInt(book.idBook.toString()));
	};

	return (
		<>
			<h1 className="my-3">Aggiungi quantità in magazzino</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>
						I libri verranno aggiunti temporaneamente nello scaffale
						<b> 200-A1</b> del magazzino in attesa di essere riposti
						nelle corsie aperte al pubblico{" "}
					</Form.Label>
					<Form.Control
						onChange={(e) => setQuantity(parseInt(e.target.value))}
						type="number"
					/>
				</Form.Group>
				<Form.Group>
					<Button
						variant="success"
						className="my-3 w-100"
						type="submit">
						Aggiungi quantità in magazzino
					</Button>
				</Form.Group>
			</Form>

			<hr />

			<InventoryWarehouseTable book={book} />

			<hr />

			<h3>Dettagli</h3>
			<h3 className="my-3  alert alert-info">
				!! Prima di aggiungere controlla che i dati corrispondano al
				libro arrivato
			</h3>
			{book && <DetailsBook idBook={book.idBook.toString()} />}
		</>
	);
};
export default CheckInNewBook;
