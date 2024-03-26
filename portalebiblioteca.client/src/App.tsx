import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./app/home/page";
import LoginForm from "./app/login/page";
import MyNavbar from "./app/miscComponents/myNavbar";

function App() {
	return (
		<BrowserRouter>
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
