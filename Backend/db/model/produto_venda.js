const {Model} = require("objection");


class Produto_Venda extends Model{

    static get tableName(){
        return 'produto_venda';
    }

    static get idColumn(){
        return 'id';
    }

    static get fk_produtoColumn(){
        return 'fk_produto';
    }

    static get fk_vendaColumn(){
        return 'fk_venda';
    }

    
       
    
}

module.exports = Produto_Venda