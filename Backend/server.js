//#region require's
const bodyParser = require('body-parser');
const dbSetup = require('./db/db_setup');
const categoria_model = require('./db/model/categoria_model');
const produto_model = require('./db/model/produto_model');
const venda_model = require('./db/model/venda_model');
const venda_parcial = require('./db/model/venda_parcial');
const Produto_Venda = require('./db/model/produto_venda');
const cors = require('cors');
const express = require('express');
//#endregion

//#region express
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));
const port = 3001;

dbSetup();
//#endregion

//#region endpoints - Produtos

app.post('/produto/cadastrar', async (req, res) => {

  try {
    const produto = req.body;
    const data = await categoria_model.relatedQuery('produto')
  .for(produto.fk_categoria)
  .insert({ 
    nome: produto.nome,
    quantidade: produto.quantidade,
    preco_compra: produto.preco_compra,
    margem_lucro: produto.margem_lucro,
    preco_venda: produto.preco_venda });
    
    console.log(data); 
    res.send("Produto cadastrado com sucesso !");

  } catch (error) {
    console.log(error);
    res.status(500).json(error) ;

  }

});

app.get('/produto/', async (req, res) => {
  try {
  
  const produto = await produto_model.query()
    .select('produto.*','categoria.nome as fk_categoria')
    .joinRelated('categoria')    
    .orderBy('id');
    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})



app.get('/produto/:id', async(req,res) =>{
  try{
    const produtoId = await produto_model.query()
    .findById(req.params.id)
    res.json(produtoId)
  } catch(error){
    console.log(error)
    res.status(500).json(error)
  }
})

app.put("/produto/alterar/:id", async (req, res) => {
  try{
  await produto_model.query()
  .findById(req.params.id)
  .patch(req.body);
  res.send("Produto atualizado com sucesso!")
  console.log(res.send)
  } catch(error){
    console.log(error);
    res.status(500).json(error);
    
  }  
});

app.delete('/produto/delete/:id', async (req, res) => {
  try{
  const produto = await produto_model.query().deleteById(req.params.id)  
  res.send("Produto deletado com sucesso!")
} catch (err){
  console.error(err);
  res.status(500).json(err);
}})
//#endregion

//#region endpoints - Vendas parcial

app.post('/venda/parcial', async(req, res) =>{
  try{
    let vendaParcial = req.body;
    let response = await venda_parcial.query().insert(vendaParcial)
    res.json(response)
  }catch (err){
    res.status(500).json(err);
  }
})

app.delete('/venda/parcial/delete/:id', async (req, res) => {
  try{
  const vend = await venda_parcial.query().deleteById(req.params.id)  
  res.send(vend)
} catch (err){
  console.error(err);
  res.status(500).json(err);
}})

app.delete('/venda/parcial/delete/', async (req, res) => {
  try{
  const vend = await venda_parcial.query().delete() 
  res.send(vend)
} catch (err){
  console.error(err);
  res.status(500).json(err);
}})

app.get('/venda/parcial/retorno', async(req,res)=>{
  try{
    let vendaRes = await venda_parcial.query()
    .orderBy('id');
    res.json(vendaRes);
    console.log(vendaRes);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

app.put("/venda/parcial/quant/:id", async (req, res) => {
  try{
  await venda_parcial.query()
  .findById(req.params.id)
  .patch(req.body);
  res.send("quantidade atualizada")
  console.log(res.send)
  } catch(error){
    console.log(error);
    res.status(500).json(error);    
  }  
});

//#endregion

//#region endpoints - Vendas final
app.get('/venda/', async(req, res) =>{
  try{
    const venda = await venda_model.query()
    res.json(venda);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

app.get('/venda/clientes', async (req, res) => {
  try {
  const cliente = await Produto_Venda.query()
  //.select( 'produto_venda.fk_produto')
  .select('produto_venda.*','produto.nome as fk_produto')
  .joinRelated('produto')    
  .orderBy('id');

  res.json(cliente)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})



app.post('/venda/cadastrar',async (req,res) =>{

    try {

    let vendaReq = req.body;
      const venda = {
        nomecliente:vendaReq.nomecliente, 
        precototal:vendaReq.precototal, 
        lucrototal: vendaReq.lucrototal,
        datacompra: vendaReq.datacompra
      }
    let response = await venda_model.query().insert(venda)
    
    vendaReq.produtos.map( async (prod) => {
      await Produto_Venda.query().insert({
        fk_produto: prod.id, 
        fk_venda: response.id, 
        quantidade: prod.quant
      })
    });
    res.json(vendaReq)
  }    
    catch (error) {
    console.log(error);
    res.status(500).json(error) ;

  }

})

app.get('/venda/produto_venda/retorno/:id', async(req, res) =>{
  try{
    const venda = await Produto_Venda.query().findById(req.params.id)
    .select('produto_venda.*','produto.nome as fk_produto')
    .joinRelated('produto')    
    .orderBy('id');

    res.json(venda);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

app.delete('/venda/produto_venda/:id', async(req, res) =>{
  try{
    const venda = await Produto_Venda.query().whereRaw(`fk_venda = ${req.params.id}`).del()
    res.json(venda);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

app.delete('/venda/delete/:id', async(req, res) =>{
  try{
    const del = await venda_model.query().deleteById(req.params.id)
    res.json(del)
  } catch(err){
    console.error(err)
  }
  
})

//#endregion

app.listen(port, () => {
  console.log(`Server on - port ${port}`)
})