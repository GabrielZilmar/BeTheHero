import connection from "../database/conncection";

const repository = {
	show: async (id, res) => {
		const ong = await connection("ongs")
			.select("name")
			.where("id", id)
			.first()
			.catch((err) => {
				return res.status(500).json(err);
			});

		return ong;
	},
};

export default repository;
