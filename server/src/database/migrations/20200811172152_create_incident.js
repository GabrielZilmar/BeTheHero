exports.up = function (knex) {
	return knex.schema.createTable("incidents", function (table) {
		table.uuid("id").primary();
		table.string("title").notNullable();
		table.string("description").notNullable();
		table.float("value").notNullable();

		table.uuid("fk_id_ong").notNullable();
		table
			.foreign("fk_id_ong")
			.references("id")
			.inTable("ongs")
			.onDelete("cascade");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("incidents");
};
