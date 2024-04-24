import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { fetchGenres } from "../../api/genres/genresCRUDFetches";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";

const IndexGenres = () => {
	const dispatch = useAppDispatch();
	const { genres } = useAppSelector((state) => state.genreState);

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);
	return (
		<Container>
			<BackButton />
			<h1 className="text-center">Elenco generi</h1>
			<Link to="/generi/add" className="btn btn-success my-3">
				Aggiungi nuovo genere
			</Link>
			<Table bordered hover striped>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Descrizione</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{genres.map((genre) => (
						<tr key={"genre-" + genre.idGenre}>
							<td>{genre.name}</td>
							<td>{genre.description}</td>
							<td className="d-flex flex-column gap-2">
								<Link
									to={"edit/" + genre.idGenre}
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
			</Table>
		</Container>
	);
};

export default IndexGenres;
