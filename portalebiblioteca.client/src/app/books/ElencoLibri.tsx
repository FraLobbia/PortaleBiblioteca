import { useEffect } from "react";
import { fetchBookList } from "../../api/books/bookFetches";
import { Book } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ElencoLibri = () => {
	const books: Book[] = useAppSelector((state) => state.bookState.books);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchBookList());
	}, []);
	return (
		<Container>
			<h1 className="text-center">Elenco Libri</h1>
			<Row className="gy-2 justify-content-center">
				{books?.map((book: Book) => (
					<Col md={10} key={"book-" + book.idBook}>
						<Card>
							<Card.Img
								variant="top"
								style={{ height: "200px", objectFit: "cover" }}
								src={
									book.coverImage
										? book.coverImage
										: "https://unsplash.it/640/425"
								}
							/>
							<Card.Body>
								<Card.Title>{book.title}</Card.Title>
								<Card.Text>{book.description}</Card.Text>
								<Link
									className="btn btn-info"
									to={"details/" + book.idBook}>
									Dettagli libro
								</Link>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default ElencoLibri;
