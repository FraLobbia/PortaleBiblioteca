import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Book } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import CheckInNewBook from "./CheckInNewBook";
import { fetchBookList } from "../../api/booksCatalog/bookCRUDFetches";
import { fetchAllWarehouse } from "../../api/warehouse/warehouseFetches";

const ControlPanel = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { books } = useAppSelector((state) => state.bookState);

	// variables
	const [idBookChoosen, setIdBookChoosen] = useState<string>("");

	// what appens when the component is mounted
	useEffect(() => {
		dispatch(fetchBookList());
	}, []);
	return (
		<Container>
			<h1 className="my-3">Pannello di controllo magazzino</h1>
			<Button onClick={() => fetchAllWarehouse()}>rgwegs</Button>
			<Form.Group className="mt-3">
				<Form.Label>
					Titolo del libro da aggiungere in magazzino
				</Form.Label>
				<Form.Select
					id="bookChoiceField"
					onChange={(e) => setIdBookChoosen(e.target.value)}
					aria-label="Scelta del titolo da aggiungere in magazzino">
					<option className="text-muted">
						Scegli un titolo tra quelli a catalogo
					</option>
					{books.map((book: Book) => (
						<option key={book.idBook} value={book.idBook}>
							{book.title} - {book.author}
						</option>
					))}
				</Form.Select>
			</Form.Group>

			{idBookChoosen && <CheckInNewBook idBook={idBookChoosen} />}
		</Container>
	);
};

export default ControlPanel;
