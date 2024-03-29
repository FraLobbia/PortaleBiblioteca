import { useEffect } from "react";
import { fetchBookById } from "../../api/books/bookFetches";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { formatData } from "../../functions/utility";
import BackButton from "../_miscellaneousComponent/reusable/BackButton";

const DetailBook = () => {
	const dispatch = useAppDispatch();
	const book = useAppSelector((state) => state.bookState.currentBook);
	const { permissionsToEdit } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) dispatch(fetchBookById(id));
	}, []);

	return (
		<Container>
			<Row className="justify-content-center">
				<Col>
					<BackButton path="/catalogo" />
					<h1>Dettagli libro</h1>
					{book && (
						<div>
							<img
								className="img-fluid border border-dark rounded"
								style={{ height: "300px", width: "200px" }}
								src={book.coverImage}
								alt={book.title}
							/>

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
							<dt>Quantità disponibile:</dt>
							<dd>{book.availableQuantity}</dd>
							<dt>Quantità in prestito:</dt>
							<dd>{book.loanQuantity}</dd>
							{permissionsToEdit && (
								<Link
									to={"/catalogo/edit/" + book.idBook}
									className="btn btn-warning">
									Modifica dettagli
								</Link>
							)}
						</div>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default DetailBook;
