import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("position", (t) => {
    t.uuid("id").primary().defaultTo(knex.raw("generate_ulid()"));
    t.string("position_title").notNullable();
    t.string("location").notNullable();
    t.specificType("qualifications", "text ARRAY");
    t.json("manager").notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("position");
}
