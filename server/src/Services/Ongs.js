import OngRepository from "../Repository/Ongs";

import { validUf, validEmail, validUuid } from "../utils.js";

const service = {
	store: async (req, res) => {
		let errors = [];
		if (!req.name) {
			errors.push("The name is mandatory.");
		}
		if (!validEmail(req.email)) {
			errors.push("The email is mandatory, insert a valid e-mail.");
		}
		if (!req.whatsapp) {
			errors.push(
				"The WhatsApp number is mandatory and unique, insert a valid number."
			);
		}
		if (!req.city) {
			errors.push("The city is mandatory, insert a valid city.");
		}
		if (!validUf(req.uf)) {
			errors.push("The UF is mandatory, insert a valid UF.");
		}

		if (errors.length > 0) {
			return {
				Errors: errors,
			};
		}

		await OngRepository.store(req, res);
		return req;
	},

	list: async (res) => {
		const ongs = await OngRepository.list(res);

		return ongs.length > 0 ? ongs : { Message: "None ong found." };
	},

	show: async (id, res) => {
		if (!(id && validUuid(id))) {
			return {
				Error: "Id is mandatory, insert the uuid of the ong.",
			};
		}

		const ong = await OngRepository.show(id, res);
		return ong.length > 0 ? ong : { Message: "Ong not found." };
	},

	update: async (req, id, res) => {
		let errors = [];

		if (!req.name) {
			errors.push("The name is mandatory.");
		}
		if (!validEmail(req.email)) {
			errors.push("The email is mandatory, insert a valid e-mail.");
		}
		if (!req.whatsapp) {
			errors.push(
				"The WhatsApp number is mandatory, insert a valid number."
			);
		}
		if (!req.city) {
			errors.push("The city is mandatory, insert a valid city.");
		}
		if (!validUf(req.uf)) {
			errors.push("The UF is mandatory, insert a valid UF.");
		}
		if (!validUuid(id)) {
			errors.push("The ID is mandatory, the params need to be a uuid.");
		}

		if (errors.length > 0) {
			return {
				Errors: errors,
			};
		}

		if ((await OngRepository.update(req, id, res)) === 0) {
			return {
				Message: "Ong not found.",
			};
		}

		return req;
	},

	delete: async (id, res) => {
		if (!(id && validUuid(id))) {
			return {
				Error: "Id is mandatory, insert the ong's uuid.",
			};
		}

		if ((await OngRepository.delete(id, res)) === 0) {
			return {
				Message: "Ong not found.",
			};
		}

		return {
			Message: "Ong deleted.",
		};
	},
};

export default service;
