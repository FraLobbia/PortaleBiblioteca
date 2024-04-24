import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import { useEffect, useState } from "react";
import {
	fetchAllItemsInVirtualShelf,
	fetchBookAtLibrarianDesk,
	fetchMoveToVirtualShelf,
} from "../../../api/warehouse/warehouseFetches";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { setMoveSource } from "../../../Redux/slicers/warehouseSlice";
import { ItemsEntity } from "../../../interfaces/warehouse.interface";

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

	// Raggruppa gli elementi in un oggetto in cui
	// la chiave è il nome dello scaffale
	// e il valore è un array di ItemsEntity
	type GroupedItems = { [key: string]: ItemsEntity[] };
	const groupedItems: GroupedItems = itemsWithoutLoan.reduce((acc, item) => {
		const bookData = item.book.title + " " + item.book.author.name;
		if (!acc[bookData]) {
			acc[bookData] = [];
		}
		acc[bookData].push(item);
		return acc;
	}, {} as GroupedItems);

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
				dispatch(fetchMoveToVirtualShelf(IdItemsEntityToVirtual))
					.then(() => dispatch(fetchAllItemsInVirtualShelf()))
					.then(() => dispatch(fetchBookAtLibrarianDesk()))
					.then(() => navigate("/librarian?tab=Desk"));
			}
		});
	};
	return (
		<>
			<Form className="my-3">
				<Form.Control
					type="text"
					placeholder="Cerca un libro al banco del bibliotecario"
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
						<th>Utente</th>
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
									<Container fluid>
										<Link
											to={`/catalogo/details/${item.book.idBook}`}>
											<Row>
												<Col
													xs={3}
													className="d-none d-md-block">
													<img
														src={
															item.book.coverImage
														}
														height={50}
														alt="copertina libro"
													/>
												</Col>
												<Col xs={9}>
													<p>{item.book.title} </p>
													<p>
														{item.book.author.name}
													</p>
												</Col>
											</Row>
										</Link>
									</Container>
								</td>
								<td>
									<Container fluid>
										<Row>
											<Col
												xs={3}
												className="d-none d-md-block">
												<img
													src={item.user?.userImage}
													alt="immagine user"
													height={50}
												/>
											</Col>
											<Col xs={12} md={9}>
												<p>{item.user?.firstName} </p>
												<p>{item.user?.lastName}</p>
											</Col>
										</Row>
									</Container>
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

			<h2>Libri restituiti da riporre in corsia</h2>

			<Table striped bordered hover responsive>
				<thead className="container text-center">
					<tr className="row-cols-4 m-0">
						<th>Libro</th>
						<th>Quantità</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{itemsWithoutLoan.length <= 0 ? (
						<tr>
							<td colSpan={3}>
								Nessun libro da riporre in corsia
							</td>
						</tr>
					) : (
						groupedItems &&
						Object.keys(groupedItems).map((bookData, index) => {
							const items = groupedItems[bookData];
							const firstItem = items[0];
							return (
								<tr key={index} className="row-cols-4 m-0">
									<td>
										<Container fluid>
											<Row>
												<Link
													to={`/catalogo/details/${firstItem.book.idBook}`}
													className="d-flex align-items-center gap-2 justify-content-center">
													<Col
														xs={3}
														className="d-none d-md-block">
														<img
															src={
																firstItem.book
																	.coverImage
															}
															height={50}
															alt="copertina libro"
														/>
													</Col>
													<Col xs={12} md={9}>
														<p>
															{
																firstItem.book
																	.title
															}{" "}
														</p>
														<p>
															{
																firstItem.book
																	.author.name
															}
														</p>
													</Col>
												</Link>
											</Row>
										</Container>
									</td>
									<td>
										{items.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}
									</td>
									<td>
										<Link
											to={
												"/warehouse/move/" +
												firstItem.book.idBook
											}>
											<Button
												onClick={() =>
													dispatch(
														setMoveSource([
															firstItem.shelf
																.shelfName,
															firstItem.shelf
																.idShelf,
														])
													)
												}>
												Sposta in corsia
											</Button>
										</Link>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</Table>
		</>
	);
};

export default IndexLibrarianDesk;
