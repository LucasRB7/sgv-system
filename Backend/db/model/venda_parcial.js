const {Model} = require("objection");

class venda_parcial extends Model{

    static get tableName(){
        return 'venda_parcial';
    }

    static get nomeColumn(){
        return 'nome';
    }

    static get precoColumn(){
        return 'preco';
    }

    static get quantColumn(){
        return 'quant';
    }

    static get idColumn(){
        return 'id';
    }   

    static get precocompraColumn(){
        return 'precocompra';
    }
}

module.exports = venda_parcial