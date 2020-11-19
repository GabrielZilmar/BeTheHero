import IncidentRepository from "../Repository/Incident.js";
import OngRepository from "../Repository/Ongs.js";

import { validUuid } from "../utils.js";

const service = {
	store: async (req, res) => {
		let errors = [];

		if (!req.title) {
			errors.push("The title is mandatory.");
		}
		if (!req.description) {
			errors.push("The description is mandatory.");
		}
		if (!req.value) {
			errors.push("The value is mandatory.");
		}
		if (!(req.fk_id_ong && validUuid(req.fk_id_ong))) {
			errors.push(
				"The fk_id_ong is mandatory, insert a valid fk_id_ong."
			);
		} else if (!(await OngRepository.show(req.fk_id_ong, res))) {
			errors.push({
				Warning: "Ong not found.",
			});
		}

		if (errors.length > 0) {
			return {
				Errors: errors,
			};
		}

		return await IncidentRepository.store(req, res);
	},

	show: async (id, res) => {
		if (!(id && validUuid(id))) {
			return {
				Error: "Invalid uuid.",
			};
		}

		const incident = await IncidentRepository.show(id, res);
		return incident.length > 0
			? incident
			: { Message: "Incident not found." };
	},

	list: async (req, res) => {
		const limit = req.query.limit ? req.query.limit : 1;
		const offset = req.query.offset ? req.query.offset : 0;

		const incidents = await IncidentRepository.list({ limit, offset }, res);

		return incidents.Count > 0
			? incidents
			: { Message: "None incident found." };
	},

	update: async (req, id, res) => {
		let errors = [];

		if (!validUuid(id)) {
			errors.push("The ID is mandatory, the params need to be a uuid.");
		}
		if (!(req.fk_id_ong && validUuid(req.fk_id_ong))) {
			errors.push(
				"The fk_id_ong is mandatory, insert a valid fk_id_ong."
			);
		} else if (!(await OngRepository.show(req.fk_id_ong, res))) {
			errors.push({
				Warning: "Ong not found.",
			});
		}

		if (errors.length > 0) {
			return {
				Errors: errors,
			};
		}

		if ((await IncidentRepository.update(req, id, res)) === 0) {
			return {
				Message: "Ong not found.",
			};
		}

		return req;
	},

	delete: async (id, res) => {
		if (!(id && validUuid(id))) {
			return {
				Error: "Id is mandatory, insert the uuid of the incident.",
			};
		}

		if ((await IncidentRepository.delete(id, res)) === 0) {
			return {
				Message: "Incident not found.",
			};
		}

		return {
			Message: "Incident deleted.",
		};
	},
};

export default service;
