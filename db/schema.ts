// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const studies = sqliteTable('studies',{
 id:text('id').primaryKey(), title:text('title').notNull(), keyHash:text('key_hash').notNull(), createdAt:text('created_at').notNull()
});
export const responses = sqliteTable('responses',{
 id:text('id').primaryKey(), studyId:text('study_id').notNull().references(()=>studies.id), profile:text('profile').notNull(), paperRef:text('paper_ref').notNull(), status:text('status').notNull(), answers:text('answers').notNull(), version:integer('version').notNull().default(1), createdAt:text('created_at').notNull(), updatedAt:text('updated_at').notNull()
},table=>[uniqueIndex('response_paper_unique').on(table.studyId,table.profile,table.paperRef)]);
