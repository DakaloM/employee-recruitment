import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('advert', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('generate_ulid()'));
    t.uuid('requisition_id').references('id').inTable('requisition').notNullable().onDelete('CASCADE');
    t.string('title').nullable();
    t.string('position_title').notNullable()
    t.string('status').notNullable().defaultTo('Open')
    t.string('location').nullable();
    t.increments('sequence').notNullable().unique();
    t.timestamps(true, true);
  });

  await knex.raw(`
    ALTER TABLE "advert"
    ADD COLUMN search tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('simple', coalesce(position_title, '')), 'A') ||
      setweight(to_tsvector('simple', coalesce(title, '')), 'B') ||
      setweight(to_tsvector('simple', coalesce(location, '')), 'C') :: tsvector
    ) STORED;
  `);

  await knex.raw(`
    CREATE INDEX advert_search_idx ON "advert" USING GIN(search);
  `);

}


export async function down(knex: Knex): Promise<void> {

   // drop the index
   await knex.raw(`
   DROP INDEX IF EXISTS advert_search_idx;
   `);

  return await knex.schema.dropTableIfExists('advert')
}

