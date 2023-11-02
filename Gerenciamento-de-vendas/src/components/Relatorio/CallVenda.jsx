import './CallVenda.css'

export default function CallVenda({title ,infor}) {
  return (
    <div class="grid">
      <div class="col">
        <div className='box'>
          <h2>{title}</h2>
          <h2>{infor}</h2>
        </div>
      </div>
    </div>
  );
}
