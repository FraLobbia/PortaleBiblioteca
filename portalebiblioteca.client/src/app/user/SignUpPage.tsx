import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SignUpModel } from "../../interfaces/profile.interface";
import { useAppDispatch } from "../../Functions/hooks";
import { fetchCreateUser } from "../../api/users/userFetches";

const SignUpPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");
	const [cognome, setCognome] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [error, setError] = useState<string>("");
	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			setError("La password non corrisponde");
			return;
		}

		const userToCreate: SignUpModel = {
			FirstName: name,
			LastName: cognome,
			Email: email,
			Password: password,
		};

		dispatch(fetchCreateUser(userToCreate));
		navigate("/");
	};

	return (
		<Container>
			<Form onSubmit={handleSignUp}>
				<h1>Registrati</h1>

				<Form.Group className="mb-3">
					<Form.Label>Nome</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il tuo nome"
						value={name}
						onChange={(e) => setName(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Cognome</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il tuo cognome"
						value={cognome}
						onChange={(e) => setCognome(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci la tua email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Inserisci la tua password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Conferma Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Conferma la tua password"
						value={passwordConfirm}
						onChange={(e) =>
							setPasswordConfirm(e.currentTarget.value)
						}
					/>
				</Form.Group>
				{error && <p className="text-danger">{error}</p>}

				<Button variant="primary" type="submit">
					Registrati
				</Button>
			</Form>
			<div className="mt-4">
				<Link to="/signup">Non sei registrato? Registrati</Link>
			</div>
		</Container>
	);
};

export default SignUpPage;
