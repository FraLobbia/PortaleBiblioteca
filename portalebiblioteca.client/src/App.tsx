import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./app/home/HomePage";
import MyNavbar from "./app/_miscellaneous/myNavbar";
import IndexBooks from "./app/booksCatalog/IndexBooks";
import DetailsBookPage from "./app/booksCatalog/DetailsBookPage";
import SignUpPage from "./app/user/SignUpPage";
import LoginPage from "./app/user/LoginPage";
import EditProfile from "./app/user/EditProfile";
import NotFound_404 from "./app/_miscellaneous/NotFound_404";
import IndexGenres from "./app/genres/IndexGenres";
import { setDarkMode } from "./Functions/utility";
import MyFooter from "./app/_miscellaneous/myFooter";
import IndexAuthors from "./app/authors/IndexAuthors";
import BookReviews from "./app/reviews/BookReviews";
import EditBook from "./app/booksCatalog/EditBook";
import MoveItems from "./app/warehouse/MoveItems";
import CreateBook from "./app/booksCatalog/CreateBook";
import CreateGenres from "./app/genres/CreateGenre";
import EditGenre from "./app/genres/EditGenre";
import LibrarianDeskDashboard from "./app/librarianDesk/LibrarianDeskDashboard";
import UserLoansDashboard from "./app/prestiti/UserLoansDashboard";
import CreateAuthors from "./app/authors/CreateAuthors";
import EditAuthors from "./app/authors/EditAuthors";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeReviews from "./app/reviews/HomeReviews";
import Features from "./app/featuresPage/Features";
import PrivateArea from "./app/privateArea/PrivateArea";
function App() {
	const selectedTheme = localStorage.getItem("selectedTheme");

	if (selectedTheme === "dark") {
		setDarkMode();
	}
	return (
		<BrowserRouter>
			<div className="d-flex flex-column vh-100 justify-content-between ">
				<MyNavbar />
				<div className="mb-auto">
					<Routes>
						<Route path="/" element={<HomePage />} />

						<Route path="/features" element={<Features />} />

						<Route path="/catalogo">
							<Route index element={<IndexBooks />} />
							<Route path="add" element={<CreateBook />} />
							<Route
								path="details/:id"
								element={<DetailsBookPage />}
							/>
							<Route path="edit/:id" element={<EditBook />} />
						</Route>

						<Route path="/generi">
							<Route index element={<IndexGenres />} />
							<Route path="add" element={<CreateGenres />} />
							<Route path="edit/:id" element={<EditGenre />} />
						</Route>

						<Route path="/autori">
							<Route index element={<IndexAuthors />} />
							<Route path="add" element={<CreateAuthors />} />
							<Route path="edit/:id" element={<EditAuthors />} />
						</Route>

						<Route path="/recensioni">
							<Route index element={<HomeReviews />} />
							<Route path=":id" element={<BookReviews />} />
							<Route path="edit/:id" element={<EditGenre />} />
						</Route>

						<Route path="/private-area" element={<PrivateArea />} />

						<Route path="/prestiti">
							<Route index element={<UserLoansDashboard />} />
						</Route>

						<Route path="/warehouse">
							<Route path="move/:id" element={<MoveItems />} />
						</Route>

						<Route path="/librarian">
							<Route index element={<LibrarianDeskDashboard />} />
						</Route>

						<Route path="/user">
							<Route path="login" element={<LoginPage />} />
							<Route path="signup" element={<SignUpPage />} />
							<Route path="edit" element={<EditProfile />} />
						</Route>

						<Route path="*" element={<NotFound_404 />} />
					</Routes>
				</div>
				<MyFooter />
			</div>
		</BrowserRouter>
	);
}

export default App;
