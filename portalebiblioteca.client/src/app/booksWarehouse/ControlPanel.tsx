import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Book } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import ReceiveBooks from "./ReceiveBooks";
import {
	fetchBookById,
	fetchBookList,
} from "../../api/booksCatalog/bookCRUDFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { fetchItemsEntityByBookId } from "../../api/warehouse/warehouseFetches";
const ControlPanel = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { books } = useAppSelector((state) => state.bookState);
	const { currentBook } = useAppSelector((state) => state.bookState);

	// variables
	const [choosenBookID, setChoosenBookID] = useState<number | null>(null);

	// what happens when the component is mounted
	useEffect(() => {
		dispatch(fetchBookList());
	}, []);

	// what happens when the choosenBookID changes
	useEffect(() => {
		if (!choosenBookID) return;
		dispatch(fetchBookById(choosenBookID));
		dispatch(fetchItemsEntityByBookId(choosenBookID));
	}, [choosenBookID]);

	return (
		<Container>
			<BackButton />
			<h1 className="my-3">Pannello di controllo magazzino</h1>
			<Form.Group className="mt-3">
				<Form.Select
					id="bookChoiceField"
					onChange={(e) => setChoosenBookID(parseInt(e.target.value))}
					aria-label="Scelta del titolo da aggiungere in magazzino">
					<option className="text-muted" value={""}>
						Scegli un titolo tra quelli a catalogo
					</option>
					{books.map((book: Book) => (
						<option key={"book-" + book.idBook} value={book.idBook}>
							{book.title} - {book.author.name}
						</option>
					))}
				</Form.Select>
			</Form.Group>

			{currentBook && <ReceiveBooks book={currentBook} />}
		</Container>
	);
};

export default ControlPanel;
