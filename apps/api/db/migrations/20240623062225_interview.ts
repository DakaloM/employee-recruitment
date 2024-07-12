import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable('interview', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('applicationId').notNullable().references('id').inTable('application').onDelete('CASCADE');
    t.uuid('job_id').notNullable().references('id').inTable('advert').onDelete('CASCADE');
    t.uuid('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    t.string('name').notNullable();
    t.string('surname').notNullable();
    t.string('job_title').notNullable();
    t.date('date').notNullable();
    t.increments('sequence').notNullable().unique();
    t.string('time').notNullable();
    t.string('location').notNullable();
    t.string('description').nullable();
    t.string('status').notNullable().defaultTo('Scheduled');
    t.timestamps(true, true);
    t.unique(['applicationId', 'job_id', 'applicant_id']);
  });

  await knex.raw(`
    ALTER TABLE "interview"
    ADD COLUMN search tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
      setweight(to_tsvector('simple', coalesce(surname, '')), 'B') ||
      setweight(to_tsvector('simple', coalesce(job_title, '')), 'C') :: tsvector
    ) STORED;
  `);

  await knex.raw(`
    CREATE INDEX interview_search_idx ON "interview" USING GIN(search);
  `);
}

export async function down(knex: Knex): Promise<void> {

   // drop the index
   await knex.raw(`
   DROP INDEX IF EXISTS interview_search_idx;
   `);

  await knex.schema.dropTable('interview');
}
