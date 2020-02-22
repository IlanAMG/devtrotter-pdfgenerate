import React, { useState } from 'react'
import { Produit } from '../Produit/Produit';
import { renderPDFInDom } from '../PdfMaker/PdfMake';
import { InputText } from '../InputText/InputText';
import firebase from '../../firebase/firebase';

export const DevisForm = () => { 
    const today = new Date()
    const date = today.getFullYear()+'/'+(today.getMonth() + 1)+'/'+today.getDate()

    const [infos, setInfos] = useState({
        id: '',
        date: date,
        note: '',
        title: 'Jeff de Bruges',
        adresse: '17 Cours de Vincennes',
        ville: 'PARIS',
        CP: '75020',
        nomClient: '',
        adresseClient: '',
        villeClient: '',
        CPClient: '',
    })

    const [footer, setFooter] = useState({
        footer1: 'DELICES EVA - Commercant independant - Chocolat-confiserie-dragees-cremes glacees',
        footer2: 'E.U.R.L. au Capital de 10.000 € - Siret : 753 447 556 000 14',
        footer3: '17 Cours de Vincennes 75020 PARIS - Tel. 01.43.79.14.64 - Fax 09 67 29 14 64',
        footer4: 'E-mail jeffdebruges.cdv@orange.fr'
    })

    const [cheminImg, setCheminImg] = useState(null)
    const [url, setURL] = useState('')
    const [progress, setProgress] = useState(0)

    const [produits, setProduits] = useState({})
   

    const handleSubmit = e => {
        e.preventDefault()

    }

    const handleChange = (e) => {
        const value = e.currentTarget.value
        const name = e.target.name
        setInfos({...infos, [name]: value})
    }

    const handleAddProduit = () => {
        const id = Date.now().toString()
        const clonedProduits = {...produits}
        clonedProduits[id] = {
            id: id,
            description: '',
            quantity: '1',
            taxe: 0.055,
            montant: 0,
        }
        setProduits(clonedProduits)
    }

    const onHandleProduitChange = (e, produit, field) => {
        const value = e.currentTarget.value
        const clonedProduit = {...produit}
        clonedProduit[field] = value
        const clonedProduits = {...produits}
        clonedProduits[clonedProduit.id] = clonedProduit
        setProduits(clonedProduits)
    }

    const handleLoadImg = (e) => {
        setCheminImg(e.target.files[0])
    }
    const handleAddImg = () => {
        const uploadTask = firebase.storage.ref(`images/${cheminImg.name}`).put(cheminImg)
        uploadTask.on('state_changed',
             (snapshot) => {
                //progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
             }, 
             (err) => {
                //error
                console.log(err)
             }, 
             () => {
                //complete
                firebase.storage.ref('images').child(cheminImg.name).getDownloadURL().then(url => {
                    setURL(url)
                })
             })
    }

    const handleFooter = e => {
        const value = e.currentTarget.value
        const name = e.target.name
        setFooter({...footer, [name]: value})
    }

    return (
        <>
            
            <form className='wrap-form' onSubmit={handleSubmit}>
                <div className='container-form'>
                        
                    <div className='container-infosdevis'>
                        
                        <InputText placeholder='ID' label='ID :' name='id' value={infos.id} onChange={handleChange}/>
                        <InputText placeholder='Date du devis' label='Date du devis :' name='date' value={infos.date} onChange={handleChange}/>
                        <InputText placeholder='Note' label='Note :' name='note' value={infos.note} onChange={handleChange}/>
                        
                    </div>
                    <div className='container-infosperso'>
                        <InputText placeholder='Votre société' label='Société :' name='title' value={infos.title} onChange={handleChange}/>
                        <InputText placeholder='Adresse' label='Adresse :' name='adresse' value={infos.adresse} onChange={handleChange}/>
                        <InputText placeholder='ville' label='Ville :' name='ville' value={infos.ville} onChange={handleChange}/>
                        <InputText placeholder='Code Postal' label='Code Postal :' name='CP' value={infos.CP} onChange={handleChange}/>
                    </div>
                    <div>
                        <InputText placeholder="Nom de l'entreprise" label="Nom de l'entreprise" name='nomClient' value={infos.nomClient} onChange={handleChange}/>
                        <InputText placeholder="Adresse de l'entreprise" label="Adresse de l'entreprise :" name='adresseClient' value={infos.adresseClient} onChange={handleChange}/>
                        <InputText placeholder="Ville de l'entreprise" label="Ville de l'entreprise :" name='villeClient' value={infos.villeClient} onChange={handleChange}/>
                        <InputText placeholder="CP de l'entreprise" label="CP de l'entreprise :" name='CPClient' value={infos.CPClient} onChange={handleChange}/>
                    </div>
                </div>
                <div className='container-imgfooter'>
                    <div className='container-imgload'>
                        <label>Image d'en tête : </label><input onChange={handleLoadImg} type='file'/>
                        <progress value={progress} max='100'/>
                        {cheminImg !== null ? <button onClick={handleAddImg}>Ajouter l'image</button> : null}
                    </div>
                    <div className='container-footer '>
                        <InputText placeholder="Footer ligne 1" label="Footer ligne 1 :" name='footer1' value={footer.footer1} onChange={handleFooter}/>
                        <InputText placeholder="Footer ligne 2" label="Footer ligne 2 :" name='footer2' value={footer.footer2} onChange={handleFooter}/>
                        <InputText placeholder="Footer ligne 3" label="Footer ligne 3 :" name='footer3' value={footer.footer3} onChange={handleFooter}/>
                        <InputText placeholder="Footer ligne 4" label="Footer ligne 4 :" name='footer4' value={footer.footer4} onChange={handleFooter}/>
                    </div>
                </div>
                
                <button onClick={handleAddProduit}>Ajouter un produit</button>

                {Object.keys(produits).map((produitId, index) => (
                    <Produit key={index} produit={produits[produitId]} onProduitChange={onHandleProduitChange}/>
                ))}

                <button onClick={() => renderPDFInDom(infos, produits, url, footer)}>Générer le Devis en PDF</button>
            </form>
        </>
    )
}
