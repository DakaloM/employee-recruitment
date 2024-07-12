import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('education', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('user_id').references('id').inTable('user').notNullable().onDelete('CASCADE');
    t.string('institution').notNullable();
    t.date('start_date').notNullable();
    t.date('end_date').notNullable();
    t.string('country').notNullable();
    t.string('region').notNullable();
    t.string('location').notNullable();
    t.string('education_level').notNullable();
    t.string('final_grade').notNullable();
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('education')
}

