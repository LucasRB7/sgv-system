const {Model} = require("objection");


class Categoria extends Model{

    static get tableName(){
        return 'categoria';
    }

    static get idColumn(){
        return 'id';
    }

    static get nomeColumn(){
        return 'nome';
    }

    static get relationMappings() {
        const Produto = require("./produto_model");
        return {
          produto: {
            relation: Model.HasManyRelation,
            modelClass: Produto,
            join: {
              from: 'categoria.id',
              to: 'produto.fk_categoria'
            }
          }
        };
      }


}

module.exports = Categoria