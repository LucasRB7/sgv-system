/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex){
    await knex.raw('TRUNCATE TABLE "venda" CASCADE');

    await knex ('venda').insert([
        {nomecliente: 'Rafael', precototal: 155.00, lucrototal:77.50 },
        {nomecliente: 'Lucas', precototal: 45.00, lucrototal: 22.50} ,        
    ]);
};