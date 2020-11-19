import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import api from "../../services/api";

import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

const Profile = () => {
	const ongId = localStorage.getItem("ongId");
	const ongName = localStorage.getItem("ongName");

	const [incidents, setIncidents] = useState([]);

	useEffect(() => {
		api.get("profile", {
			headers: {
				Authorization: ongId,
			},
		}).then((response) => {
			if (!response.data.Message) {
				setIncidents(response.data);
			}
		});
	}, [ongId, ongName]);

	const history = useHistory();
	const logout = () => {
		localStorage.removeItem("ongId");
		localStorage.removeItem("ongName");
		history.push("/");
	};

	const handleDeleteIncident = async (id) => {
		const deleted = await api.delete(`incident/${id}`, {
			headers: {
				Authorization: ongId,
			},
		});

		if (deleted.data.Message !== "Incident deleted.") {
			alert(`Something unexpected happened.`);
		} else {
			setIncidents(incidents.filter((incident) => incident.id !== id));
		}
	};

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be The Hero"></img>
				<span>Welcome, {ongName}</span>

				<Link className="button" to="/incidents/new">
					Register a new case
				</Link>
				<button type="button" onClick={logout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1> Registered incidents </h1>

			<ul>
				{incidents.map((incident) => {
					return (
						<li key={incident.id}>
							<strong>Case: </strong>
							<p>{incident.title}</p>

							<strong>Description:</strong>
							<p>{incident.description}</p>

							<strong>Value:</strong>
							<p>
								{Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(incident.value)}
							</p>

							<button
								type="button"
								onClick={() =>
									handleDeleteIncident(incident.id)
								}
							>
								<FiTrash2 size={20} color="#a8a8b3" />
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Profile;
