import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./app/home/HomePage";
import MyNavbar from "./app/_miscellaneous/myNavbar";
import IndexBooks from "./app/booksCatalog/IndexBooks";
import FormAddBook from "./app/booksCatalog/FormAddBook";
import DetailsBookPage from "./app/booksCatalog/DetailsBookPage";
import FormEditBook from "./app/booksCatalog/FormEditBook";
import SignUpPage from "./app/user/SignUpPage";
import LoginPage from "./app/user/LoginPage";
import EditProfile from "./app/user/EditProfile";
import ElencoPrestiti from "./app/prestiti/IndexLoans";
import NotFound_404 from "./app/_miscellaneous/NotFound_404";
import FormAddGenres from "./app/genres/FormAddGenres";
import IndexGenres from "./app/genres/IndexGenres";
import FormEditGenres from "./app/genres/FormEditGenres";
import ControlPanel from "./app/booksWarehouse/ControlPanel";
import MoveItems from "./app/booksWarehouse/MoveItems";
import { setDarkMode } from "./functions/utility";
import BackButton from "./app/_miscellaneous/reusable/BackButton";
import MyFooter from "./app/_miscellaneous/myFooter";

function App() {
	const selectedTheme = localStorage.getItem("selectedTheme");

	if (selectedTheme === "dark") {
		setDarkMode();
	}
	return (
		<BrowserRouter>
			<MyNavbar />
			<div style={{ paddingTop: "40px" }}>
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/catalogo">
						<Route index element={<IndexBooks />} />
						<Route path="add" element={<FormAddBook />} />
						<Route
							path="details/:id"
							element={<DetailsBookPage />}
						/>
						<Route path="edit/:id" element={<FormEditBook />} />
					</Route>

					<Route path="/warehouse">
						<Route index element={<ControlPanel />} />
						<Route path="move/:id" element={<MoveItems />} />
					</Route>

					<Route path="/generi">
						<Route index element={<IndexGenres />} />
						<Route path="add" element={<FormAddGenres />} />
						<Route path="edit/:id" element={<FormEditGenres />} />
					</Route>

					<Route path="/user">
						<Route path="login" element={<LoginPage />} />
						<Route path="signup" element={<SignUpPage />} />
						<Route path="edit" element={<EditProfile />} />
					</Route>

					<Route path="/prestiti">
						<Route index element={<ElencoPrestiti />} />
					</Route>

					<Route path="*" element={<NotFound_404 />} />
				</Routes>
				<MyFooter />
			</div>
		</BrowserRouter>
	);
}

export default App;
