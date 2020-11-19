import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import api from "../../services/api";

import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhatsApp] = useState("");
	const [city, setCity] = useState("");
	const [uf, setUf] = useState("");

	const history = useHistory();

	async function handleRegister(eventSubmit) {
		eventSubmit.preventDefault();

		const ong = { name, email, whatsapp, city, uf };

		await api
			.post("ong", ong)
			.then((response) => {
				alert(`Successful.\nYour ID: ${response.data.id}`);
				history.push("/");
			})
			.catch((err) => {
				if (err.response) {
					err.response.data.Errors.map((error) => {
						return alert(error);
					});
				} else {
					alert(`Connection to the server failed.`);
				}
			});
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Register</h1>
					<p>
						Sign up, log on to the platform and help people to find
						the incidents from your ONG.
					</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" /> Sign in
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						placeholder="Ong name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="number"
						placeholder="WhatsApp"
						value={whatsapp}
						onChange={(e) => setWhatsApp(e.target.value)}
					/>

					<div className="input-group">
						<input
							placeholder="City"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<input
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={(e) => setUf(e.target.value)}
						/>
					</div>

					<button type="submit" className="button">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
