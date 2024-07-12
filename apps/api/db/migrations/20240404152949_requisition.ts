import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('requisition', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('object_id').notNullable().references('id').inTable('position').unique();
    t.string('title').notNullable();
    t.date('end_date').notNullable();
    t.string('position_title').notNullable();
    t.string('hierarchy').notNullable();
    t.date('hiring_date').notNullable();
    t.string('location').notNullable();
    t.string('status').notNullable().defaultTo('WaitingApproval');
    t.specificType('qualifications', 'text ARRAY').nullable();
    t.specificType('responsibilities', 'text ARRAY').nullable();
    t.string('workplace').notNullable();
    t.string('employment_type').notNullable();
    t.integer('experience').notNullable();
    t.increments('sequence').notNullable().unique();
    t.timestamps(true, true);
  });

  await knex.raw(`
    ALTER TABLE "requisition"
    ADD COLUMN search tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('simple', coalesce(position_title, '')), 'B') :: tsvector
    ) STORED;
  `);

  await knex.raw(`
    CREATE INDEX requisition_search_idx ON "requisition" USING GIN(search);
  `);
}

export async function down(knex: Knex): Promise<void> {
  // drop the index
  await knex.raw(`
  DROP INDEX IF EXISTS requisition_search_idx;
  `);

  await knex.schema.dropTable('requisition');
}
