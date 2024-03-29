import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { BookCreateForm } from "../../interfaces/book.interface";
import { fetchBookCreate } from "../../api/books/bookFetches";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import BackButton from "../miscellaneousComponent/reusable/BackButton";
import { useNavigate } from "react-router-dom";

const FormAddBook = () => {
	const dispatch = useAppDispatch();
	const [autore, setAutore] = useState<string>("");
	const [titolo, setTitolo] = useState<string>("");
	const [descrizione, setDescrizione] = useState<string>("");
	const [genere, setGenere] = useState<string>("");
	const [dataPubblicazione, setDataPubblicazione] = useState<Date>();
	const [isbn, setIsbn] = useState<string>("");
	const [immagineCopertina, setImmagineCopertina] = useState<string>("");
	const { permissionsToEdit } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newBook: BookCreateForm = {
			author: autore,
			title: titolo,
			description: descrizione,
			genre: genere,
			publicationDate: dataPubblicazione,
			isbn: isbn,
			coverImage: immagineCopertina,
		};
		dispatch(fetchBookCreate(newBook));
		navigate("/catalogo");
	};

	useEffect(() => {
		if (!permissionsToEdit) {
			navigate("/catalogo");
		}
	}, []);

	return (
		<Container>
			<BackButton path="/catalogo" />
			<h1 className="text-center">Aggiungi un Libro</h1>
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
						type="textarea"
						placeholder="Inserisci la descrizione"
						value={descrizione}
						onChange={(e) => setDescrizione(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Genere</Form.Label>
					<Form.Control
						id="genereField"
						type="text"
						placeholder="Inserisci il genere"
						value={genere}
						onChange={(e) => setGenere(e.target.value)}
					/>
				</Form.Group>

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
