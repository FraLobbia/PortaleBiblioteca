import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../functions/hooks";
import { logout } from "../../redux/slicers/userSlice";
import logo from "../../assets/images/logo.png";
import userTemplateImage from "../../assets/images/userTemplateImage.jpg";
import DarkMode from "./DarkMode";

const MyNavbar = () => {
	// define hooks
	const dispatch = useAppDispatch();

	//store variables
	const { permissionsToEdit, user } = useAppSelector(
		(state) => state.profileState.loggedProfile
	);

	// variables

	//functions to handle the logout
	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<Navbar
			variant="dark"
			className="bg-mattone p-0"
			fixed="top"
			expand="md">
			<Container className=" justify-content-center">
				<Navbar.Brand>
					<Link to="/" className="nav-link">
						<img
							src={logo}
							width="30"
							height="30"
							className="d-inline-block align-top me-3"
							alt="logo della biblioteca"
						/>
						Biblioteca Quinto Vercellese
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					className=" justify-content-md-between"
					id="basic-navbar-nav">
					<Nav>
						<NavLink className={"nav-link"} to="/">
							Home
						</NavLink>
						{permissionsToEdit ? (
							<NavDropdown
								title="Catalogo"
								id="basic-nav-dropdown">
								<NavDropdown.Item as={NavLink} to="/catalogo">
									Elenco libri
								</NavDropdown.Item>

								<NavDropdown.Item
									as={NavLink}
									to="/catalogo/add">
									Crea nuovo libro
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={NavLink} to="/generi">
									Elenco generi
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to="/generi/add">
									Aggiungi nuovo genere
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={NavLink} to="/autori">
									Elenco Autori
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to="/autori/add">
									Aggiungi nuovo Autore
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<NavLink className={"nav-link"} to="/catalogo">
								Catalogo
							</NavLink>
						)}
						<NavLink className={"nav-link"} to="/recensioni">
							Recensioni
						</NavLink>

						{permissionsToEdit && (
							<>
								<NavLink className={"nav-link"} to="/librarian">
									Banco del bibliotecario
								</NavLink>
							</>
						)}
					</Nav>
					<Nav>
						{user ? (
							<NavDropdown
								title={
									<span>
										<img
											src={
												user.userImage
													? user.userImage
													: userTemplateImage
											}
											style={{
												borderRadius: "50%",
												objectFit: "cover",
												marginTop: "-3px",
											}}
											width="30"
											height="30"
											className="d-inline-block align-top me-1"
											alt="immagine profilo utente"
										/>
										{user.firstName + " " + user.lastName}
									</span>
								}
								id="basic-nav-dropdown">
								<NavDropdown.Item as={NavLink} to="/prestiti">
									I tuoi libri in prestito
								</NavDropdown.Item>

								<NavDropdown.Divider />

								<DarkMode />

								<NavDropdown.Item>
									<Link to="/user/edit" className="nav-link">
										Modifica il tuo profilo
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Link
										to="/"
										className="nav-link text-danger"
										onClick={() => handleLogout()}>
										Logout
									</Link>
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Link to="/user/login" className="nav-link">
								Login
							</Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MyNavbar;
