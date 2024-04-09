import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Book } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import ReceiveNewBook from "./ReceiveNewBook";
import { fetchBookList } from "../../api/booksCatalog/bookCRUDFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";

const ControlPanel = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { books } = useAppSelector((state) => state.bookState);

	// variables
	const [choosenBook, setChoosenBook] = useState<Book | null>(null);
	// what appens when the component is mounted
	useEffect(() => {
		dispatch(fetchBookList());
	}, []);
	return (
		<Container>
			<BackButton />
			<h1 className="my-3">Pannello di controllo magazzino</h1>
			<Form.Group className="mt-3">
				<Form.Select
					id="bookChoiceField"
					onChange={(e) =>
						setChoosenBook(
							books.find(
								(book) =>
									book.idBook === parseInt(e.target.value)
							) ?? null
						)
					}
					aria-label="Scelta del titolo da aggiungere in magazzino">
					<option className="text-muted" value={""}>
						Scegli un titolo tra quelli a catalogo
					</option>
					{books.map((book: Book) => (
						<option key={book.idBook} value={book.idBook}>
							{book.title} - {book.author}
						</option>
					))}
				</Form.Select>
			</Form.Group>
			{choosenBook && <ReceiveNewBook book={choosenBook} />}
		</Container>
	);
};

export default ControlPanel;
