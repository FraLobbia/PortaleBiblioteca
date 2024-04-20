import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import {
	editAuthorFetch,
	fetchAuthorById,
} from "../../api/authors/authorsCRUDFetches";
import { Author } from "../../interfaces/book.interface";

const EditAuthors = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// variables
	const { id } = useParams<{ id: string }>();
	const [name, setName] = useState<string>("");
	const [biography, setBiography] = useState<string>("");

	// store variables
	const { currentAuthor } = useAppSelector((state) => state.authorState);

	// function to handle the submit of the form
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!id) return;
		const editedAuthorObj: Author = {
			idAuthor: parseInt(id),
			name: name,
			biography: biography,
		};
		editAuthorFetch(editedAuthorObj).then(() => {
			navigate("/autori");
		});
	};

	// what happens when the component mounts
	useEffect(() => {
		if (id) dispatch(fetchAuthorById(id));
	}, []);

	// fill the form with the genre data
	useEffect(() => {
		if (currentAuthor) {
			setName(currentAuthor.name);
			setBiography(currentAuthor.biography);
		}
	}, [currentAuthor]);

	return (
		<Container>
			<BackButton />
			<h1>Modifica dettagli autore</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Modifica il nome dell'autore"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Biografia</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Modifica la biografria dell'autore"
						value={biography}
						onChange={(e) => setBiography(e.target.value)}
					/>
				</Form.Group>

				<Button variant="success" className="mt-3" type="submit">
					Modifica autore
				</Button>
			</Form>
		</Container>
	);
};

export default EditAuthors;
