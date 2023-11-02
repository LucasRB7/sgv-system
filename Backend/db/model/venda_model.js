const {Model} = require("objection");
const Produto_Venda = require("./produto_venda");

class venda_model extends Model{

    static get tableName(){
        return 'venda';
    }

    static get idColumn(){
        return 'id';
    }

    static get nomeclienteColumn(){
        return 'nomecliente';
    }

    static get precototalColumn(){
        return 'precototal';
    }

    static get lucrototalColumn(){
        return 'lucrototal';
    }   

    static get datacompra(){
        return 'datacompra';
    }


    static get relationMappings() {
        const Produto = require('./produto_model')
        return{
            produto: {
                relation: Model.ManyToManyRelation,
                modelClass: Produto,
                join: {
                  from: 'venda.id',
                  through: {
                    // produto_venda é a tabela de junçao.
                    modelClass: Produto_Venda,
                    from: 'produto_venda.fk_venda',
                    to: 'produto_venda.fk_produto',
                    extra:['quantidade']
                  },
                  to: 'produto.id'
                }
              }
        }
    }


}

module.exports = venda_model