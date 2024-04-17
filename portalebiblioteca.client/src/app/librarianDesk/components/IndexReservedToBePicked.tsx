import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../functions/hooks";
import { useEffect } from "react";
import {
	fetchMoveToDesk,
	fetchReservedToBePicked,
} from "../../../api/warehouse/warehouseFetches";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IndexReservedToBePicked = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// store variables
	const { reservedToBePicked } = useAppSelector(
		(state) => state.warehouseState
	);

	useEffect(() => {
		dispatch(fetchReservedToBePicked());
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
				navigate("/librarian");
			}
		});
	};
	return (
		<>
			<h3>Inventario</h3>

			<hr />

			<Table striped bordered hover responsive>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Scaffali pubblici</th>
						<th>Libro</th>
						<th>Utente</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{reservedToBePicked.length <= 0 ? (
						<tr>
							<td colSpan={3}>Nessun libro da prendere</td>
						</tr>
					) : (
						reservedToBePicked.map((item, index) => (
							<tr key={index}>
								<td>{item.shelf.shelfName}</td>
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
									<Button
										onClick={() =>
											dispatch(
												moveToDesk(item.idItemsEntity)
											)
										}>
										Sposta
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</>
	);
};

export default IndexReservedToBePicked;
