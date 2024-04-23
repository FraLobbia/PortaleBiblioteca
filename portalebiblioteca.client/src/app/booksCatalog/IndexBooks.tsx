import { useEffect, useState } from "react";
import { fetchBookList } from "../../api/booksCatalog/bookCRUDFetches";
import { Book } from "../../interfaces/book.interface";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { Col, Container, Form, Row } from "react-bootstrap";

import { SyncLoader } from "react-spinners";
import Sidebar from "./components/Sidebar";
import { intializePreferencesBooks } from "../../Redux/slicers/preferencesSlice";
import SingelIndexBook from "./components/SingleIndexBook";

const IndexBooks = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const books: Book[] = useAppSelector((state) => state.bookState.books);
	const { AuthorsToExclude, GenreToExclude } = useAppSelector(
		(state) => state.preferenceState
	);

	// variables
	const [search, setSearch] = useState<string>("");

	// what appens when the component is mounted
	useEffect(() => {
		dispatch(intializePreferencesBooks());
		dispatch(fetchBookList());
	}, []);

	return (
		<Container>
			<h1 className="text-center mt-3 typewriter">
				I Libri del nostro catalogo
			</h1>

			<Row>
				<Col lg={3} className="d-flex justify-content-between">
					<Sidebar />
					<div className="vr d-none d-lg-block ms-2"></div>
				</Col>

				<Col xs={12} lg={9}>
					<Row
						className="gy-2 justify-content-center
			">
						<Form>
							<Form.Control
								type="text"
								placeholder="Cerca un libro per titolo o autore"
								className="mb-3 shadow"
								value={search}
								onSubmit={(e) => e.preventDefault()}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Form>
						{books.length ? (
							books
								// 1° filter: exclude by genre
								.filter(
									(book) =>
										!GenreToExclude?.includes(book.idGenre)
								)
								// 2° filter: exclude by author
								.filter(
									(book) =>
										!AuthorsToExclude?.includes(
											book.author.idAuthor as number
										)
								)
								// 3° filter: search input in title and author
								.filter(
									(book) =>
										book.title
											.toLowerCase()
											.includes(search.toLowerCase()) ||
										book.author.name
											.toLowerCase()
											.includes(search.toLowerCase())
								)
								.map((book: Book) => (
									<Col
										md={12}
										className="position-relative"
										key={"book-" + book.idBook}>
										<SingelIndexBook
											key={"book-" + book.idBook}
											book={book}
										/>
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
