import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { fetchAuthors } from "../../api/authors/authorsCRUDFetches";

const IndexAuthors = () => {
	const dispatch = useAppDispatch();
	const { authors } = useAppSelector((state) => state.authorState);

	useEffect(() => {
		dispatch(fetchAuthors());
	}, []);
	return (
		<Container>
			<BackButton />
			<h1 className="text-center">Elenco Autori</h1>
			<Link to="/generi/add" className="btn btn-success my-3">
				Aggiungi nuovo Autore
			</Link>
			<table className="table table-light">
				<thead>
					<tr>
						<th>Nome</th>
						<th>Biografia</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{authors.map((author) => (
						<tr key={author.idAuthor}>
							<td>{author.name}</td>
							<td>{author.biography}</td>
							<td className="d-flex flex-column gap-2">
								<Link
									to={"edit/" + author.idAuthor}
									className="btn btn-warning">
									Modifica
								</Link>
								<Button className="btn btn-danger">
									Elimina
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
};

export default IndexAuthors;
