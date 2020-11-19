import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import api from "../../services/api";

import { FiLogIn } from "react-icons/fi";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

const Login = () => {
	const [id, setId] = useState("");

	const history = useHistory();

	const handleLogin = async (e) => {
		e.preventDefault();

		await api
			.put("session", { id })
			.then((response) => {
				localStorage.setItem("ongId", id);
				localStorage.setItem("ongName", response.data.name);

				history.push("/profile");
			})
			.catch((err) => {
				alert(
					`Failed to login, try again.\n ${err.response.data.Error}`
				);
			});
	};

	return (
		<div className="login-container">
			<section className="form">
				<img src={logoImg} alt="Be The Hero"></img>

				<form>
					<h1>Sign In</h1>

					<input
						placeholder="Your ID"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<button
						type="submit"
						className="button"
						onClick={handleLogin}
					>
						Enter
					</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#E02041" /> Create account
					</Link>
				</form>
			</section>
			<img src={heroesImg} alt="Heroes"></img>
		</div>
	);
};

export default Login;
