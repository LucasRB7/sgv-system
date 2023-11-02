import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo.jpg"
import 'primeicons/primeicons.css';
import '../App.css'

export default function Menu() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
      
      <Sidebar style={{width:'230px', backgroundColor:'white', color:'black'}} visible={visible} onHide={() => setVisible(false)} >
      <div>
        <img src={logo} alt="" />
      </div>
        <div className="list">
          <div className="houverlado"  onClick={() => setVisible(false)} >
            <Link to="/" >
              <i className="pi pi-home" style={{ fontSize: "1rem", color:'black', fontWeight:'600',width:'230px' ,height: '25px' }}> HOME </i>
            </Link>
          </div>
          <div className="houverlado"   onClick={() => setVisible(false)}>
            <Link to="/produto">
              <i className="pi pi-box" style={{ fontSize: "1rem", color:'black', fontWeight:'600' ,width:'230px' ,height: '25px' }}> PRODUTOS</i>
            </Link>
          </div>
          <div className="houverlado"   onClick={() => setVisible(false)}>
            <Link to="/venda"  >
              <i className="pi pi-shopping-cart" style={{ fontSize: "1rem", color:'black', fontWeight:'600' ,width:'230px' ,height: '25px'  }}> VENDA</i>
            </Link>
          </div>
          
        </div>
      </Sidebar>
      <Button style={{backgroundColor:'#004483'}} icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
    </div>
  );
}        