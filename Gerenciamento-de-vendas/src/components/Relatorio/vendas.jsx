import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';

export default function SingleColumnDemo({enviar}) {

    const [vendas, setVendas] = useState([]);
    const [atualizar, setAtualizar] =useState('false')    

    const getVendas = () =>{
        axios({
            method:'get',
            url:'http://localhost:3001/venda/'})
                .then((response) => {
                    console.log(response.data)
                    setVendas(response.data)                   
                })
                .catch((err)=>{console.log(err)})  
    }

    useEffect(() => {
        getVendas();
    }, [atualizar]);

    const deleteVenda = (id) =>{
        console.log(id)
        const delProd = (id) =>{
            axios({
                method:'Delete',
                url:`http://localhost:3001/venda/produto_venda/${id}`
            })
            .then((response)=>{console.log(response)})
            .catch((err) =>{console.log(err)})            
        }

        return(
            <div>
                <Button severity='danger'  onClick={()=>{
                    
                    delProd(id)

                    axios({
                        method:'Delete',
                        url:`http://localhost:3001/venda/delete/${id}`
                    })
                    .then((response)=>{
                        console.log(response)
                        setAtualizar(!atualizar)
                        enviar = !atualizar
                    })
                    .catch((err) =>{console.log(err)})
                    }} 
                >
                    <i className='pi pi-times-circle'></i>
                </Button>
            </div>
        )
    }

    const formatCurrency = (rowData) => {
        return Number(rowData.precototal).toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
    };

    const tableId = (rowData) =>{
        console.log(rowData.id)
        const delProd = (rowData) =>{
            axios({
                method:'Delete',
                url:`http://localhost:3001/venda/produto_venda/${rowData}`
            })
            .then((response)=>{console.log(response)})
            .catch((err) =>{console.log(err)})            
        }

        return(
            <div>
                <Button severity='danger'  onClick={()=>{
                    
                    delProd(rowData.id)

                    axios({
                        method:'Delete',
                        url:`http://localhost:3001/venda/delete/${rowData.id}`
                    })
                    .then((response)=>{
                        console.log(response)
                        setAtualizar(!atualizar)
                        enviar = !atualizar
                    })
                    .catch((err) =>{console.log(err)})
                    }} 
                >
                    <i className='pi pi-times-circle'></i>
                </Button>
            </div>
        )
    }

    return (
        <div className="card">
            <div>
                <h1>Relatorio de Vendas</h1>
            </div>
            <DataTable value={vendas} tableStyle={{ minWidth: '20rem' }}>
                <Column field="id" header="ID da Venda" sortable style={{ width: '10%' }}></Column>
                <Column field="nomecliente" header="Cliente" sortable style={{ width: '40%' }}></Column>
                <Column field="precototal" body={formatCurrency} header="Valor Total" sortable style={{ width: '20%' }}></Column>
                <Column field="datacompra"  header="Data da Compra" sortable style={{ width: '20%' }}></Column>
                <Column  body={tableId}  header="Estornar" style={{ width: '10%' }}></Column>
            </DataTable>

        </div>
    );
}