const {Model} = require("objection");
const Produto_Venda = require("./produto_venda");


class Produto extends Model{

    static get tableName(){
        return 'produto';
    }

    static get idColumn(){
        return 'id';
    }

    static get nomeColumn(){
        return 'nome';
    }

    static get quantidadeColumn(){
        return 'quantidade';
    }

    static get fk_categoriaColumn(){
        return 'fk_categoria';
    }

    static get preco_compraColumn(){
        return 'preco_compra';
    }

    static get margem_lucroColumn(){
        return 'margem_lucro';
    }   
    
    static get preco_vendaColumn(){
        return 'preco_venda';
    }
    
    static get relationMappings() {
        const Categoria = require("./categoria_model");
        const Venda = require('./venda_model')
        return {
          categoria: {
            relation: Model.BelongsToOneRelation,
            modelClass: Categoria,
            join: {
              from: 'produto.fk_categoria',
              to: 'categoria.id'
            }
          },
          venda: {
            relation: Model.ManyToManyRelation,
            modelClass: Venda,
            join: {
              from: 'produto.id',
              through: {
                // produto_venda é a tabela de junçao.
                modelClass:Produto_Venda,
                from: 'produto_venda.fk_produto',
                to: 'produto_venda.fk_venda',
                extra:['quantidade']
              },
              to: 'venda.id'
            }
          }
        };
    }


}

module.exports = Produto