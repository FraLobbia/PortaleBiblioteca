import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { fetchBookCreate } from "../../api/booksCatalog/bookCRUDFetches";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { Link, useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api/genres/genresCRUDFetches";
import { BookDTO } from "../../interfaces/book.interface";
import { fetchAuthors } from "../../api/authors/authorsCRUDFetches";

const FormAddBook = () => {
	//define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// variables
	const [autoreID, setAutoreID] = useState<number>(0);
	const [titolo, setTitolo] = useState<string>("");
	const [descrizione, setDescrizione] = useState<string>("");
	const [genere, setGenere] = useState<number>(0);
	const [dataPubblicazione, setDataPubblicazione] = useState<Date>();
	const [isbn, setIsbn] = useState<string>("");
	const [immagineCopertina, setImmagineCopertina] = useState<string>("");
	const { permissionsToEdit } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// store variables
	const { genres } = useAppSelector((state) => state.genreState);
	const { authors } = useAppSelector((state) => state.authorState);

	// function to handle the submit of the form
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newBook: BookDTO = {
			idAuthor: autoreID,
			title: titolo,
			description: descrizione,
			idGenre: genere,
			publicationDate: dataPubblicazione,
			isbn: isbn,
			coverImage: immagineCopertina,
		};
		dispatch(fetchBookCreate(newBook));
		navigate("/catalogo");
	};

	// what appens when the component is mounted
	useEffect(() => {
		if (!permissionsToEdit) {
			navigate("/catalogo");
		} else {
			dispatch(fetchGenres());
			dispatch(fetchAuthors());
		}
	}, []);

	return (
		<Container>
			<BackButton />
			<h1 className="text-center">Aggiungi un Libro</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="">
					<Form.Label>Autore</Form.Label>
					<Form.Select
						id="autoreField"
						value={autoreID}
						onChange={(e) => setAutoreID(parseInt(e.target.value))}>
						<option value="">Seleziona un autore</option>
						{authors.map((author) => (
							<option
								key={"autho-" + author.idAuthor}
								value={author.idAuthor}>
								{author.name}
							</option>
						))}
					</Form.Select>
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
						onChange={(e) => setGenere(parseInt(e.target.value))}>
						<option value="">Seleziona un genere</option>
						{genres.map((genre) => (
							<option
								key={"genre-" + genre.idGenre}
								value={genre.idGenre}>
								{genre.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Link to="/generi/add" className="btn btn-link p-0 mb-3">
					Genere non presente? Clicca qui per aggiungerlo
				</Link>

				<Form.Group className="mb-3">
					<Form.Label>Data pubblicazione</Form.Label>
					<Form.Control
						id="dataPubblicazioneField"
						type="date"
						value={
							dataPubblicazione
								? dataPubblicazione.toISOString().split("T")[0]
								: ""
						}
						onChange={(e) =>
							setDataPubblicazione(new Date(e.target.value))
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
						type="text"
						placeholder="Inserisci l'immagine di copertina"
						value={immagineCopertina}
						onChange={(e) => setImmagineCopertina(e.target.value)}
					/>
				</Form.Group>

				<Button variant="success" type="submit">
					Aggiungi libro
				</Button>
			</Form>
		</Container>
	);
};

export default FormAddBook;
