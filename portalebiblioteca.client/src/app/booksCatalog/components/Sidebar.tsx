import { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { Genre } from "../../../interfaces/genre.interface";
import { fetchGenres } from "../../../api/genres/genresCRUDFetches";
import { Book } from "../../../interfaces/book.interface";
import {
	setChoosenAuthors,
	setChoosenGenresIDs,
} from "../../../redux/slicers/preferencesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { genres } = useAppSelector((state) => state.genreState);
	const { notChoosenAuthors, notChoosenGenresIDs } = useAppSelector(
		(state) => state.preferenceState
	);
	const { books } = useAppSelector((state) => state.bookState);

	// variables
	const [show, setShow] = useState(false);
	const arrayNotGenresChosen: number[] = [...notChoosenGenresIDs];
	const arrayNotChoosenAuthors: string[] = [...notChoosenAuthors];

	// functions to handle the offcanvas
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// what appens when the component is mounted
	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	// function to handle the genre choice and update the store
	const handleGenreChoice = (idGenre: number): void => {
		if (arrayNotGenresChosen.includes(idGenre)) {
			const index = arrayNotGenresChosen.indexOf(idGenre);
			arrayNotGenresChosen.splice(index, 1);
			dispatch(setChoosenGenresIDs(arrayNotGenresChosen));
		} else {
			arrayNotGenresChosen.push(idGenre);
			dispatch(setChoosenGenresIDs(arrayNotGenresChosen));
		}
	};

	// function to handle the author choice and update the store
	const handleAuthorChoice = (author: string): void => {
		if (arrayNotChoosenAuthors.includes(author)) {
			const index = arrayNotChoosenAuthors.indexOf(author);
			arrayNotChoosenAuthors.splice(index, 1);
			dispatch(setChoosenAuthors(arrayNotChoosenAuthors));
		} else {
			arrayNotChoosenAuthors.push(author);
			dispatch(setChoosenAuthors(arrayNotChoosenAuthors));
		}
	};

	return (
		<>
			<Button
				variant="outline-secondary"
				className="d-lg-none mb-2"
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
					{genres &&
						genres.map((genre: Genre) => (
							<div key={"genre-" + genre.idGenre}>
								<input
									className="form-check-input bg-secondary border-0 me-4"
									type="checkbox"
									defaultChecked={true}
									id={
										genre.idGenre
											? genre.idGenre.toString()
											: ""
									}
									onChange={() =>
										handleGenreChoice(genre.idGenre)
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
					{books &&
						books
							.filter(
								(book) =>
									!notChoosenGenresIDs.includes(book.idGenre)
							)
							.reduce((uniqueAuthors: Book[], book: Book) => {
								if (
									!uniqueAuthors.some(
										(item) => item.author === book.author
									)
								) {
									uniqueAuthors.push(book);
								}
								return uniqueAuthors;
							}, [])
							.map((book: Book) => (
								<div key={"book-side-" + book.idBook}>
									<input
										className="form-check-input bg-secondary border-0 me-4"
										type="checkbox"
										defaultChecked={true}
										id={
											book.author.name
												? book.author.name
												: ""
										}
										onChange={() =>
											handleAuthorChoice(book.author.name)
										}
									/>
									<label
										htmlFor={
											book.idGenre
												? book.idGenre.toString()
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
