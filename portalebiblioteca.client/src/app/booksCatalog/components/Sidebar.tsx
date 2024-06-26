import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { Genre } from "../../../interfaces/genre.interface";
import { fetchGenres } from "../../../api/genres/genresCRUDFetches";
import { Book } from "../../../interfaces/book.interface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
	setAuthorsToExclude,
	setGenreToExclude,
} from "../../../Redux/slicers/preferencesSlice";

const Sidebar = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { genres } = useAppSelector((state) => state.genreState);
	const { AuthorsToExclude, GenreToExclude } = useAppSelector(
		(state) => state.preferenceState
	);
	const { books } = useAppSelector((state) => state.bookState);

	// variables
	const [show, setShow] = useState(false);
	const [buttonGenText, setButtonGenText] = useState("Deseleziona tutti");
	const [buttonAutText, setButtonAutText] = useState("Deseleziona tutti");

	// functions to handle the offcanvas
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// what appens when the component is mounted
	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	// function to handle the GENRE choice and update the store redux
	const handleGenreChoice = (idGenre: number): void => {
		if (!GenreToExclude?.includes(idGenre)) {
			// if is NOT in the list, dispatch the list plus the genre
			dispatch(setGenreToExclude([...GenreToExclude, idGenre]));
		} else {
			// if is in the list, dispatch the list without the genre
			dispatch(
				setGenreToExclude(
					GenreToExclude?.filter((genre) => genre !== idGenre)
				)
			);
		}
	};

	// function to handle the AUTHOR choice and update the store redux
	const handleAuthorChoice = (idAuthor: number): void => {
		if (!AuthorsToExclude.includes(idAuthor)) {
			// if input is NOT checked, add the author to the list
			dispatch(setAuthorsToExclude([...AuthorsToExclude, idAuthor]));
		} else {
			// if input is checked, remove the author from the list
			dispatch(
				setAuthorsToExclude(
					AuthorsToExclude.filter((author) => author !== idAuthor)
				)
			);
		}
	};

	// function to handle the select all genres button
	const handleSelectAllGenres = () => {
		if (buttonGenText === "Seleziona tutti") {
			dispatch(setGenreToExclude([]));
			setButtonGenText("Deseleziona tutti");
			return;
		} else {
			const deselectAllGenres = [] as number[];
			books.forEach((book: Book) => {
				deselectAllGenres.push(book.idGenre);
			});
			dispatch(setGenreToExclude(deselectAllGenres));
			setButtonGenText("Seleziona tutti");
		}
	};

	// function to handle the select all authors button
	const handleSelectAllAuthors = () => {
		if (buttonAutText === "Seleziona tutti") {
			dispatch(setAuthorsToExclude([]));
			setButtonAutText("Deseleziona tutti");
			return;
		} else {
			const deselectAllAuthors = [] as number[];
			books.forEach((book: Book) => {
				deselectAllAuthors.push(book.author.idAuthor as number);
			});
			dispatch(setAuthorsToExclude(deselectAllAuthors));
			setButtonAutText("Seleziona tutti");
		}
	};

	return (
		<>
			<Button
				variant="outline-secondary"
				className="d-lg-none mb-2 shadow-sm"
				onClick={handleShow}>
				<FontAwesomeIcon icon={faFilter} />
			</Button>

			<Offcanvas show={show} onHide={handleClose} responsive="lg">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className="text-mattone fw-bold">
						Filtri
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="d-flex flex-column gap-2 mt-5">
					<h3 className="mt-5">Generi</h3>
					<Button
						variant="outline-secondary"
						className="shadow-sm"
						onClick={handleSelectAllGenres}>
						{buttonGenText}
					</Button>
					{genres &&
						genres.map((genre: Genre) => (
							<div key={"genre-" + genre.idGenre}>
								<input
									className="form-check-input border-0 me-4"
									type="checkbox"
									checked={
										!GenreToExclude.includes(
											genre.idGenre as number
										)
									}
									id={
										genre.idGenre
											? genre.idGenre.toString()
											: ""
									}
									onChange={() =>
										handleGenreChoice(
											genre.idGenre as number
										)
									}
								/>
								<label
									htmlFor={
										genre.idGenre
											? genre.idGenre.toString()
											: ""
									}>
									{genre.name}
								</label>
							</div>
						))}
					<h3 className="mt-5">Autori</h3>
					<Button
						variant="outline-secondary"
						className="shadow-sm"
						onClick={handleSelectAllAuthors}>
						{buttonAutText}
					</Button>
					{books &&
						books
							.filter(
								(book) => !GenreToExclude.includes(book.idGenre)
							)
							.reduce(
								// to have unique authors I have to reduce the array of books
								(uniqueAuthorsForBook: Book[], book: Book) => {
									if (
										!uniqueAuthorsForBook.some(
											(item) =>
												item.author === book.author
										)
									) {
										uniqueAuthorsForBook.push(book);
									}
									return uniqueAuthorsForBook;
								},
								[]
							)
							.map((book: Book) => (
								<div key={"book-side-" + book.idBook}>
									<input
										className="form-check-input bg-secondary border-0 me-4"
										type="checkbox"
										checked={
											!AuthorsToExclude.includes(
												book.author.idAuthor as number
											)
										}
										id={
											book.author.idAuthor
												? book.author.idAuthor.toString()
												: ""
										}
										onChange={() =>
											handleAuthorChoice(
												book.author.idAuthor as number
											)
										}
									/>
									<label
										htmlFor={
											book.author.idAuthor
												? book.author.idAuthor.toString()
												: ""
										}>
										{book.author.name}
									</label>
								</div>
							))}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default Sidebar;
