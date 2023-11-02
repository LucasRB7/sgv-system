/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produto_venda', (table)=>{
        table.increments('id').primary();
        table.integer('fk_produto').references('id').inTable('produto');
        table.integer('quantidade');
        table.integer('fk_venda').references('id').inTable('venda');
    })
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
 return knex.schema 
    .dropSchemaIfExists('produto_venda'); 
};