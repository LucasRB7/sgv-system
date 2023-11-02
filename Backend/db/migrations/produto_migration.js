/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
       return knex.schema.createTable('produto', (table) => {
              table.increments('id').primary()
              table.string('nome').notNullable().unique();
              table.integer('quantidade').notNullable(); 
              table.integer('fk_categoria').references('id').inTable('categoria').onDelete('SET NULL')
              table.decimal('preco_compra', 4, 2).notNullable();
              table.integer('margem_lucro', 2, 2);
              table.decimal('preco_venda', 4, 2).notNullable();                  
              table.timestamp('created_at').defaultTo(knex.fn.now());
              table.timestamp('updated_at').defaultTo(knex.fn.now());  
        }) 
          
        
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropSchemaIfExists('produto'); 
};
