import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { fetchAuthors } from "../../api/authors/authorsCRUDFetches";

const IndexAuthors = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const [search, setSearch] = useState<string>("");

	// what happens when the component is rendered
	useEffect(() => {
		dispatch(fetchAuthors());
	}, []);

	// store variables
	const { authors } = useAppSelector((state) => state.authorState);

	return (
		<Container>
			<BackButton />
			<h1 className="text-center">Elenco Autori</h1>
			<Link to="/autori/add" className="btn btn-success my-3">
				Aggiungi nuovo Autore
			</Link>
			<Form className="my-3">
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Cerca autore"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Form.Group>
			</Form>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Biografia</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{authors
						.filter(
							(author) =>
								author.name
									.toLowerCase()
									.includes(search.toLowerCase()) ||
								author.biography
									.toLowerCase()
									.includes(search.toLowerCase())
						)
						.map((author) => (
							<tr key={author.idAuthor}>
								<td>{author.name}</td>
								<td>{author.biography}</td>
								<td>
									<div className="d-flex flex-column gap-3">
										<Link
											to={"edit/" + author.idAuthor}
											className="btn btn-warning">
											Modifica
										</Link>
										<Button className="btn btn-danger">
											Elimina
										</Button>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Container>
	);
};

export default IndexAuthors;
