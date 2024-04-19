import { Container, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";
import IndexReservedToBePicked from "./components/IndexReservedToBePicked";
import IndexLibrarianDesk from "./components/IndexLibrarianDesk";
import AllVirtualShelfIndex from "./components/AllVirtualShelfIndex";
import { useAppSelector } from "../../Functions/hooks";

const LibrarianDeskDashboard = () => {
	// define hooks
	const navigate = useNavigate();
	const location = useLocation();

	// variables
	const query = new URLSearchParams(location.search);
	const tab = query.get("tab");

	// store variables
	const { reservedToBePicked, librarianDesk, virtualShelves } =
		useAppSelector((state) => state.warehouseState);

	const activeLoans = librarianDesk.filter((item) => item.idLoan !== null);

	const handleSelect = (selectedTab: string | null) => {
		if (!selectedTab) return;
		const searchParams = new URLSearchParams(location.search);
		searchParams.set("tab", selectedTab);
		navigate(location.pathname + "?" + searchParams.toString());
	};

	return (
		<Container>
			<BackButton />
			<h1>Banco del bibliotecario</h1>
			<Tabs
				defaultActiveKey={tab || "Desk"}
				activeKey={tab ? tab : "Desk"}
				id="uncontrolled-tab-example"
				onSelect={handleSelect}>
				<Tab
					eventKey="Desk"
					title={
						<>
							<span>Desk</span>
							<span className="badge bg-danger ms-2">
								{activeLoans.length > 0
									? activeLoans.length
									: ""}
							</span>
						</>
					}>
					<IndexLibrarianDesk />
				</Tab>
				<Tab
					eventKey="toPick"
					title={
						<>
							<span>Da prendere sulle corsie</span>
							<span className="badge bg-danger ms-2">
								{reservedToBePicked.length > 0
									? reservedToBePicked.length
									: ""}
							</span>
						</>
					}>
					<IndexReservedToBePicked />
				</Tab>
				<Tab
					eventKey="Receive"
					title={
						<>
							<span>Prestiti in corso</span>
							<span className="badge bg-light ms-2">
								{virtualShelves.length > 0
									? virtualShelves.length
									: ""}
							</span>
						</>
					}>
					<AllVirtualShelfIndex />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default LibrarianDeskDashboard;
