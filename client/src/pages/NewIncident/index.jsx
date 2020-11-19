import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewIncident() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");

	const history = useHistory();

	const handleRegister = async (eventSubmit) => {
		eventSubmit.preventDefault();

		const ongId = localStorage.getItem("ongId");
		const incident = {
			title,
			description,
			value,
		};

		await api
			.post("incident", incident, {
				headers: {
					Authorization: ongId,
				},
			})
			.then((response) => {
				alert(`Successful.\n`);
				history.push("/profile");
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
	};

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />

					<h1>Register new case</h1>
					<p>
						Describes the case in detail to find a hero to solve it.
					</p>

					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#E02041" /> Back
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input
						placeholder="Incident Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						placeholder="Description"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<input
						type="number"
						placeholder="Value in Real, BRL"
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>

					<button type="submit" className="button">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
