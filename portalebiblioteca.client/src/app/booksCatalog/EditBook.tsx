import { Container, Tab, Tabs } from "react-bootstrap";
import FormEditBook from "./components/FormEditBook";
import BackButton from "../_miscellaneous/reusable/BackButton";
import { useAppSelector } from "../../Functions/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookLoans from "../prestiti/BookLoans";
import InventoryTable from "../warehouse/components/InventoryTable";
import ReceiveBooks from "../warehouse/components/ReceiveBooksForm";

const EditBook = () => {
	//define hooks
	const navigate = useNavigate();
	const location = useLocation();

	// store variables
	const currentBook = useAppSelector((state) => state.bookState.currentBook);

	// variables
	const query = new URLSearchParams(location.search);
	const tab = query.get("tab");

	// function to handle the tab selection in the url
	const handleSelect = (selectedTab: string | null) => {
		if (!selectedTab) return;
		const searchParams = new URLSearchParams(location.search);
		searchParams.set("tab", selectedTab);
		navigate(location.pathname + "?" + searchParams.toString());
	};

	return (
		<Container>
			<BackButton />
			<div className="alert alert-primary d-flex justify-content-between ">
				<Link
					to={"/catalogo/details/" + currentBook?.idBook}
					className="d-flex align-items-center gap-3 text-dark">
					<img
						src={currentBook?.coverImage}
						height={"100px"}
						alt="copertina libro"
					/>
					<div>
						<h1 className="m-0">{currentBook?.title}</h1>
						<h4>{currentBook?.author.name}</h4>
					</div>
				</Link>

				<div className="d-none gap-4 d-sm-flex">
					<div>
						<dt>In magazzino:</dt>
						<dd>{currentBook?.warehouseQuantity}</dd>
						<dt>Disponibile al pubblico:</dt>
						<dd>{currentBook?.availableQuantity}</dd>
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
				defaultActiveKey={tab || "Edit"}
				activeKey={tab ? tab : "Edit"}
				id="uncontrolled-tab-example"
				onSelect={handleSelect}>
				<Tab eventKey="Edit" title="Modifica dettagli">
					<FormEditBook />
				</Tab>
				<Tab eventKey="Warehouse" title="Magazzino">
					<InventoryTable />
				</Tab>
				<Tab eventKey="Receive" title="Ricevi nuovi libri">
					<ReceiveBooks />
				</Tab>
				<Tab eventKey="Loans" title="Visualizza prestiti">
					<BookLoans />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default EditBook;
