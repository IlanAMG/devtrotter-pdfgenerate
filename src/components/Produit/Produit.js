import React from 'react'

export const Produit = ({ produit, onProduitChange }) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input
                            placeholder="Désignation"
                            type="text"
                            name='description'
                            value={produit.description}
                            onChange={e => onProduitChange(e, produit, "description")} />
                    </div>
                    <div className="col">
                        <input
                            min="0"
                            type="number"
                            name='quantity'
                            value={produit.quantity}
                            onChange={e => onProduitChange(e, produit, "quantity")} />
                    </div>
                    <div className="col">
                        <input
                            placeholder="Taxe"
                            type="text"
                            name='taxe'
                            value={produit.taxe}
                            onChange={e => onProduitChange(e, produit, "taxe")} />
                    </div>
                    <div className="col">
                        <input
                            placeholder="Prix"
                            type="text"
                            name='montant'
                            value={produit.montant}
                            onChange={e => onProduitChange(e, produit, "montant")} />
                            €
                    </div>
                </div>
            </div>
        </>
    )
}
