import connection from "../database/conncection";

const repository = {
	store: async (req, res) => {
		await connection("ongs")
			.insert(req)
			.catch((err) => {
				return err.constraint.includes("whatsapp_unique")
					? res.status(400).json({
							Errors: [
								"The WhatsApp number is mandatory and unique, insert a valid number.",
							],
					  })
					: res.status(501).json(err);
			});
	},

	list: async (res) => {
		const ongs = await connection("ongs")
			.select("*")
			.catch((err) => {
				return res.status(500).json(err);
			});

		return ongs;
	},

	show: async (id, res) => {
		const ong = await connection("ongs")
			.select("*")
			.where("id", id)
			.catch((err) => {
				return res.status(500).json(err);
			});

		return ong;
	},

	update: async (req, id, res) => {
		const ong = await connection("ongs")
			.update(req)
			.where("id", id)
			.catch((err) => {
				return res.status(500).json(err);
			});

		return ong;
	},

	delete: async (id, res) => {
		const ong = await connection("ongs")
			.where("id", id)
			.delete()
			.catch((err) => {
				return res.status(500).json(err);
			});

		return ong;
	},
};

export default repository;
