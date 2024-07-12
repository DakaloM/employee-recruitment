import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contact', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('user_id').references('id').inTable('user').notNullable().onDelete('CASCADE');
    t.string('email').notNullable().unique();
    t.string('mobile_number').notNullable().unique();
    t.string('business_number').nullable();
    t.string('private_number').nullable().unique();
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('contact')
}

