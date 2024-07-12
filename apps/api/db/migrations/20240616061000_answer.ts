import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('answer', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('question_id').notNullable().references('id').inTable('question').unique().onDelete('CASCADE');
    t.uuid('ref_id').notNullable();
    t.uuid('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    t.string('answer').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('answer');
}
