import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { useEffect, useState } from "react";
import {
	fetchBookById,
	fetchBookDelete,
	fetchBookEdit,
} from "../../api/books/bookCRUDFetches";
import { Button, Container, Form } from "react-bootstrap";
import { BookToEdit } from "../../interfaces/book.interface";
import BackButton from "../_miscellaneous/reusable/BackButton";
import Swal from "sweetalert2";
import { fetchGenres } from "../../api/genres/genresCRUDFetches";

const FormEditBook = () => {
	const book = useAppSelector((state) => state.bookState.currentBook);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const [autore, setAutore] = useState<string>("");
	const [titolo, setTitolo] = useState<string>("");
	const [descrizione, setDescrizione] = useState<string>("");
	const [genere, setGenere] = useState<number>(0);
	const [quantitaDisponibile, setQuantitaDisponibile] = useState<number>(0);
	const [dataPubblicazione, setDataPubblicazione] = useState<Date>();
	const [isbn, setIsbn] = useState<string>("");
	const [immagineCopertina, setImmagineCopertina] = useState<string>("");
	const navigate = useNavigate();
	const { genres } = useAppSelector((state) => state.genreState);
	// Function to handle form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!id) return;
		const editedBook: BookToEdit = {
			idBook: parseInt(id),
			author: autore,
			title: titolo,
			description: descrizione,
			idGenre: genere,
			availableQuantity: quantitaDisponibile,
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
			setQuantitaDisponibile(book.availableQuantity || 0);
			//setDataPubblicazione(book.publicationDate || new Date());
			setIsbn(book.isbn || "");
			setImmagineCopertina(book.coverImage || "");
		}
	}, [book]);

	return (
		<Container>
			<BackButton />
			<div className="d-flex justify-content-between">
				<h1>Modifica libro</h1>
				<Button variant="danger" onClick={() => handleDelete(id)}>
					Vuoi invece eliminarlo?
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
							<Form.Label>Quantità disponibile</Form.Label>
							<Form.Control
								id="QuantitàField"
								type="number"
								value={quantitaDisponibile}
								onChange={(e) =>
									setQuantitaDisponibile(
										parseInt(e.target.value)
									)
								}
							/>
						</Form.Group>

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

						<Button variant="success" type="submit">
							Salva modifica
						</Button>
					</Form>
				</>
			)}
		</Container>
	);
};

export default FormEditBook;
