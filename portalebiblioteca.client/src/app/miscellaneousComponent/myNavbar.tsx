import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";

function MyNavbar() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">
					Biblioteca Quinto Vercellese
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<NavLink className={"nav-link"} to="/">
							Home
						</NavLink>
						{/* <NavLink className={"nav-link"} to="/catalogo">
							Catalogo
						</NavLink> */}
						<NavDropdown title="Catalogo" id="basic-nav-dropdown">
							<NavDropdown.Item as={NavLink} to="/catalogo">
								Elenco libri
							</NavDropdown.Item>
							<NavDropdown.Item as={NavLink} to="/catalogo/add">
								Aggiungi nuovo libro
							</NavDropdown.Item>
							<NavDropdown.Item>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Separated link</NavDropdown.Item>
						</NavDropdown>
						<Link to="/login" className="nav-link">
							Login
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MyNavbar;
