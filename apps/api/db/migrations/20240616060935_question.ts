import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('question', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('ref_id').notNullable();
    t.string('type').notNullable();
    t.string('question').notNullable();
    t.string('answer').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('question');

}
