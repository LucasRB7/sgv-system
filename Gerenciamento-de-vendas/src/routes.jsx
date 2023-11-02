
import { Route , Routes } from "react-router-dom"

import Home from "./pages/Home"
import Produto from "./pages/Produto"
import Venda from "./pages/Venda"

export default function AppRoutes(){
    
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/produto" element={<Produto />}/>
            <Route path="/venda" element={<Venda />}/>
        </Routes>
    )
}