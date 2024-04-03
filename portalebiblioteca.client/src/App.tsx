import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./app/home/page";
import MyNavbar from "./app/_miscellaneous/myNavbar";
import IndexBooks from "./app/books/IndexBooks";
import FormAddBook from "./app/books/FormAddBook";
import DetailBook from "./app/books/DetailsBook";
import FormEditBook from "./app/books/FormEditBook";
import SignUpPage from "./app/user/SignUpPage";
import LoginPage from "./app/user/LoginPage";
import EditProfile from "./app/user/EditProfile";
import ElencoPrestiti from "./app/prestiti/IndexLoans";
import NotFound_404 from "./app/_miscellaneous/NotFound_404";
import FormAddGenres from "./app/genres/FormAddGenres";
import IndexGenres from "./app/genres/IndexGenres";

function App() {
	return (
		<BrowserRouter>
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/catalogo">
					<Route index element={<IndexBooks />} />
					<Route path="add" element={<FormAddBook />} />
					<Route path="details/:id" element={<DetailBook />} />
					<Route path="edit/:id" element={<FormEditBook />} />
				</Route>

				<Route path="/generi">
					<Route index element={<IndexGenres />} />
					<Route path="add" element={<FormAddGenres />} />
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
		</BrowserRouter>
	);
}

export default App;
