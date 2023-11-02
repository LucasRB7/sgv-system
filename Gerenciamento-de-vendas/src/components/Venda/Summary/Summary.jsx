import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

//import Cupom from './Cupom';
import './Summary.css'

export default function Summary({total, confirmeVenda, nomeCliente, /*valDesconto, valFrete*/}){
    
    const offOn = total == 0 ? true : false;  
    const moeda = Number(total)
    
    return(
        <>
            <div className="summary" >
                <header className='titulo'>Resumo da Compra</header>   
                <div className="informacoes">
                    <label htmlFor="cliente" >Nome do Cliente</label>
                    <InputText autoComplete='off' id='cliente' disabled={offOn} onChange={(e)=>{
                        nomeCliente(e.target.value)}}                        
                    ></InputText>
                    {/* <div>
                        <span>Sub-Total</span>
                        <span>{total}</span>
                    </div>
                    <div>
                        <span>Desconto: R${valDesconto}</span>
                        <span>Frete: R${valFrete}</span>
                    </div> 
                    <div>
                        <Cupom 
                        disableButton = {offOn}
                        title={'Adicionar Desconto'}
                        modal={'Valor de Desconto'}
                        color={'container'}
                        value={valDesconto}
                        />                        
                    </div>
                    <div>
                        <Cupom 
                        disableButton = {offOn}
                        title={'Adicionar Frete'}
                        modal={'Valor do Frete'}
                        color={'warning'}
                        value={valFrete}
                        />                        
                    </div> */}
                </div>
                <footer className='total'>
                    <span>Total: </span>
                    <span>{moeda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                </footer>
                <div>
                    <Button disabled={offOn} onClick={confirmeVenda}  severity='success'>Finalizar Compra</Button>
                </div>
            </div>
            
        </>
    )
}