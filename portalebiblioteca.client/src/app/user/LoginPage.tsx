import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "../../functions/hooks";
import { LoginModel } from "../../interfaces/profile.interface";
import { fetchLogin } from "../../api/users/userFetches";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const LoginObj: LoginModel = {
			email,
			password,
		};
		dispatch(fetchLogin(LoginObj, navigate));
		//navigate("/");
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<h1>LOGIN</h1>
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
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
			<div className="mt-4">
				<Link to="/user/signup">Non sei registrato? Registrati</Link>
			</div>
		</Container>
	);
};

export default LoginPage;
