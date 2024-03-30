import { useEffect } from "react";
import { fetchBookCreate, fetchBookList } from "../../api/books/bookFetches";
import { Book, BookCreateForm } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";

const ElencoLibri = () => {
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
		dispatch(fetchBookCreate(newBook));
		navigate("/catalogo");
	};

	return (
		<Container>
			<h1 className="text-center">Elenco Libri</h1>
			<Button onClick={aggiungilibroTEST}>Aggiungi un libro</Button>
			<Row className="gy-2 justify-content-center">
				{books?.map((book: Book) => (
					<Col md={10} key={"book-" + book.idBook}>
						<Card>
							<Card.Img
								variant="top"
								style={{
									height: "200px",
									objectFit: "cover",
								}}
								src={
									book.coverImage
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
								<div className="d-flex gap-3">
									<Link
										className="btn btn-info"
										to={"details/" + book.idBook}>
										Dettagli libro
									</Link>
									{permissionsToEdit && (
										<Link
											className="btn btn-warning"
											to={"edit/" + book.idBook}>
											Modifica libro
										</Link>
									)}
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default ElencoLibri;
