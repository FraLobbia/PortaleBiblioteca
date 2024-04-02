import { useEffect } from "react";
import { fetchBookById } from "../../api/books/bookCRUDFetches";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { formatData } from "../../functions/utility";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { addLoanToUser } from "../../api/books/bookLOANSFetches";
import { loanObjForm } from "../../interfaces/loans.interface";

const FormAddLoan = () => {
	const dispatch = useAppDispatch();
	const book = useAppSelector((state) => state.bookState.currentBook);
	const { permissionsToEdit, user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) dispatch(fetchBookById(id));
	}, []);

	const createLoan = () => {
		if (!book || !user) return;
		const idBook = book.idBook;
		const idUser = user.idUser;

		const loanObJ: loanObjForm = {
			idBook: idBook.toString(),
			IdUser: idUser.toString(),
		};

		addLoanToUser(loanObJ);
	};

	return (
		<Container>
			<BackButton path="/catalogo" />
			<h1>Prendi in prestito</h1>

			<Row className="justify-content-center">
				{book && (
					<>
						<Col xs={8} md={3}>
							<img
								className="img-fluid border border-dark rounded"
								style={{
									objectFit: "cover",
								}}
								src={book.coverImage}
								alt={book.title}
							/>
							<dt>Quantità in prestito:</dt>
							<dd>{book.loanQuantity}</dd>
							<dt>Quantità disponibile:</dt>
							<dd>{book.availableQuantity}</dd>

							<Button
								onClick={createLoan}
								variant="primary"
								className="my-2">
								Prendi in prestito
							</Button>
							{permissionsToEdit && (
								<Link
									to={"/catalogo/edit/" + book.idBook}
									className="btn btn-warning">
									Modifica dettagli
								</Link>
							)}
						</Col>
						<Col xs={9}>
							<dt>Autore:</dt>
							<dd>{book.author}</dd>
							<dt>Titolo:</dt>
							<dd>{book.title}</dd>
							<dt>Descrizione:</dt>
							<dd>{book.description}</dd>
							<dt>Genere:</dt>
							<dd>{book.genre}</dd>
							<dt>Data di pubblicazione:</dt>
							<dd>{formatData(book.publicationDate)}</dd>
							<dt>ISBN:</dt>
							<dd>{book.isbn}</dd>
						</Col>
					</>
				)}
			</Row>
		</Container>
	);
};

export default FormAddLoan;
