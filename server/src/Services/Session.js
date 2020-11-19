import SessionRepository from "../Repository/Session.js";
import OngRepository from "../Repository/Ongs";

import { validUuid } from "../utils.js";

const controller = {
	store: async (id, res) => {
		if (!(id && validUuid(id))) {
			return {
				Error: "Id is mandatory, insert the uuid of the ong.",
			};
		}

		const ong = await SessionRepository.show(id, res);
		if (ong) {
			return ong;
		}

		return {
			Error: "Ong not found.",
		};
	},
};

export default controller;
