import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./app/home/page";
import MyNavbar from "./app/miscellaneousComponent/myNavbar";
import ElencoLibri from "./app/books/ElencoLibri";
import FormAddBook from "./app/books/FormAddBook";
import DetailBook from "./app/books/DetailsBook";
import FormEditBook from "./app/books/FormEditBook";
import SignUpPage from "./app/user/SignUpPage";
import LoginPage from "./app/user/LoginPage";
import EditProfile from "./app/user/EditProfile";

function App() {
	return (
		<BrowserRouter>
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/catalogo">
					<Route index element={<ElencoLibri />} />
					<Route path="add" element={<FormAddBook />} />
					<Route path="details/:id" element={<DetailBook />} />
					<Route path="edit/:id" element={<FormEditBook />} />
				</Route>

				<Route path="/user">
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignUpPage />} />
					<Route path="edit" element={<EditProfile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
