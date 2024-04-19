import { Container, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../_miscellaneous/reusable/BackButton";
import IndexReservedToBePicked from "./components/IndexReservedToBePicked";
import IndexLibrarianDesk from "./components/IndexLibrarianDesk";
import AllVirtualShelfIndex from "./components/AllVirtualShelfIndex";

const LibrarianDeskDashboard = () => {
	// define hooks
	const navigate = useNavigate();
	const location = useLocation();

	// variables
	const query = new URLSearchParams(location.search);
	const tab = query.get("tab");

	const handleSelect = (selectedTab: string | null) => {
		if (!selectedTab) return;
		const searchParams = new URLSearchParams(location.search);
		searchParams.set("tab", selectedTab);
		navigate(location.pathname + "?" + searchParams.toString());
	};

	return (
		<Container>
			<BackButton />
			<Tabs
				defaultActiveKey={tab || "Desk"}
				activeKey={tab ? tab : "Desk"}
				id="uncontrolled-tab-example"
				onSelect={handleSelect}>
				<Tab eventKey="Desk" title="Desk">
					<IndexLibrarianDesk />
				</Tab>
				<Tab eventKey="toPick" title="Da prendere sulle corsie">
					<IndexReservedToBePicked />
				</Tab>
				<Tab eventKey="Receive" title="Prestiti in corso">
					<AllVirtualShelfIndex />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default LibrarianDeskDashboard;
