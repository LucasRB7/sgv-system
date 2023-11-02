import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";

import "./VendaCar.css"
import TableRow from "./TableRow";
import Summary from './../Summary/Summary';

export default function VendaCar(){
    const [carrinho, setCarrinho] = useState([]);
    const [atualizar, setAtualizar] = useState(false);
    const [cliente,setCliente] = useState('');
    const toast = useRef(null);

    const dataAtual =()=>{
    let now = new Date;
    let diaAtual = now.getDate()
    let mesAtual = now.getUTCMonth()
    let anoAtual = now.getFullYear()
    return `${diaAtual}-${mesAtual+1}-${anoAtual}`
    }

    const data =()=>{        
        
            axios({
                method:'Get',
                url:'http://localhost:3001/venda/parcial/retorno'})
                .then((response) => {
                    setCarrinho(response.data)                    
                })
                .catch((err)=>{console.log(err)})       
            
        }

    useEffect(()=>{
        data()
    }, [atualizar])

    const handleRemoveItem = (item) =>{
        axios({
            method:'Delete',
            url:`http://localhost:3001/venda/parcial/delete/${item}`
        })
        .then((response)=>{
            console.log(response)
            setAtualizar(!atualizar)
        })
        .catch((err) =>{
            console.log(err)
            setAtualizar(!atualizar)
        })
        
    }

    const handleQtdItem = (item, acao) =>{
        let newQtd = Number(item.quant);

        if(acao === "decrementar"){
            if(newQtd <= 1){
                return;
            }
            newQtd -= 1;
        }        
        if(acao === "incrementar"){
            newQtd += 1;
        }

        axios({
            method:'Put',
            url:`http://localhost:3001/venda/parcial/quant/${item.id}`,
            data:{
                nome:item.nome,
                preco:item.preco,
                quant: newQtd,
                id:item.id                
            }
        })
        .then((res)=>{
            console.log(res)
            setAtualizar(!atualizar)
        })
        .catch((err)=>err)
        
        
    }

    const cancelVendaParcial = () =>{
        
            axios({
                method:'Delete',
                url:`http://localhost:3001/venda/parcial/delete/`
            })
            .then((response)=>{
                console.log(response)
                setAtualizar(!atualizar)
            })
            .catch((err) =>{
                console.log(err)
                setAtualizar(!atualizar)
            })
            
    }

    const valorTotalVenda = () =>{
        let valVenda = 0;
        for (let item of carrinho){
            valVenda += item.preco * item.quant;
        }

        return valVenda.toFixed(2);
    }
    
    const valTotal = valorTotalVenda()

    const valorTotalCompra = () =>{
        let valCompra = 0;
        let valDiferenca = 0
        for (let item of carrinho){
            valCompra += item.precocompra * item.quant;
            valDiferenca =  valTotal - valCompra;
        }

        return valDiferenca
    }
    const valLucro = valorTotalCompra()
    
    
    const confirmeVenda = () =>{
       
        axios({
            method: 'post',
            url:'http://localhost:3001/venda/cadastrar',
            data: {
                nomecliente : cliente,
                precototal : valTotal,
                lucrototal : valLucro,
                datacompra : dataAtual(),        
                produtos: carrinho                     
            }

        }).then((response) => {
            console.log(response)
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Venda Realizada', life: 3000 });
            cancelVendaParcial()
        }).catch((err)=>{
            console.log(err)
            toast.current.show({ severity: 'error', summary: 'Falha', detail: 'Venda não Realizada', life: 3000 }); 
        })
         
    }

   

    return(
        
        <div style={{width:'100%', display:'grid', gridTemplateColumns:'10% 50% 30% 10%', justifyItems:'center'}}>
            <Toast ref={toast} />
            <div></div>
            <section>
                <table>
                    <thead>
                        <tr >
                            <div className="rowMain">
                                <td>PRODUTO</td>
                                <td>PREÇO</td>
                                <td>QUANTIDADE</td>
                                <td>TOTAL</td>
                                <td>EXCLUIR</td>  
                                
                            </div>
                            
                        </tr>
                    </thead>
                    <tbody>                       
                        {carrinho.map((item) =>
                            <TableRow 
                            key={item.id}
                            data = {item}
                            handleRemoveItem = {handleRemoveItem}
                            handleQtdItem = {handleQtdItem}
                            />
                        )}    

                         {carrinho.length === 0 && (
                        <tr className="cart">
                            <td colSpan={'5'}>
                                Carrinho de compras vazio.
                            </td>
                        </tr>)}                                            
                    </tbody>
                </table>
            </section>
            <aside>
                <Summary 
                total={valTotal}
                confirmeVenda = {confirmeVenda}   
                nomeCliente={setCliente}
                />
            </aside>
        </div>
    )
}