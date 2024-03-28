import { useEffect } from "react";
import { fetchBookById } from "../../api/books/bookFetches";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { format } from "path";
import { formatData } from "../../functions/utility";

const DetailBook = () => {
	const dispatch = useAppDispatch();
	const book = useAppSelector((state) => state.bookState.currentBook);
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) dispatch(fetchBookById(id));
	}, []);

	return (
		<Container>
			<Link to="/catalogo" className="btn btn-primary">
				Indietro
			</Link>

			{book && (
				<div>
					<img
						className="img-fluid border border-dark rounded"
						src={book.coverImage}
						alt={book.title}
					/>
					<h1>Dettagli libro</h1>
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
					<Link
						to={"/catalogo/edit/" + book.idBook}
						className="btn btn-warning">
						Modifica dettagli
					</Link>
				</div>
			)}
		</Container>
	);
};

export default DetailBook;
