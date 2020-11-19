import connection from "../database/conncection";

const repository = {
	store: async (req, res) => {
		await connection("incidents")
			.insert(req)
			.catch((err) => {
				return res.status(501).json(err);
			});

		return req;
	},

	show: async (id, res) => {
		const incident = await connection("incidents")
			.select("*")
			.where("id", id)
			.catch((err) => {
				return res.status(500).json(err);
			});

		return incident;
	},

	list: async (req, res) => {
		const [count] = await connection("incidents")
			.count()
			.catch((err) => {
				return res.status(500).json(err);
			});

		const limit = req.limit;
		const offest = req.offset;

		const incidents = await connection("incidents")
			.select([
				"incidents.*",
				"ongs.name",
				"ongs.email",
				"ongs.whatsapp",
				"ongs.city",
				"ongs.uf",
			])
			.join("ongs", "ongs.id", "=", "incidents.fk_id_ong")
			.options({ nestTables: true })
			.limit(limit)
			.offset(offest)
			.catch((err) => {
				return res.status(500).json(err);
			});

		return { Count: parseInt(count.count, 10), Incidents: incidents };
	},

	update: async (req, id, res) => {
		const incident = await connection("incidents")
			.update(req)
			.where("id", id)
			.catch((err) => {
				return res.status(500).json(err);
			});

		return incident;
	},

	delete: async (id, res) => {
		const incident = await connection("incidents")
			.where("id", id)
			.delete()
			.catch((err) => {
				return res.status(500).json(err);
			});

		return incident;
	},
};

export default repository;
