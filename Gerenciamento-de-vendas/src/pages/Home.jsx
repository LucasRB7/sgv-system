import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css"; 

import CallVenda from "../components/Relatorio/CallVenda";
import Vendas from "../components/Relatorio/vendas";
import './Home.css'

export default function Home() {
  const [vendas, setVendas] = useState();
  const [valorBruto,setValorBruto] = useState();
  const [valorLiquido,setValorLiquido] = useState();

  const [atualizar,setAtualizar] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/venda/",
    }).then((response) => {
      let numVendas = response.data
      console.log(numVendas);
      let valBruto = () =>{
        let somaBruto = 0
        for (let index = 0; index < numVendas.length; index++) 
        {
            somaBruto+= Number(numVendas[index].precototal)
        }
        return somaBruto
      }  

      let valLiquido = () =>{
        let somaLiquido = 0
        for (let index = 0; index < numVendas.length; index++) 
        {
            somaLiquido+= Number(numVendas[index].lucrototal)
        }
        return somaLiquido
      }      
      
      setVendas(numVendas.length);
      setValorBruto(valBruto)   
      setValorLiquido(valLiquido)   

      })
      .catch(()=>{
        setVendas('Off')
        setValorBruto('Off')   
        setValorLiquido('Off')   
      }) 
      
    }), [atualizar];
  return (
  <div className="main">   
    <div class="grid">
      <div class="col">
        <CallVenda 
        title="Total de Vendas" 
        infor={vendas}
        />
      </div>
      <div class="col">
        <CallVenda 
        title="Valor Bruto" 
        infor={Number(valorBruto).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
      </div>
      <div class="col">
        <CallVenda 
        title="Lucro Liquido" 
        infor={Number(valorLiquido).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        />
      </div>      
    </div>
    <div>
    <Vendas enviar={setAtualizar}/>
    </div>
  </div>
  );
}
