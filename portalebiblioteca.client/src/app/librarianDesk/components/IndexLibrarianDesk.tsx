import { Button, Form, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { useEffect, useState } from "react";
import {
	fetchBookAtLibrarianDesk,
	fetchMoveToDesk,
} from "../../../api/warehouse/warehouseFetches";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IndexLibrarianDesk = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// variables
	const [search, setSearch] = useState<string>("");

	// store variables
	const { librarianDesk } = useAppSelector((state) => state.warehouseState);

	useEffect(() => {
		dispatch(fetchBookAtLibrarianDesk());
	}, []);

	// function to handle submit
	const moveToDesk = (idItemsEntity: number) => {
		Swal.fire({
			title: "Spostare l'elemento sul banco?",
			showCancelButton: true,
			confirmButtonText: `Sì`,
			cancelButtonText: `No`,
		}).then((result) => {
			if (result.isConfirmed) {
				fetchMoveToDesk(idItemsEntity);
				navigate("/librarianDesk");
			}
		});
	};
	return (
		<>
			<Form>
				<Form.Control
					type="text"
					placeholder="Cerca un libro per titolo, autore o utente"
					className="my-3"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Form>

			<hr />

			<Table striped bordered hover responsive>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Libro</th>
						<th>Utente</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{librarianDesk.length <= 0 ? (
						<tr>
							<td colSpan={3}>Nessun libro da prendere</td>
						</tr>
					) : (
						librarianDesk
							.filter(
								(item) =>
									item.book.title
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									item.book.author.name
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									item.user?.firstName
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									item.user?.lastName
										.toLowerCase()
										.includes(search.toLowerCase())
							)
							.map((item, index) => (
								<tr key={index}>
									<td>
										<div className="d-flex align-items-center gap-2 justify-content-center">
											<img
												className="d-none d-md-block"
												src={item.book.coverImage}
												height={50}
												alt="copertina libro"
											/>
											<div>
												<p>{item.book.title} </p>
												<p>{item.book.author.name}</p>
											</div>
										</div>
									</td>
									<td>
										<div className="d-flex align-items-center gap-2 justify-content-center">
											<img
												className="d-none d-md-block"
												src={item.user?.userImage}
												alt="immagine user"
												height={50}
											/>
											{item.user?.firstName}{" "}
											{item.user?.lastName}
										</div>
									</td>
									<td>
										<Button>Consegna alla persona</Button>
									</td>
								</tr>
							))
					)}
				</tbody>
			</Table>
		</>
	);
};

export default IndexLibrarianDesk;
