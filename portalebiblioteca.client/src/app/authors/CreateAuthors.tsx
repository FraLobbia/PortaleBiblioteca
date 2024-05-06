import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { Author } from "../../interfaces/book.interface";
import { createAuthorFetch } from "../../api/authors/authorsCRUDFetches";
import { useAppDispatch } from "../../Functions/hooks";

const CreateAuthors = () => {
	// define hooks
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// variables
	const [name, setName] = useState("");
	const [biography, setBiography] = useState("");

	// function to handle the submit of the form
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newAuthorObj: Author = {
			name,
			biography,
		};
		dispatch(createAuthorFetch(newAuthorObj)).then(() => {
			navigate("/autori");
		});
	};

	return (
		<Container>
			<BackButton />
			<h1>Aggiungi nuovo autore</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il nome dell'autore da creare"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Biografia</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Inserisci la biografia dell'autore"
						value={biography}
						onChange={(e) => setBiography(e.target.value)}
					/>
				</Form.Group>

				<Button variant="success" className="mt-3" type="submit">
					Inserisci nuovo autore
				</Button>
			</Form>
		</Container>
	);
};

export default CreateAuthors;
