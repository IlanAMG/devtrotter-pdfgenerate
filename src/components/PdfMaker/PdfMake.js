import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer'

import ReactDOM from 'react-dom';


const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },
    pdf: {
        flexDirection: 'column',
        margin: 20,
        fontSize: 15,
    },
    image: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    containerInfosDevis: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },  
    infosClient: {
        margin: 10,
        lineHeight: 1.5,
    },
    containerDevis: {
        marginBottom: 20
    },
    devis: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    produitsContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        width: '100%',
        height: 'auto'
    },
    titreContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    titreDesign: {
        fontSize: 12,
        borderBottomWidth: 1,
        width: '70%',
        padding: 3,
    },
    titrePrix: {
        fontSize: 12,
        borderBottomWidth: 1,
        width: '30%',
        padding: 3,
        textAlign: 'right',
    },
    listeContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#79777A',
        paddingBottom: 5,
    },
    optionsPack: {
        width: '100%',
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    ligneProduits: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
    },
    produitsDesign: {
        width: '60%',
        textAlign: 'left',
        padding: 3,
    },
    produitsPrix: {
        width: '40%',
        padding: 3,
        textAlign: 'right',
    },
    totalContainer: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '45%',
        alignSelf: 'flex-end',
    },
    totalContainerAcompte: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '45%',
        alignSelf: 'flex-end',
        marginTop: 20
    },
    titreTotalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        borderRightWidth: 1
    },
    resultTotalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    totalTitre: {
        textAlign: 'center',
        padding: 5,
        backgroundColor: '#151515',
        color: '#ffffff'
    },
    total: {
        textAlign: 'center',
        padding: 5,
    },
    footer: {
        width: '100%',
        backgroundColor: '#151515',
        padding: 8
    },

    footerLigne: {
        textAlign: 'center',
        fontSize: 10,
        color: '#ffffff'
    },
    noteContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '45%',
        alignSelf: 'flex-end',
        padding: 10,
        justifyContent: 'center',
    }
})

const calculPrix = (arr) => {
    const total = arr.map(option => {
        return (
            option.prix
        )
    })
    .reduce((acc, curr) => acc + curr, 0)
    return total
}

const totalHT = (packSelect, optionsSelect, optionsSelectUI, optionsPers, hebergementSelect, bddSelect) => {
    const prixOptionsSelect = calculPrix(optionsSelect)
    const prixOptionsSelectUI = calculPrix(optionsSelectUI)
    const prixOptionsSelectPers = Object.keys(optionsPers)
                                    .map(key => {
                                        const prix = parseFloat(optionsPers[key].prix, 10)
                                        return prix
                                    })
                                    .reduce((acc, curr) => acc + curr, 0)
    const prixHebergement = () => {
        if (hebergementSelect.prix !== undefined) {
            return parseFloat(hebergementSelect.prix, 10)
        } else {
            return 0
        }
    }
    const prixBdd = () => {
        if (bddSelect.prix !== undefined) {
            return parseFloat(bddSelect.prix, 10)
        } else {
            return 0
        }
    }
    const prixPack = () => {
        if (packSelect.prix !== undefined) {
            return packSelect.prix
        } else {
            return 0
        }
    }
    const total = prixPack() + prixOptionsSelect + prixOptionsSelectUI + prixOptionsSelectPers + prixHebergement() + prixBdd()
    return total.toFixed(2)
}

const calculAcompte = (prixTotal, acompte) => {
    if (acompte >= 0.1 && acompte <= 0.9) {
        return parseFloat(prixTotal * acompte, 10).toFixed(2) 
    } else {
        return parseFloat(prixTotal * 0.4, 10).toFixed(2) 
    }
}

