import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Genre } from "../../interfaces/genre.interface";
import { useNavigate } from "react-router-dom";
import { createGenreFetch } from "../../api/genres/genresCRUDFetches";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppDispatch } from "../../Functions/hooks";

const CreateGenre = () => {
	// define hooks
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// variables
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	// function to handle the submit of the form
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newGenreObj: Genre = {
			name,
			description,
		};
		dispatch(createGenreFetch(newGenreObj)).then(() => {
			navigate("/generi");
		});
	};

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

export default CreateGenre;
