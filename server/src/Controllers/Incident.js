import { generateUuid } from "../utils.js";

import IncidentService from "../Services/Incident.js";

const controller = {
	store: async (req, res) => {
		const incident = {
			id: generateUuid(),
			title: req.body.title,
			description: req.body.description,
			value: req.body.value,
			fk_id_ong: req.headers.authorization,
		};

		const newIncident = await IncidentService.store(incident, res);

		return newIncident.Errors
			? res.status(400).json(newIncident)
			: res.status(201).json(newIncident);
	},

	show: async (req, res) => {
		const incident = await IncidentService.show(req.params.id, res);

		return incident.Error
			? res.status(400).json(incident)
			: res.status(200).json(incident);
	},

	list: async (req, res) => {
		const incidents = await IncidentService.list(req, res);

		if (!incidents.Message) {
			res.header("X-Total-Count", incidents.Count);
			return res.status(200).json(incidents.Incidents);
		}
		return res.status(200).json(incidents);
	},

	update: async (req, res) => {
		const incident = {
			title: req.body.title,
			description: req.body.description,
			value: req.body.value,
			fk_id_ong: req.headers.authorization,
		};

		const updatedIncident = await IncidentService.update(
			incident,
			req.params.id,
			res
		);

		return updatedIncident.Errors
			? res.status(400).json(updatedIncident)
			: res.status(200).json(updatedIncident);
	},

	delete: async (req, res) => {
		const deletedIncident = await IncidentService.delete(
			req.params.id,
			res
		);

		return deletedIncident.Error
			? res.status(400).json(deletedIncident)
			: res.status(200).json(deletedIncident);
	},
};

export default controller;
