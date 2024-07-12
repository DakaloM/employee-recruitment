import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('applicant', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('user_id').references('id').inTable('user').notNullable().unique().onDelete('CASCADE');
    t.string('applicant_number').notNullable().unique();
    t.string('name').notNullable();
    t.string('surname').notNullable();
    t.timestamps(true, true);
  });

  await knex.raw(`
    ALTER TABLE "applicant"
    ADD COLUMN search tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('simple', coalesce(applicant_number, '')), 'A') :: tsvector
    ) STORED;
  `);

  await knex.raw(`
    CREATE INDEX applicant_search_idx ON "applicant" USING GIN(search);
  `);
}

export async function down(knex: Knex): Promise<void> {
  // drop the index
  await knex.raw(`
  DROP INDEX IF EXISTS applicant_search_idx;
  `);

  await knex.schema.dropTableIfExists('applicant');
}
