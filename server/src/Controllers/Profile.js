import ProfileService from "../Services/Profile.js";

const controller = {
	list: async (req, res) => {
		const incidents = await ProfileService.list(
			req.headers.authorization,
			res
		);

		return incidents.Error
			? res.status(400).json(incidents)
			: res.status(200).json(incidents);
	},
};

export default controller;
