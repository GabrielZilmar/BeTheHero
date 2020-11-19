import SessionService from "../Services/Session.js";

const controller = {
	store: async (req, res) => {
		const newSession = await SessionService.store(req.body.id, res);

		return newSession.Error
			? res.status(400).json(newSession)
			: res.status(201).json(newSession);
	},
};

export default controller;
