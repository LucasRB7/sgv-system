import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
//import { FileUpload } from 'primereact/fileupload';
//import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
//import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
//import { Tag } from 'primereact/tag';


import axios from 'axios';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";  

export default function Produto() {
    let emptyProduct = {
        id:'',
        nome: '',
        image: null,
        categoria: null,
        preco_venda: 0,
        quantidade: 0,
        preco_compra: 0,
        margem_lucro: 0
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [atualizar, setAtualizar] = useState(false);
    const toast = useRef(null);
    const toastCar = useRef(null);
    const dt = useRef(null);

    //Post - Salvar produtos...
    const salvarProdutos = (prod) =>{
        axios({
            method:'Post',
            url:'http://localhost:3001/produto/cadastrar',
            data:{
                nome: prod.nome,
                quantidade: prod.quantidade,
                fk_categoria: prod.categoria,
                preco_compra: prod.preco_compra,
                margem_lucro: prod.margem_lucro,
                preco_venda: prod.preco_venda,
                path_img: prod.image
            }
        })
        .then((res)=>console.log(res))
        .catch((err)=>err)
    }
    //Get - Pegando os produtos...
    useEffect(() => {
        axios({
            method:'Get',
            url:'http://localhost:3001/produto/'})
            .then((response) => setProducts(response.data))
            .catch((err)=>{console.log(err)})
    }, [atualizar]);

    //Delete - Função para deletar produtos...
    const apagarProdutos = (id) => {
        axios({
            method:'Delete',
            url:`http://localhost:3001/produto/delete/${id}`
        })
        .then((response)=>{console.log(response)})
        .catch((err) =>{console.log(err)})
    } 
    //Put - Atualizar determinado produto...
    const atualizarProdutos = (prod) =>{
        axios({
            method:'Put',
            url:`http://localhost:3001/produto/alterar/${prod.id}`,
            data:{
                nome: prod.nome,
                quantidade: prod.quantidade,
                fk_categoria: prod.categoria,
                preco_compra: prod.preco_compra,
                margem_lucro: prod.margem_lucro,
                preco_venda: prod.preco_venda,
                path_img: prod.image
            }
        })
        .then((res)=>console.log(res))
        .catch((err)=>err)
    }


    const formatCurrency = (value) => {
        return Number(value).toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.nome.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                atualizarProdutos(_product)
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto Atualizado', life: 3000 });

            } else {
                _product.id = createId();
                //_product.image = 'product-placeholder.svg';
                _products.push(_product);
                salvarProdutos(_product);
                console.log (_product)
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto Salvo', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
            setAtualizar(!atualizar);
        }
    };

    const addCart =(rowData) =>{
        axios({
            method:'Post',
            url:'http://localhost:3001/venda/parcial',
            data:{
                nome: rowData.nome,
                preco: rowData.preco_venda,
                precocompra: rowData.preco_compra,
                quant: 1,
                id: rowData.id
            }
        })
        .then((res)=>console.log(res))
        .catch((err)=>err)

        //RowData(rowData);


        
        toastCar.current.show({ severity: "success", summary: 'Sucesso', detail: 'Produto adicionado ao carrinho', life: 3000 });
        
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        let _productsId = products.filter((val) => val.id == product.id)

        apagarProdutos(_productsId[0].id)
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto apagado!', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = products[products.length - 1];
        
        for (let i = 0; i < 1; i++) {
            
            id = id+1
        }

        return id;
    };


    const exportCSV = () => {
        dt.current.exportPDF();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        let _deleteProducts = products.filter((e) => selectedProducts.includes(e))
        _deleteProducts.map((e)=>{return apagarProdutos(e.id) })
           
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto apagado!', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['categoria'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${nome}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, nome) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${nome}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Novo" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Apagar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exportar Produtos" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = () => {
        return <img src={null} alt={null} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.preco_venda);
    };

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    // const statusBodyTemplate = (rowData) => {
    //     return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    // };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-cart-plus" rounded outlined className="mr-2" severity="success" onClick={() => addCart(rowData)} />
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h3 className="m-0">Controle de Produtos</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Procurar produto..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    // const porcentagem = (e) =>{
    //     let result1 = valPreco * e
    //     let result2 = product.preco_compra + result1;
    //     return result2
    // }

    const categorias = [
        {
            cod:1,
            nome: "Alimentacao"
        },
        {
            cod:2,
            nome: "Frios"
        },
        {
            cod:3,
            nome: "Bomboniere"
        },
        {
            cod:4,
            nome: "Higiene"
        }
    ]
    return (
        <div>
            <Toast ref={toast} />
            <Toast ref={toastCar} position="top-center" />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable style={{fontWeight:600}} ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="nome"  paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} produtos" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="quantidade" header="Quantidade" ></Column>
                    <Column field='preco_venda' header="Preço"  body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="fk_categoria" header="Categoria" sortable style={{ minWidth: '10rem' }}></Column>
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Informações do Produto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="Nome" className="font-bold">
                        Nome
                    </label>
                    <InputText id="Nome" value={product.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nome })} />
                    {submitted && !product.nome && <small className="p-error">Nome obrigatório.</small>}
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Categoria</label>
                    <div className="formgrid grid">
                        {categorias.length == 0 && <span style={{color:'red', marginLeft:'10px', fontWeight: '500'}}> Crie uma ou mais categorias</span>}
                        {categorias.map((e)=>{
                                return (<div className="field-radiobutton col-6">
                                <RadioButton inputId= "category1" name="categoria" value={e.cod} onChange={onCategoryChange} required checked={product.categoria == `${e.cod}`} />
                                <label htmlFor="category1">{e.nome}</label>
                            </div>)
                        })}
                        
                        {/* <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="categoria" value={2} onChange={onCategoryChange} checked={product.categoria == 2} />
                            <label htmlFor="category2">Higiene</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="categoria" value={3} onChange={onCategoryChange} checked={product.categoria == 3} />
                            <label htmlFor="category3">Bomboniere</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="categia" value={4} onChange={onCategoryChange} checked={product.categoria == 4} />
                            <label htmlFor="category4">Frios</label>
                        </div> */}
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="preco_compra" className="font-bold">
                            Preço de Compra
                        </label>
                        <InputNumber id="preco_compra" value={product.preco_compra } onValueChange={(e) => onInputNumberChange(e, 'preco_compra')} mode="currency" currency="BRL" locale="pt-BR" />
                    </div>
                    {/* <div className="field col">
                        <label htmlFor="margem_lucro" className="font-bold">
                            Margem de Lucro (%)
                        </label>
                        <InputNumber id="margem_lucro" value={product.margem_lucro} onChange={(e) => {porcentagem(e.target.value)}} />
                    </div> */}
               
                    <div className="field col">
                        <label htmlFor="preco_venda" className="font-bold">
                            Preço de Venda
                        </label>
                        <InputNumber id="preco_venda" value={product.preco_venda} onValueChange={(e) => onInputNumberChange(e, 'preco_venda')} mode="currency" currency="BRL" locale="pt-BR" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantidade" className="font-bold">
                            Quantidade
                        </label>
                        <InputNumber id="quantidade" value={product.quantidade} onValueChange={(e) => onInputNumberChange(e, 'quantidade')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmação" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Voce realmente quer apagar o produto  <b>{product.nome}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmação" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Voce realmente quer apagar os produtos selecionados?</span>}
                </div>
            </Dialog>
        </div>
    );
}