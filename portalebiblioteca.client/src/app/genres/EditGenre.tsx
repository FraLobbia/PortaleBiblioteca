import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Genre } from "../../interfaces/genre.interface";
import { useNavigate, useParams } from "react-router-dom";
import {
	editGenreFetch,
	fetchGenreById,
} from "../../api/genres/genresCRUDFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";

const EditGenre = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// variables
	const { id } = useParams();
	const [name, setName] = useState<string>("");
	const [description = "", setDescription] = useState<string>("");

	// store variables
	const genre = useAppSelector((state) => state.genreState.currentGenre);

	// function to handle the submit of the form
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

	// what happens when the component mounts
	useEffect(() => {
		if (id) dispatch(fetchGenreById(id));
	}, []);

	// fill the form with the genre data
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

export default EditGenre;
