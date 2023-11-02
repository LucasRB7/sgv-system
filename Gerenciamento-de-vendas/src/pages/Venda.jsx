//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import './Venda.css'

import React from "react";
import { useState } from "react";


import Stepscar from "../components/Venda/VendaCar/Stepscar";
import VendaCar from "../components/Venda/VendaCar/VendaCar";

export default function Venda(){

   
   return(
      <div>
         <div>
            <Stepscar />          
         </div>
         <div className="tela_venda">
            <VendaCar />
         </div>
      </div>     
      
   )
}