import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./app/home/page";
import LoginForm from "./app/login/page";
import MyNavbar from "./app/miscellaneousComponent/myNavbar";
import BookList from "./app/books/BookList";
import FormAddBook from "./app/books/FormAddBook";
import DetailBook from "./app/books/DetailsBook";
import FormEditBook from "./app/books/FormEditBook";

function App() {
	return (
		<BrowserRouter>
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/catalogo">
					<Route index element={<BookList />} />
					<Route path="add" element={<FormAddBook />} />
					<Route path="details/:id" element={<DetailBook />} />
					<Route path="edit/:id" element={<FormEditBook />} />
				</Route>

				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
