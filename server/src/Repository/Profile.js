import connection from "../database/conncection";

const repository = {
	list: async (fk_id_ong, res) => {
		const incidents = await connection("incidents")
			.select("*")
			.where("fk_id_ong", fk_id_ong)
			.catch((err) => {
				return res.status(500).json(err);
			});

		return incidents;
	},
};

export default repository;
