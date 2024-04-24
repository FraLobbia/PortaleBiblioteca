import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Functions/hooks";
import {
	fetchAllItemsInVirtualShelf,
	fetchBookAtLibrarianDesk,
} from "../../../api/warehouse/warehouseFetches";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { flagLoanAsReturned } from "../../../api/loans/loansFetches";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllVirtualShelfIndex = () => {
	// define hooks
	const dispatch = useAppDispatch();

	// variables
	const [search, setSearch] = useState<string>("");

	// store variable
	const { virtualShelves } = useAppSelector((state) => state.warehouseState);

	// what happens when the component is rendered
	useEffect(() => {
		dispatch(fetchAllItemsInVirtualShelf());
	}, []);

	// function to return a book
	const returnBook = (idLoan: number | undefined) => {
		if (!idLoan) {
			Swal.fire({
				icon: "error",
				title: "Errore",
				text: "Sembra che questo libro non abbia un prestito associato!",
			});
			return;
		}
		Swal.fire({
			title: "Sei sicuro?",
			text: "Il libro verrà contrassegnato come restituito",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sì, restituisci!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(flagLoanAsReturned(idLoan)).then(() => {
					dispatch(fetchAllItemsInVirtualShelf()).then(() =>
						dispatch(fetchBookAtLibrarianDesk())
					);
				});
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
						<th className="table--destinatario-section">
							Destinatario prestito
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{virtualShelves.length <= 0 ? (
						<tr>
							<td colSpan={3}>
								Nessun prestito attivo al momento
							</td>
						</tr>
					) : (
						virtualShelves
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
										<Container>
											<Row>
												<Link
													to={`/catalogo/details/${item.book.idBook}`}
													className="d-flex align-items-center gap-2 justify-content-center">
													<Col
														xs={3}
														className="d-none d-md-block">
														<img
															src={
																item.book
																	.coverImage
															}
															height={50}
															style={{
																objectFit:
																	"cover",
															}}
															alt="copertina libro"
														/>
													</Col>
													<Col xs={9}>
														<p>
															{item.book.title}{" "}
														</p>
														<p>
															{
																item.book.author
																	.name
															}
														</p>
													</Col>
												</Link>
											</Row>
										</Container>
									</td>
									<td className="table--destinatario-section">
										<Container>
											<Row>
												<Col
													xs={3}
													className="d-none d-md-block">
													<img
														src={
															item.user?.userImage
														}
														alt="immagine user"
														style={{
															objectFit: "cover",
															height: 50,
															width: 50,
														}}
													/>
												</Col>
												<Col xs={9}>
													{item.user?.firstName}{" "}
													{item.user?.lastName}
												</Col>
											</Row>
										</Container>
									</td>
									<td>
										<Button
											onClick={() =>
												returnBook(item.idLoan)
											}>
											Ritira prestito
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

export default AllVirtualShelfIndex;
