import { generateUuid } from "../utils.js";

import OngService from "../Services/Ongs";

const controller = {
	store: async (req, res) => {
		const ong = {
			id: generateUuid(),
			name: req.body.name,
			email: req.body.email,
			whatsapp: req.body.whatsapp,
			city: req.body.city,
			uf: req.body.uf,
		};

		const newOng = await OngService.store(ong, res);

		return newOng.Errors
			? res.status(400).json(newOng)
			: res.status(201).json(newOng);
	},

	list: async (req, res) => {
		return res.status(200).json(await OngService.list(res));
	},

	show: async (req, res) => {
		const ong = await OngService.show(req.params.id, res);

		return ong.Error
			? res.status(400).json(ong)
			: res.status(200).json(ong);
	},

	update: async (req, res) => {
		const ong = {
			name: req.body.name,
			email: req.body.email,
			whatsapp: req.body.whatsapp,
			city: req.body.city,
			uf: req.body.uf,
		};

		const updatedOng = await OngService.update(ong, req.params.id, res);

		return updatedOng.Errors
			? res.status(400).json(updatedOng)
			: res.status(200).json(updatedOng);
	},

	delete: async (req, res) => {
		const deletedOng = await OngService.delete(req.params.id, res);

		return deletedOng.Error
			? res.status(400).json(deletedOng)
			: res.status(200).json(deletedOng);
	},
};

export default controller;
