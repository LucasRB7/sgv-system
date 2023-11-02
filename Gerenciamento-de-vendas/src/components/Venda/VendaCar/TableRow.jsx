import "./VendaCar.css"

export default function TableRow({ data, handleRemoveItem, handleQtdItem }) {


  const valTotal = (data.preco * data.quant).toFixed(2)

  return (
    <tr>
      <div className="rowData">
        <td colSpan={2}>
          <div className="produto">
            <div >
              <div className="nome">{data.nome }</div>
            </div>
          </div>
        </td>
        <td className="info"> {Number(data.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </td>
        <td>
          <div >
            <button className="moreORless"
              onClick={() => {
                handleQtdItem(data, "decrementar");
              }}
            >
              <i className="pi pi-minus"></i>
            </button>
            <span className="qtd">{data.quant}</span>
            <button className="moreORless"
              onClick={() => {
                handleQtdItem(data, "incrementar");
              }}
            >
              <i className="pi pi-plus"></i>
            </button>
          </div>
        </td>
        <td className="info"> {Number(valTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
        <td>
          <button className="remove" onClick={() => handleRemoveItem(data.id)}>
            <i className="pi pi-times"></i>
          </button>
        </td>
      </div>
    </tr>
  );
}
