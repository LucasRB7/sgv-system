import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function Cupom({disableButton, title, modal, color, value }) {
    const [visible, setVisible] = useState(false);
    const [cupom, setCupom] = useState();
    const footerContent = (
        <div>
            <Button label="Confirmar" severity="success" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (        
        <div className="card flex justify-content-center">            
            <Button label={title} severity={color} disabled={disableButton} icon="pi pi-tag" onClick={() => setVisible(true)} />
            <Dialog header={modal} visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                
                <div>
                    <InputText onChange={(e) => value(e.target.value)} />
                </div>
            
            </Dialog>
        </div>
    )
}