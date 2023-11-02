/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('venda', function(table) {
        table
          .increments('id')
          .primary()
          .unsigned();
        table.string('nomecliente').notNullable();
        table.decimal('precototal', 6, 2).notNullable();
        table.decimal('lucrototal', 6, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });      
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
 return knex.schema 
    .dropSchemaIfExists('venda'); 
};