import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('experience', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('user_id').references('id').inTable('user').notNullable().onDelete('CASCADE');
    t.string('employer').notNullable();
    t.date('start_date').notNullable();
    t.date('end_date').nullable();
    t.string('country').nullable();
    t.string('region').nullable();
    t.string('industry').notNullable();
    t.string('job_title').notNullable();
    t.string('work_contract').notNullable();
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('experience')
}

