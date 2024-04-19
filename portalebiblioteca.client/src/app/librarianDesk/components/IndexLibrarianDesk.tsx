import { Button, Form, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { useEffect, useState } from "react";
import {
	fetchBookAtLibrarianDesk,
	fetchMoveToVirtualShelf,
} from "../../../api/warehouse/warehouseFetches";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { setMoveSource } from "../../../Redux/slicers/warehouseSlice";

const IndexLibrarianDesk = () => {
	// define hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// variables
	const [search, setSearch] = useState<string>("");

	// store variables
	const { librarianDesk } = useAppSelector((state) => state.warehouseState);

	// define items filtered with loan
	const itemsWithLoan = librarianDesk
		.filter(
			(item) =>
				item.book.title.toLowerCase().includes(search.toLowerCase()) ||
				item.book.author.name
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				item.user?.firstName
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				item.user?.lastName.toLowerCase().includes(search.toLowerCase())
		)
		.filter((item) => item.user != null);

	// define items filtered without loan
	const itemsWithoutLoan = librarianDesk
		.filter(
			(item) =>
				item.book.title.toLowerCase().includes(search.toLowerCase()) ||
				item.book.author.name
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				item.user?.firstName
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				item.user?.lastName.toLowerCase().includes(search.toLowerCase())
		)
		.filter((item) => item.user === null);

	useEffect(() => {
		dispatch(fetchBookAtLibrarianDesk());
	}, []);

	// function to handle submit
	const deliverToUser = (IdItemsEntityToVirtual: number) => {
		Swal.fire({
			title: "Il libro è stato consegnato all'utente?",
			showCancelButton: true,
			confirmButtonText: `Sì`,
			cancelButtonText: `No`,
		}).then((result) => {
			if (result.isConfirmed) {
				fetchMoveToVirtualShelf(IdItemsEntityToVirtual);
				navigate("/librarian?tab=Desk");
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

			<h2>Libri da consegnare</h2>

			<Table striped bordered hover responsive>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Libro</th>
						<th>Destinatario prestito</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{itemsWithLoan.length <= 0 ? (
						<tr>
							<td colSpan={3}>
								Nessun libro con un prestito attivo.
							</td>
						</tr>
					) : (
						itemsWithLoan.map((item, index) => (
							<tr key={index}>
								<td>
									<Link
										to={`/catalogo/details/${item.book.idBook}`}
										className="d-flex align-items-center gap-2 justify-content-center">
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
									</Link>
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
											deliverToUser(item.idItemsEntity)
										}>
										Consegna alla persona
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>

			<hr />

			<h2>Libri da riporre in corsia</h2>

			<Table striped bordered hover responsive>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Libro</th>

						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{itemsWithoutLoan.length <= 0 ? (
						<tr>
							<td colSpan={2}>
								Nessun libro da riporre in corsia
							</td>
						</tr>
					) : (
						itemsWithoutLoan.map((item, index) => (
							<tr key={index}>
								<td>
									<Link
										to={`/catalogo/details/${item.book.idBook}`}
										className="d-flex align-items-center gap-2 justify-content-center">
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
									</Link>
								</td>

								<td>
									<Link
										to={
											"/warehouse/move/" +
											item.book.idBook
										}>
										<Button
											onClick={() =>
												dispatch(
													setMoveSource([
														item.shelf.shelfName,
														item.shelf.idShelf,
													])
												)
											}>
											Sposta in corsia
										</Button>
									</Link>
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
