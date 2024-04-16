import { Container, Tab, Tabs } from "react-bootstrap";
import FormEditBook from "./components/FormEditBook";
import InventoryTable from "../booksWarehouse/components/InventoryTable";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppSelector } from "../../functions/hooks";

const EditBook = () => {
	const { currentBook } = useAppSelector((state) => state.bookState);

	return (
		<Container>
			<BackButton />
			<div className="alert alert-primary d-flex justify-content-between ">
				<div className="d-flex align-items-center gap-3">
					<img
						src={currentBook?.coverImage}
						height={"100px"}
						alt="copertina libro"
					/>
					<div>
						<h1 className="m-0">{currentBook?.title}</h1>
						<h4>{currentBook?.author.name}</h4>
					</div>
				</div>
				<div className="d-flex gap-4">
					<div>
						<dt>Disponibile al pubblico:</dt>
						<dd>{currentBook?.availableQuantity}</dd>
						<dt>In magazzino:</dt>
						<dd>{currentBook?.warehouseQuantity}</dd>
					</div>
					<div className="vr"></div>
					<div>
						<dt>Al banco del bibliotecario:</dt>
						<dd>{currentBook?.atLibrarianDeskPickedQuantity}</dd>
						<dt>In prestito:</dt>
						<dd>{currentBook?.checkedOutForLoanQuantity}</dd>
					</div>
				</div>
			</div>
			<Tabs
				defaultActiveKey="Modifica dettagli"
				id="uncontrolled-tab-example">
				<Tab eventKey="Modifica dettagli" title="Modifica dettagli">
					<FormEditBook />
				</Tab>
				<Tab eventKey="Magazzino" title="Magazzino">
					<InventoryTable />
				</Tab>
				<Tab eventKey="Prestiti" title="Prestiti">
					<p>Disabled tab content</p>
				</Tab>
			</Tabs>
		</Container>
	);
};

export default EditBook;
