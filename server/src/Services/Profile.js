import OngRepository from "../Repository/Ongs.js";
import ProfileRepository from "../Repository/Profile.js";

import { validUuid } from "../utils.js";

const service = {
	list: async (id, res) => {
		if (!(id && validUuid(id))) {
			return {
				Error: "Id is mandatory, insert the ong's uuid.",
			};
		}
		if (!(await OngRepository.show(id, res))) {
			return {
				Message: "Ong not found.",
			};
		}

		const incidents = await ProfileRepository.list(id, res);

		return incidents.length > 0
			? incidents
			: { Message: "None incident found from this ong." };
	},
};

export default service;
