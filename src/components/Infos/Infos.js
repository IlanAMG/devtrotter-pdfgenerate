import React from 'react'
import './Infos.css'

export const Infos = ({ showFact, showForm, handleShowDevisForm, handleShowFactForm}) => {
    return (
        <>
            <h1>PDF Generator</h1> 
            <div className='container-choix'>
                <button onClick={handleShowDevisForm}>Créer un nouveau Devis</button>
                {showFact ? <h2 style={{fontSize: '2em', alignSelf: 'center', color: '#fff' ,margin: 0, height: '40px'}}>Nouvelle Facture</h2> : null}
                {showForm ? <h2 style={{fontSize: '2em', alignSelf: 'center', color: '#fff',margin: 0, height: '40px'}}>Nouveau Devis</h2> : null}
                <button onClick={handleShowFactForm}>Créer une nouvelle Facture</button>
            </div>
        </>
    )
}
