import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./app/home/page";
import LoginForm from "./app/login/page";
import MyNavbar from "./app/miscComponents/myNavbar";
import ElencoLibri from "./app/books/ElencoLibri";
import FormAggiungiLibro from "./app/books/FormAggiungiLibro";
import DetailBook from "./app/books/DetailsBook";

function App() {
	return (
		<BrowserRouter>
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/catalogo">
					<Route index element={<ElencoLibri />} />
					<Route path="add" element={<FormAggiungiLibro />} />
					<Route path="details/:id" element={<DetailBook />} />
				</Route>

				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
