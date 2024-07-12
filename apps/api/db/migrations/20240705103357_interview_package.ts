import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('interview_package', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('job_id').notNullable().references('id').inTable('advert').onDelete('CASCADE');
    t.date('date').notNullable();
    t.string('time').notNullable();
    t.string('location').notNullable();
    t.string('description').nullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('interview_package');

}
