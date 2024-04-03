import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Genre } from "../../interfaces/genre.interface";
import { useNavigate, useParams } from "react-router-dom";
import {
	createGenreFetch,
	editGenreFetch,
	fetchGenreById,
} from "../../api/genres/genresCRUDFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { parse } from "path";

const FormEditGenres = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const [name, setName] = useState<string>("");
	const [description = "", setDescription] = useState<string>("");
	const navigate = useNavigate();
	const genre = useAppSelector((state) => state.genreState.currentGenre);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!id) return;
		const editedGenreObj: Genre = {
			idGenre: parseInt(id),
			name: name,
			description: description,
		};
		editGenreFetch(editedGenreObj).then(() => {
			navigate("/generi");
		});
	};

	useEffect(() => {
		if (id) dispatch(fetchGenreById(id));
	}, []);

	useEffect(() => {
		if (genre) {
			setName(genre.name);
			setDescription(genre.description);
		}
	}, [genre]);

	return (
		<Container>
			<BackButton />
			<h1>Aggiungi nuovo genere</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il nome del genere da creare"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Inserisci una descrizione del genere"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>

				<Button variant="success" className="mt-3" type="submit">
					Inserisci nuovo genere
				</Button>
			</Form>
		</Container>
	);
};

export default FormEditGenres;