const PdfMake = ({ infos, packSelect, optionsSelect, optionsSelectUI, optionsPers, hebergementSelect, bddSelect, footer }) => (
    <Document>
        <Page size='A4' style={styles.page}>
            <View style={styles.pdf}>
                <Image style={styles.image} src={require(`../../banniere.png`)} alt="image" />
                <View style={styles.containerInfosDevis}>
                    <View style={styles.containerDevis}>
                        <Text style={styles.devis}>DEVIS n°{infos.id}</Text>
                        <Text style={{color: '#79777A'}}>{infos.date}</Text>
                    </View>
                    <View style={styles.infosClient}>
                        <Text>{infos.nomClient}</Text>
                        <Text>{infos.adresseClient}</Text>
                        <Text>{infos.CPClient} {infos.villeClient}</Text>
                    </View>
                </View>

                <View style={styles.produitsContainer}>
                    <View style={styles.titreContainer}>
                        <View style={styles.titreDesign}>
                            <Text>Désignation</Text>
                        </View>
                        <View style={styles.titrePrix}>
                            <Text>Prix HT</Text>
                        </View>
                    </View>
                    { packSelect.titre &&
                        <View style={styles.listeContainer}>
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsDesign}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>{packSelect.titre}</Text>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>{packSelect.type}</Text>
                                </View>
                                <View style={styles.produitsPrix}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>{packSelect.prix} €</Text>
                                </View>
                            </View>
                            { packSelect.options.map(option => {
                                    return (
                                        <View style={styles.optionsPack}>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>- {option.desc}</Text>
                                        </View>
                                    )})
                            }
                        </View>
                    }
                    { optionsSelect[0] &&
                        <View style={styles.listeContainer}>
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsDesign}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>OPTIONS DÉVELOPPEMENT WEB</Text>
                                </View>
                            </View>
                            { optionsSelect.map(option => {
                                    return (
                                        <View style={styles.optionsPack}>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>- {option.desc} : OUI</Text>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>{option.prix} €</Text>
                                        </View>
                                    )})
                            }
                        </View>
                    }
                    { hebergementSelect.id !== undefined &&
                        <View style={styles.listeContainer}>
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsDesign}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>HÉBERGEMENT</Text>
                                </View>
                            </View>
                            <View style={styles.optionsPack}>    
                               <Text style={{fontSize: 10, color: '#79777A'}}>- Type : {hebergementSelect.type}</Text>
                               <Text style={{fontSize: 10, color: '#79777A'}}>{hebergementSelect.prix} €</Text>
                            </View>
                        </View>
                    }
                    { bddSelect.id !== undefined &&
                        <View style={styles.listeContainer}>
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsDesign}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>BASE DE DONNÉE</Text>
                                </View>
                            </View>
                            <View style={styles.optionsPack}>    
                               <Text style={{fontSize: 10, color: '#79777A'}}>- Type : {bddSelect.type}</Text>
                               <Text style={{fontSize: 10, color: '#79777A'}}>{bddSelect.prix} €</Text>
                            </View>
                        </View>
                    }
                    { optionsSelectUI[0] &&
                        <View style={styles.listeContainer}>
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsDesign}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>OPTIONS CRÉATION GRAPHIQUE | UX / UI DESIGN</Text>
                                </View>
                            </View>
                            { optionsSelectUI.map(option => {
                                    return (
                                        <View style={styles.optionsPack}>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>- {option.desc} : OUI</Text>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>{option.prix} €</Text>
                                        </View>
                                    )})
                            }
                        </View>
                    }
                    { Object.keys(optionsPers)[0] &&
                        <View style={styles.listeContainer}>
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsDesign}>
                                    <Text style={{fontSize: 11, color: '#79777A'}}>OPTIONS PERSONNALIÉES</Text>
                                </View>
                            </View>
                            { Object.keys(optionsPers).map(key => {
                                    return (
                                        <View style={styles.optionsPack}>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>- {optionsPers[key].desc}</Text>
                                            <Text style={{fontSize: 10, color: '#79777A'}}>{optionsPers[key].prix} €</Text>
                                        </View>
                                    )})
                            }
                        </View>
                    }
                </View>
                   
                <View style={styles.totalContainerAcompte}>
                    <View style={styles.titreTotalContainer}>
                        <Text style={styles.totalTitre}>Acompte {infos.acompte === null ? '40%' : infos.acompte * 100 + '%'}</Text>
                    </View>
                    <View style={styles.resultTotalContainer}>
                        <Text style={styles.total}>{calculAcompte(totalHT(packSelect, optionsSelect, optionsSelectUI, optionsPers, hebergementSelect, bddSelect), infos.acompte)} €</Text>
                    </View>
                </View>
                <View style={styles.totalContainer}>
                    <View style={styles.titreTotalContainer}>
                        <Text style={styles.totalTitre}>Total HT</Text>
                    </View>
                    <View style={styles.resultTotalContainer}>
                        <Text style={styles.total}>{totalHT(packSelect, optionsSelect, optionsSelectUI, optionsPers, hebergementSelect, bddSelect)} €</Text>
                    </View>
                </View>
                <View style={styles.noteContainer}>
                    <Text>{infos.note}</Text>
                </View>
     
            </View>
            <View style={styles.footer}>
                {Object.keys(footer).map(key => (
                    <Text style={styles.footerLigne}>{footer[key]}</Text>
                ))}
            </View>
        </Page>
    </Document>
)

export const renderPDFInDom = (infos, packSelect, optionsSelect, optionsSelectUI, optionsPers, hebergementSelect, bddSelect, footer) => {
    const Wrapper = () => (
        <PDFViewer>
            <PdfMake 
            infos={infos} 
            packSelect={packSelect}
            optionsSelect={optionsSelect}
            optionsSelectUI={optionsSelectUI}
            optionsPers={optionsPers}
            hebergementSelect={hebergementSelect}
            bddSelect={bddSelect}
            footer={footer} />
        </PDFViewer>
    )
    ReactDOM.render(<Wrapper />, document.getElementById('pdf'));
}

