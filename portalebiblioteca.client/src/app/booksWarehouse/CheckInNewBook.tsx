import { Button, Form, Table } from "react-bootstrap";
import DetailsBook from "../booksCatalog/components/DetailsBook";
import { useState } from "react";
import { addToWarehouse } from "../../api/warehouse/warehouseFetches";
import { Book } from "../../interfaces/book.interface";
import { Link } from "react-router-dom";

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
			<h3>Inventario</h3>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Magazzino</th>
						<th>Titolo</th>
						<th>In magazzino</th>
						<th>Disponibile sugli scaffali</th>
						<th></th>
					</tr>
				</thead>
				<tbody
				// style={{ overflowY: "scroll", height: "300px" }}
				>
					<tr>
						<td>200-A1</td>
						<td>{book?.title}</td>
						<td>{book?.warehouseQuantity}</td>
						<td>{book?.availableQuantity}</td>
						<td>
							<Link
								to={"move/" + book?.idBook}
								className="btn btn-primary">
								Sposta
							</Link>
						</td>
					</tr>
				</tbody>
			</Table>

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
