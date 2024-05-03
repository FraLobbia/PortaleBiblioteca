import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Functions/hooks";
import { logout } from "../../Redux/slicers/userSlice";
import logo from "../../assets/images/logo.png";
import userTemplateImage from "../../assets/images/userTemplateImage.jpg";
import DarkMode from "./DarkMode";
import { NavbarBrand } from "react-bootstrap";
import "./myNavbar.scss";
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
			collapseOnSelect
			variant="dark"
			className="bg-mattone p-0 border-0"
			sticky="top"
			expand="lg">
			<Container className="justify-content-center justify-content-sm-between">
				<Nav.Link as={NavLink} eventKey="13" to="/">
					<NavbarBrand>
						<img
							src={logo}
							height={35}
							className="me-2"
							alt="logo della biblioteca"
						/>
						<span id="NavbarBrandDefault">
							Biblioteca Quinto Vercellese
						</span>
						<span id="NavbarBrandMiniMobile">
							Biblioteca Quinto V.se
						</span>
					</NavbarBrand>
				</Nav.Link>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-between">
					<Nav className="align-items-center">
						<Nav.Link as={NavLink} eventKey="13" to="/">
							Home
						</Nav.Link>
						{permissionsToEdit ? (
							<NavDropdown title="Catalogo">
								<NavDropdown.Item
									as={NavLink}
									eventKey="1"
									to="/catalogo">
									Elenco libri
								</NavDropdown.Item>

								<NavDropdown.Item
									as={NavLink}
									eventKey="2"
									to="/catalogo/add">
									Crea nuovo libro
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as={NavLink}
									eventKey="3"
									to="/generi">
									Elenco generi
								</NavDropdown.Item>
								<NavDropdown.Item
									as={NavLink}
									eventKey="4"
									to="/generi/add">
									Aggiungi nuovo genere
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as={NavLink}
									eventKey="5"
									to="/autori">
									Elenco Autori
								</NavDropdown.Item>
								<NavDropdown.Item
									as={NavLink}
									eventKey="6"
									to="/autori/add">
									Aggiungi nuovo Autore
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link as={NavLink} eventKey="7" to="/catalogo">
								Catalogo
							</Nav.Link>
						)}
						<Nav.Link as={NavLink} eventKey="8" to="/recensioni">
							Recensioni
						</Nav.Link>

						{permissionsToEdit && (
							<>
								<Nav.Link
									as={NavLink}
									eventKey="9"
									to="/librarian">
									Banco del bibliotecario
								</Nav.Link>
							</>
						)}
					</Nav>
					<Nav className="align-items-center">
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
								<NavDropdown.Item
									as={NavLink}
									eventKey="10"
									to="/private-area">
									Area personale
								</NavDropdown.Item>

								<NavDropdown.Divider />

								<DarkMode />

								<NavDropdown.Item
									as={NavLink}
									eventKey="11"
									to="/user/edit">
									Modifica il tuo profilo
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Nav.Link
										as={NavLink}
										eventKey="12"
										to="/"
										className="text-danger"
										onClick={() => handleLogout()}>
										Logout
									</Nav.Link>
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link
								as={NavLink}
								eventKey="13"
								to="/user/login">
								Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MyNavbar;
