import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('application', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('applicant_id').references('id').inTable('applicant').notNullable().onDelete('CASCADE');
    t.uuid('user_id').references('id').inTable('user').notNullable().onDelete('CASCADE');
    t.uuid('requisition_id').references('id').inTable('requisition').notNullable().onDelete('CASCADE');
    t.uuid('job_id').references('id').inTable('advert').notNullable().onDelete('CASCADE');
    t.string('job_title').notNullable();
    t.string('name').notNullable();
    t.string('surname').notNullable();
    t.string('status').notNullable();
    t.unique(['applicant_id', 'requisition_id', 'job_id']);
    t.increments('sequence').notNullable().unique();
    t.timestamps(true, true);
  });

  await knex.raw(`
    ALTER TABLE "application"
    ADD COLUMN search tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('simple', coalesce(job_title, '')), 'A') ||
      setweight(to_tsvector('simple', coalesce(surname, '')), 'B') ||
      setweight(to_tsvector('simple', coalesce(name, '')), 'C') :: tsvector
    ) STORED;
  `);

  await knex.raw(`
    CREATE INDEX application_search_idx ON "application" USING GIN(search);
  `);

}


export async function down(knex: Knex): Promise<void> {

  // drop the index
  await knex.raw(`
  DROP INDEX IF EXISTS application_search_idx;
  `);

    return await knex.schema.dropTableIfExists('application')
}

