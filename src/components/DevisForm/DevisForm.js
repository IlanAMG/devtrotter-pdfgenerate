import React, { useState } from 'react'
import { renderPDFInDom } from '../PdfMaker/PdfMake';
import { InputText } from '../InputText/InputText';

export const DevisForm = () => {
    const today = new Date()
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()

    const [infos, setInfos] = useState({
        id: '',
        date: date,
        note: '',
        acompte: null,
        nomClient: '',
        adresseClient: '',
        villeClient: '',
        CPClient: '',
    })

    const footer = {
        footer1: 'DEVTROTTER - Amzallag Ilan',
        footer2: '14 Avenue Georges Pompidou 93360 NEUILLY-PLAISANCE - Tel. 06.48.18.90.30',
        footer3: 'E-mail : devtrotter.info@gmail.com',
        footer4: 'Micro-entreprise - Siret : 852 297 209 00011 | TVA non applicable, art 293 B du CGI',
    }

    const [packSelect, setPackSelect] = useState({})
    const [optionsSelect, setOptionsSelect] = useState([])
    const [optionsSelectUI, setOptionsSelectUI] = useState([])
    const [hebergementSelect, setHebergementSelect] = useState({})
    const [bddSelect, setBddSelect] = useState({})

    const [pack, setPack] = useState(null)

    const optionsWeb = [
        {
            id: '0',
            desc: 'Cession du code source',
            prix: 299
        },
        {
            id: '1',
            desc: 'Page supplémentaire',
            prix: 269
        },
        {
            id: '2',
            desc: 'Service mail + nom de domaine mail personnalisé',
            prix: 199
        },
        {
            id: '3',
            desc: 'Fonctionnalité simple',
            prix: 99
        },
        {
            id: '4',
            desc: 'Fonctionnalité complexe',
            prix: 199
        },
        {
            id: '5',
            desc: 'Analytics',
            prix: 99
        },
        {
            id: '6',
            desc: 'Service Newsletter',
            prix: 59
        },
        {
            id: '7',
            desc: "Plan d'accès",
            prix: 59
        },
        {
            id: '8',
            desc: "Dashboard simple",
            prix: 249
        },
        {
            id: '9',
            desc: "Dashboard complexe",
            prix: 449
        },
    ]

    const optionsUI = [
        {
            id: '0',
            desc: 'Logo (1 entretien + 2 brief aller/retour)',
            prix: 210
        },
        {
            id: '1',
            desc: 'Charte Graphique',
            prix: 59
        },
        {
            id: '2',
            desc: 'Bannière (2 tailles)',
            prix: 59
        },
        {
            id: '3',
            desc: 'Mockup',
            prix: 59
        },
        {
            id: '4',
            desc: 'Carte de visite',
            prix: 59
        }
    ]

    const [optionsPers, setOptionsPers] = useState([])

    const [hebergements, setHebergements] = useState([
        {
            id: '1',
            type: 'Essentiel',
            prix: 30,
            min: 30,
            max: 80
        },
        {
            id: '2',
            type: 'Standard',
            prix: 110,
            min: 110,
            max: 250
        },
        {
            id: '3',
            type: 'Complet',
            prix: 500,
            min: 500,
            max: 5000
        },
    ])

    const [bdd, setBdd] = useState([
        {
            id: '1',
            type: 'Essentiel',
            prix: 150,
            min: 150,
            max: 300
        },
        {
            id: '2',
            type: 'Standard',
            prix: 400,
            min: 400,
            max: 800
        },
        {
            id: '3',
            type: 'Complet',
            prix: 1000,
            min: 1000,
            max: 10000
        },
    ])

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        const value = e.currentTarget.value
        const name = e.target.name
        setInfos({ ...infos, [name]: value })
    }

    const handleAddOptions = () => {
        const id = Date.now().toString()
        const clonedOptions = { ...optionsPers }
        clonedOptions[id] = {
            id: id,
            desc: '',
            prix: 0,
        }
        setOptionsPers(clonedOptions)
    }

    const onHandleOptionsChange = (e, option, field) => {
        const value = e.currentTarget.value
        const clonedOption = { ...option }
        clonedOption[field] = value
        const clonedOptions = { ...optionsPers }
        clonedOptions[clonedOption.id] = clonedOption
        console.log(clonedOptions)
        setOptionsPers(clonedOptions)
    }

    const packEssentiel = [
        {
            id: 0,
            desc: 'Hébergement du site : Inclus'
        },
        {
            id: 1,
            desc: 'Nom de domaine : Inclus jusqu\'à 20€'
        },
        {
            id: 2,
            desc: 'Réalisation du code source : Inclus'
        },
        {
            id: 3,
            desc: 'Jusqu\'à 4 pages (dont une page et à propos) : Inclus'
        },
        {
            id: 4,
            desc: 'Personnalisation du site avec votre design : Inclus'
        },
        {
            id: 5,
            desc: 'Optimisation tablette et mobile (responsive simple) : Inclus'
        },
        {
            id: 6,
            desc: 'Formulaire de contact : Inclus'
        },
        {
            id: 7,
            desc: 'Page mentions légales : Inclus'
        },
        {
            id: 8,
            desc: 'Liens vers les réseaux sociaux : Inclus'
        },
        {
            id: 9,
            desc: 'Cession des droit d\'utilisation : Inclus'
        },
        {
            id: 10,
            desc: 'Optimisation du référencement (page d\'accueil) : Inclus'
        },
    ]

    const packStandard = [
        {
            id: 0,
            desc: 'Hébergement du site : Inclus'
        },
        {
            id: 1,
            desc: 'Nom de domaine : Inclus jusqu\'à 20€'
        },
        {
            id: 2,
            desc: 'Réalisation du code source : Inclus'
        },
        {
            id: 3,
            desc: 'Jusqu\'à 7 pages (dont une page et à propos) : Inclus'
        },
        {
            id: 4,
            desc: 'Réalisation de la Charte Graphique : Inclus'
        },
        {
            id: 5,
            desc: 'Réalisation de la structure du site sur mesure : Inclus'
        },
        {
            id: 6,
            desc: 'Création du logo (avec 1 entretien + 2 brief aller/retour) : Inclus'
        },
        {
            id: 7,
            desc: 'Optimisation tablette et mobile (responsive complexe) : Inclus'
        },
        {
            id: 8,
            desc: 'Formulaire de contact + plan d\'accès : Inclus'
        },
        {
            id: 9,
            desc: 'Page mentions légales : Inclus'
        },
        {
            id: 10,
            desc: 'Liens vers les réseaux sociaux : Inclus'
        },
        {
            id: 11,
            desc: 'Cession des droit d\'utilisation : Inclus'
        },
        {
            id: 12,
            desc: 'Cession des droit du code source : Inclus'
        },
        {
            id: 13,
            desc: 'Cession des droits d\'auteurs : Inclus'
        },
        {
            id: 14,
            desc: 'Page d\'administation simple : Inclus'
        },
        {
            id: 15,
            desc: 'Formation assistance (1 semaine) : Inclus'
        },
        {
            id: 16,
            desc: 'Garantie correction des bug 1 mois : Inclus'
        },
        {
            id: 17,
            desc: 'Optimisation du référencement (page d\'accueil + 3 pages) : Inclus'
        },
    ]

    const packComplet = [
        {
            id: 0,
            desc: 'Hébergement du site : Inclus'
        },
        {
            id: 1,
            desc: 'Nom de domaine + renouvellement tous les ans (pendant 5 ans)'
        },
        {
            id: 2,
            desc: 'Réalisation du code source : Inclus'
        },
        {
            id: 3,
            desc: 'Jusqu\'à 10 pages (dont une page et à propos) : Inclus'
        },
        {
            id: 4,
            desc: 'Réalisation de la Charte Graphique : Inclus'
        },
        {
            id: 5,
            desc: 'Réalisation de la structure du site sur mesure : Inclus'
        },
        {
            id: 6,
            desc: 'Création du logo (avec 1 entretien + 2 brief aller/retour) : Inclus'
        },
        {
            id: 7,
            desc: 'Optimisation tablette et mobile (responsive complexe) : Inclus'
        },
        {
            id: 8,
            desc: 'Formulaire de contact + plan d\'accès : Inclus'
        },
        {
            id: 9,
            desc: 'Page mentions légales : Inclus'
        },
        {
            id: 10,
            desc: 'Liens vers les réseaux sociaux : Inclus'
        },
        {
            id: 11,
            desc: 'Cession des droit d\'utilisation : Inclus'
        },
        {
            id: 12,
            desc: 'Cession des droit du code source : Inclus'
        },
        {
            id: 13,
            desc: 'Cession des droits d\'auteurs : Inclus'
        },
        {
            id: 14,
            desc: 'Page d\'administation complexe : Inclus'
        },
        {
            id: 15,
            desc: 'Formation assistance (1 mois) : Inclus'
        },
        {
            id: 16,
            desc: 'Garantie correction des bug 3 mois : Inclus'
        },
        {
            id: 17,
            desc: 'Authentification utilisateurs : Inclus'
        },
        {
            id: 18,
            desc: 'Statistiques / Analytics : Inclus'
        },
        {
            id: 19,
            desc: 'Base de donnée Essentiel : Inclus'
        },
        {
            id: 20,
            desc: 'Newletters (service mail) : Inclus'
        },
        {
            id: 21,
            desc: 'Optimisation du référencement (page d\'accueil + 6 pages) : Inclus'
        },
        {
            id: 22,
            desc: 'Etude d\'optimisation ergonomie et accessibilité : Inclus'
        },
    ]

    const handlePackSelect = (pack) => {
        if (pack !== packSelect.id) {
            if (pack === 1) {
                setPackSelect({
                    id: 1,
                    titre: "REALISATION ET CONCEPTION D'UN SITE INTERNET SUR-MESURE",
                    type: 'Pack Essentiel',
                    prix: 699,
                    options: packEssentiel
                })
                setPack(1)
            }
            if (pack === 2) {
                setPackSelect({
                    id: 2,
                    titre: "REALISATION ET CONCEPTION D'UN SITE INTERNET SUR-MESURE",
                    type: 'Pack Standard',
                    prix: 1799,
                    options: packStandard
                })
                setPack(2)
            }
            if (pack === 3) {
                setPackSelect({
                    id: 3,
                    titre: "REALISATION ET CONCEPTION D'UN SITE INTERNET SUR-MESURE",
                    type: 'Pack Complet',
                    prix: 2899,
                    options: packComplet
                })
                setPack(3)
            }
        } else {
            setPack(null)
            setPackSelect({})
        }

    }
    
    const handleCheck = (e, id, type) => {
        const isCheck = e.target.checked
        if (type === 'web') {
            if (isCheck) {
                setOptionsSelect([
                    ...optionsSelect,
                    optionsWeb[id]
                ])
            } else {
                //faire la fonction delete ICI
            }
        } else if (type === 'ui') {
            if (isCheck) {
                setOptionsSelectUI([
                    ...optionsSelectUI,
                    optionsUI[id]
                ])
            } else {
                //faire la fonction delete ICI
            }
        }
    }

    const handleHebergement = (hebergement) => {
        if (hebergement.id === hebergementSelect.id) {
            setHebergementSelect({})
        } else {
            setHebergementSelect(hebergement)
        }
    }
    
    const handlePrixHebergement = (e) => {
        if (hebergementSelect.id !== undefined) {
            const value = e.currentTarget.value
            setHebergementSelect({
                ...hebergementSelect,
                prix: value
            })
        }
    }
    const handleBdd = (bdd) => {
        if (bdd.id === bddSelect.id) {
            setBddSelect({})
        } else {
            setBddSelect(bdd)
        }
    }
    
    const handlePrixBdd = (e) => {
        if (bddSelect.id !== undefined) {
            const value = e.currentTarget.value
            setBddSelect({
                ...bddSelect,
                prix: value
            })
        }
    }
    
    return (
        <>
            <form className='wrap-form' onSubmit={handleSubmit}>
                <h3>INFORMATIONS</h3>
                <div className='container-form'>
                    <div className='container-infosdevis'>

                        <InputText placeholder='ID' label='ID :' name='id' value={infos.id} onChange={handleChange} />
                        <InputText placeholder='Date du devis' label='Date du devis :' name='date' value={infos.date} onChange={handleChange} />
                        <InputText placeholder='Note' label='Note :' name='note' value={infos.note} onChange={handleChange} />
                        <InputText placeholder='Ex: 0.4 pour 40%' label='Acompte :' name='acompte' value={infos.acompte} onChange={handleChange} />

                    </div>
                    <div>
                        <InputText placeholder="Nom de l'entreprise" label="Nom de l'entreprise" name='nomClient' value={infos.nomClient} onChange={handleChange} />
                        <InputText placeholder="Adresse de l'entreprise" label="Adresse de l'entreprise :" name='adresseClient' value={infos.adresseClient} onChange={handleChange} />
                        <InputText placeholder="Ville de l'entreprise" label="Ville de l'entreprise :" name='villeClient' value={infos.villeClient} onChange={handleChange} />
                        <InputText placeholder="CP de l'entreprise" label="CP de l'entreprise :" name='CPClient' value={infos.CPClient} onChange={handleChange} />
                    </div>
                </div>

                <h3>CHOIX DU PACK</h3>

                <div className="container-packs">
                    <div className={pack === 1 ? `pack select` : `pack`} onClick={() => handlePackSelect(1)}>
                        <h1>PACK ESSENTIEL</h1>
                    </div>
                    <div className={pack === 2 ? `pack select` : `pack`} onClick={() => handlePackSelect(2)}>
                        <h1>PACK STANDARD</h1>
                    </div>
                    <div className={pack === 3 ? `pack select` : `pack`} onClick={() => handlePackSelect(3)}>
                        <h1>PACK COMPLET</h1>
                    </div>
                </div>

                <h3>LES OPTIONS WEB</h3>

                <div className="container-options">
                    {
                        optionsWeb.map(option => {
                            return (
                                <div>
                                    <input onChange={e => handleCheck(e, option.id, 'web')} type="checkbox" name={option.id} />
                                    <label for={option.id}>{option.desc} ({option.prix})</label>
                                </div>
                            )
                        })
                    }

                </div>
                <h3>LES OPTIONS GRAPHIQUES</h3>

                <div className="container-options">
                    {
                        optionsUI.map(option => {
                            return (
                                <div>
                                    <input onChange={e => handleCheck(e, option.id, 'ui')} type="checkbox" name={option.id} />
                                    <label for={option.id}>{option.desc} ({option.prix})</label>
                                </div>
                            )
                        })
                    }

                </div>
                <h3>LES OPTIONS PERSONNALISÉES</h3>

                <div className="container-optionsPers">
                    <button onClick={handleAddOptions}>Ajouter une option</button>

                    {Object.keys(optionsPers).map((option, i) => {
                        return (
                            <div key={i} className="container">
                                <div className="row">
                                    <div className="col">
                                        <input
                                            placeholder="Désignation"
                                            type="text"
                                            name='description'
                                            value={optionsPers[option].desc}
                                            onChange={e => onHandleOptionsChange(e, optionsPers[option], "desc")} />
                                    </div>
                                    <div className="col">
                                        <input
                                            placeholder="Prix"
                                            type="text"
                                            name='montant'
                                            value={optionsPers[option].prix}
                                            onChange={e => onHandleOptionsChange(e, optionsPers[option], "prix")} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='container-hebergement-bdd'>
                    <div className="hebergement">
                        <h3>HÉBERGEMENT</h3>
                        {
                            hebergements.map(hebergement => {
                                return (
                                    <div key={hebergement.id}>
                                        <div className={hebergementSelect !== undefined && hebergementSelect.id  === hebergement.id ? `pack select` : `pack`} onClick={() => handleHebergement(hebergement)}>
                                            <h1>{hebergement.type}</h1>
                                        </div>
                                        <div>
                                            <input value={hebergementSelect.id === hebergement.id ? hebergementSelect.prix : hebergement.prix} type="range" step={10} name={hebergement.id} min={hebergement.min} max={hebergement.max}  onChange={handlePrixHebergement} />
                                            <label for={hebergement.id}> : {hebergementSelect.id === hebergement.id ? hebergementSelect.prix : hebergement.prix} €</label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="container-hebergement">
                        <h3>BASE DE DONNÉE</h3>
                        {
                            bdd.map(base => {
                                return (
                                    <div key={base.id}>
                                        <div className={bddSelect !== undefined && bddSelect.id  === base.id ? `pack select` : `pack`} onClick={() => handleBdd(base)}>
                                            <h1>{base.type}</h1>
                                        </div>
                                        <div>
                                            <input value={bddSelect.id === base.id ? bddSelect.prix : base.prix} type="range" step={10} name={base.id} min={base.min} max={base.max}  onChange={handlePrixBdd} />
                                            <label for={base.id}> : {bddSelect.id === base.id ? bddSelect.prix : base.prix} €</label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button onClick={() => renderPDFInDom(infos, packSelect, optionsSelect, optionsSelectUI, optionsPers, hebergementSelect, bddSelect, footer)}>Générer le Devis en PDF</button>
            </form>
        </>
    )
}
