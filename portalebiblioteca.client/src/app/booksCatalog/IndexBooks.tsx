import { useEffect } from "react";
import {
	fetchBookCreate,
	fetchBookList,
} from "../../api/booksCatalog/bookCRUDFetches";
import { Book, BookDTO } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { truncateText } from "../../functions/utility";
import Sidebar from "./components/Sidebar";

const IndexBooks = () => {
	// define hooks
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// store variables
	const books: Book[] = useAppSelector((state) => state.bookState.books);
	const { permissionsToEdit } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { notChoosenAuthors, notChoosenGenresIDs } = useAppSelector(
		(state) => state.preferenceState
	);

	// what appens when the component is mounted
	useEffect(() => {
		dispatch(fetchBookList());
	}, []);

	// function to add a book for DEBUG
	const aggiungilibroTEST = () => {
		const newBook: BookDTO = {
			author: "Libro di DEBUG",
			title: new Date().toLocaleTimeString(),
			description: "Libro di DEBUG",
			idGenre: 1,
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
			<Row>
				<Col lg={3} className="d-flex justify-content-between">
					<Sidebar />
					<div className="vr ms-2"></div>
				</Col>
				<Col xs={12} lg={9}>
					<h1 className="text-center mt-3">Elenco Libri</h1>
					<Button className="d-none todo" onClick={aggiungilibroTEST}>
						Aggiungi un libro di DEBUG
					</Button>
					<Row
						className="gy-2 justify-content-center
			">
						{books.length ? (
							books
								.filter(
									(book) =>
										!notChoosenGenresIDs.includes(
											book.idGenre
										)
								)
								.filter(
									(book) =>
										!notChoosenAuthors.includes(book.author)
								)
								.map((book: Book) => (
									<Col md={10} key={"book-" + book.idBook}>
										<Card className=" flex-lg-row align-items-center">
											<Link to={"details/" + book.idBook}>
												<Card.Img
													style={{
														height: "300px",
														width: "200px",
														objectFit: "cover",
													}}
													src={
														book.coverImage
															?.length > 0
															? book.coverImage
															: "https://unsplash.it/640/425"
													}
												/>
											</Link>
											<Card.Body className="d-flex flex-column justify-content-between">
												<Card.Title>
													{book.title}
												</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">
													{book.author}
												</Card.Subtitle>
												<Card.Text>
													{truncateText(
														book.description,
														300
													)}
												</Card.Text>
												<div className="d-flex gap-3 justify-content-end mt-3">
													{permissionsToEdit && (
														<Link
															className="btn btn-warning"
															to={
																"edit/" +
																book.idBook
															}>
															Modifica libro
														</Link>
													)}
													<Link
														className="btn btn-success"
														to={
															"details/" +
															book.idBook
														}>
														Vedi dettagli e prendi
														in prestito!
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
				</Col>
			</Row>
		</Container>
	);
};

export default IndexBooks;
