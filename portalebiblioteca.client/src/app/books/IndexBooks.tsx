import { useEffect } from "react";
import {
	fetchBookCreate,
	fetchBookList,
} from "../../api/books/bookCRUDFetches";
import { Book, BookCreateForm } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const IndexBooks = () => {
	const navigate = useNavigate();
	const books: Book[] = useAppSelector((state) => state.bookState.books);
	const { permissionsToEdit } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchBookList());
	}, []);

	const aggiungilibroTEST = () => {
		const newBook: BookCreateForm = {
			author: "autore",
			title: new Date().toLocaleTimeString(),
			description: "descrizione",
			genre: "genere",
			publicationDate: new Date(),
			isbn: "isbn",
			coverImage: "immagineCopertina",
		};
		dispatch(fetchBookCreate(newBook)).then(() => {
			navigate("/catalogo");
		});
	};

	return (
		<Container>
			<h1 className="text-center mt-3">Elenco Libri</h1>
			<Button className="d-none todo" onClick={aggiungilibroTEST}>
				Aggiungi un libro di DEBUG
			</Button>
			<Row className="gy-2 justify-content-center">
				{books.length ? (
					books.map((book: Book) => (
						<Col md={10} key={"book-" + book.idBook}>
							<Card>
								<Card.Img
									variant="top"
									style={{
										height: "200px",
										objectFit: "cover",
									}}
									src={
										book.coverImage?.startsWith("http")
											? book.coverImage
											: "https://unsplash.it/640/425"
									}
								/>
								<Card.Body>
									<Card.Title>{book.title}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">
										{book.author}
									</Card.Subtitle>
									<Card.Text>{book.description}</Card.Text>
									<div className="d-flex gap-3 justify-content-end mt-3">
										{permissionsToEdit && (
											<Link
												className="btn btn-warning"
												to={"edit/" + book.idBook}>
												Modifica libro
											</Link>
										)}
										<Link
											className="btn btn-success"
											to={"details/" + book.idBook}>
											Vedi dettagli e prendi in prestito!
										</Link>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))
				) : (
					<div className="d-flex justify-content-center my-5 ">
						<SyncLoader color="#513329" size={20} />
					</div>
				)}
			</Row>
		</Container>
	);
};

export default IndexBooks;
