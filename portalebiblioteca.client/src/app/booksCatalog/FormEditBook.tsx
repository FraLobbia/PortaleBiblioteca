import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { useEffect, useState } from "react";
import {
	fetchBookById,
	fetchBookDelete,
	fetchBookEdit,
} from "../../api/booksCatalog/bookCRUDFetches";
import { Button, Container, Form } from "react-bootstrap";
import { BookDTO } from "../../interfaces/book.interface";
import BackButton from "../_miscellaneous/reusable/BackButton";
import Swal from "sweetalert2";
import { fetchGenres } from "../../api/genres/genresCRUDFetches";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const FormEditBook = () => {
	const book = useAppSelector((state) => state.bookState.currentBook);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const [autore, setAutore] = useState<string>("");
	const [titolo, setTitolo] = useState<string>("");
	const [descrizione, setDescrizione] = useState<string>("");
	const [genere, setGenere] = useState<number>(0);
	const [dataPubblicazione, setDataPubblicazione] = useState<Date>();
	const [isbn, setIsbn] = useState<string>("");
	const [immagineCopertina, setImmagineCopertina] = useState<string>("");
	const navigate = useNavigate();
	const { genres } = useAppSelector((state) => state.genreState);
	// Function to handle form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!id) return;
		const editedBook: BookDTO = {
			idBook: parseInt(id),
			author: autore,
			title: titolo,
			description: descrizione,
			idGenre: genere,
			publicationDate: dataPubblicazione,
			isbn: isbn,
			coverImage: immagineCopertina,
		};
		dispatch(fetchBookEdit(editedBook, navigate));
		//navigate("/catalogo");
	};

	const handleDelete = (id: string | undefined) => {
		Swal.fire({
			title: "Sei sicuro di voler cancellare questo elemento?",
			text: "Non potrai tornare indietro!",
			icon: "warning",
			showCancelButton: true,
			cancelButtonText: "No, annulla!",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sì, cancellalo!",
			showLoaderOnConfirm: true,
			preConfirm: () => {},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(fetchBookDelete(id || "", navigate));
			}
		});
	};

	// Fetch book by id when component mounts
	useEffect(() => {
		if (id) dispatch(fetchBookById(id));
		dispatch(fetchGenres());
	}, []);

	useEffect(() => {
		if (book) {
			setAutore(book.author);
			setTitolo(book.title);
			setDescrizione(book.description || "");
			setGenere(book.idGenre || 0);
			//setDataPubblicazione(book.publicationDate || new Date());
			setIsbn(book.isbn || "");
			setImmagineCopertina(book.coverImage || "");
		}
	}, [book]);

	return (
		<Container>
			<BackButton />
			<div className="d-flex justify-content-between align-items-center">
				<h1>Modifica dettagli del libro</h1>
				<Button
					className="d-flex align-items-center gap-2"
					variant="danger"
					onClick={() => handleDelete(id)}>
					<FontAwesomeIcon icon={faTrashCan} />
					<span>Vuoi invece eliminarlo?</span>
				</Button>
			</div>
			{book && (
				<>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Autore</Form.Label>
							<Form.Control
								id="autoreField"
								type="text"
								placeholder="Inserisci l'autore"
								value={autore}
								onChange={(e) => setAutore(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Titolo</Form.Label>
							<Form.Control
								id="titoloField"
								type="text"
								placeholder="Inserisci il titolo"
								value={titolo}
								onChange={(e) => setTitolo(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Descrizione</Form.Label>
							<Form.Control
								id="descrizioneField"
								as="textarea"
								placeholder="Inserisci la descrizione"
								value={descrizione}
								onChange={(e) => setDescrizione(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="">
							<Form.Label>Genere</Form.Label>
							<Form.Select
								id="genereField"
								value={genere}
								onChange={(e) =>
									setGenere(parseInt(e.target.value))
								}>
								<option value="">Seleziona un genere</option>
								{genres.map((genre) => (
									<option
										key={genre.idGenre}
										value={genre.idGenre}>
										{genre.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Link
							to="/generi/add"
							className="btn btn-link p-0 mb-3">
							Genere non presente? Clicca qui per aggiungerlo
						</Link>

						<Form.Group className="mb-3">
							<Form.Label>Data pubblicazione</Form.Label>
							<Form.Control
								id="dataPubblicazioneField"
								type="date"
								value={
									dataPubblicazione
										? dataPubblicazione
												.toISOString()
												.split("T")[0]
										: ""
								}
								onChange={(e) =>
									setDataPubblicazione(
										new Date(e.target.value)
									)
								}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>ISBN</Form.Label>
							<Form.Control
								id="isbnField"
								type="text"
								placeholder="Inserisci l'ISBN"
								value={isbn}
								onChange={(e) => setIsbn(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Immagine copertina</Form.Label>
							<Form.Control
								id="immagineCopertinaField"
								as="textarea"
								placeholder="Inserisci l'immagine di copertina"
								value={immagineCopertina}
								onChange={(e) =>
									setImmagineCopertina(e.target.value)
								}
							/>
						</Form.Group>

						<Button
							className="d-flex align-items-center gap-2"
							variant="success"
							type="submit">
							<FontAwesomeIcon icon={faCheck} />
							Salva modifica
						</Button>
					</Form>
				</>
			)}
		</Container>
	);
};

export default FormEditBook;
