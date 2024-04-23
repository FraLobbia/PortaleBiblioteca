import { Button, Form, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { useEffect, useState } from "react";
import {
	fetchBookAtLibrarianDesk,
	fetchMoveToDesk,
	fetchReservedToBePicked,
} from "../../../api/warehouse/warehouseFetches";
import Swal from "sweetalert2";
import { Book } from "../../../interfaces/book.interface";

const IndexReservedToBePicked = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// store variables
	const { reservedToBePicked } = useAppSelector(
		(state) => state.warehouseState
	);

	// variables
	const [search, setSearch] = useState<string>("");

	// what happens when the component is mounted
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
				fetchMoveToDesk(idItemsEntity).then(() =>
					dispatch(fetchReservedToBePicked()).then(() =>
						dispatch(fetchBookAtLibrarianDesk())
					)
				);
			}
		});
	};

	return (
		<>
			<Form className="my-3">
				<Form.Group>
					<Form.Control
						type="text"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						placeholder="Cerca un libro da prendere"
					/>
				</Form.Group>
			</Form>

			<Table striped bordered hover responsive>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Scaffali pubblici</th>
						<th>Libro</th>
						<th>Destinatario prestito</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{reservedToBePicked.length <= 0 ? (
						<tr>
							<td colSpan={4}>Nessun libro da prendere</td>
						</tr>
					) : (
						reservedToBePicked
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
									<td>{item.shelf.shelfName}</td>
									<td>
										<div className="d-flex align-items-center gap-2 justify-content-start">
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
										<div className="d-flex align-items-center gap-2 justify-content-start">
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
												moveToDesk(item.idItemsEntity)
											}>
											Prendi e porta al desk
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
