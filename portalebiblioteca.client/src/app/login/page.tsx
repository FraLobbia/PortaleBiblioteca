import { Button, Container, Form } from "react-bootstrap";
import { loginFormObj } from "../../interfaces/profile.interface";
import { useState } from "react";
import { useAppDispatch } from "../../functions/hooks";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const loginObj: loginFormObj = {
			email,
			password,
		};

		dispatch(fetchLogin(loginObj));
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
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	);
};

export default LoginForm;
