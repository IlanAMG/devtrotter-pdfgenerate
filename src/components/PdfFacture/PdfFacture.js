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
        width: 250,
        maxHeight: 200,
        alignSelf: 'center'
    },
    infosPerso: {
        margin: 20,
        lineHeight: 1.5
    },
    infosClient: {
        margin: 10,
        lineHeight: 1.5,
        alignSelf: "flex-end"
    },
    containerDevis: {
        marginTop: 20,
        marginBottom: 20
    },
    devis: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    produitsContainer: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        borderColor: '#000000',
        width: '100%',
        height: 'auto'
    },

    titreContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },

    titreProduits: {
        textAlign: 'center',
        fontSize: 18,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        width: '15%',
        padding: 3,
        backgroundColor: '#EAFFF7'
    },
    listeContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    ligneProduits: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    produitsKey: {
        width: '15%',
        textAlign: 'center',
        padding: 3,
    },
    titreDesign: {
        textAlign: 'center',
        fontSize: 18,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        width: '40%',
        padding: 3,
        backgroundColor: '#EAFFF7'
    },
    produitsDesign: {
        width: '40%',
        textAlign: 'center',
        padding: 3,
    },
    totalContainer: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '45%',
        alignSelf: 'flex-end',
        marginTop: 20,
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
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#EAFFF7'
    },
    total: {
        textAlign: 'center',
        borderBottomWidth: 1,
        padding: 5,
    },
    footer: {
        width: '100%',
        backgroundColor: '#EAFFF7',
        padding: 10
    },

    footerLigne: {
        textAlign: 'center',
        fontSize: 12
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

const totals = {
    totalHT: 0,
    totalTTC: 0,
    TVA: 0,
}

const totalTTC = (produits) => {
    const resultTotalTTC = Object.keys(produits)
    .map(key => {
        const montant = parseFloat(produits[key].montant, 10)
        const quantity = parseInt(produits[key].quantity, 10)
        const totalTTCproduit = (montant * quantity)
        return totalTTCproduit
    })
    .reduce((acc, curr) => acc + curr, 0)
    return totals.totalTTC = parseFloat(resultTotalTTC.toFixed(2))
}

const totalHT = (produits) => {
    const resultTotalHT = Object.keys(produits)
    .map(key => {
        const montant = parseFloat(produits[key].montant, 10)
        const quantity = parseInt(produits[key].quantity, 10)
        const taxe = parseFloat(produits[key].taxe, 10)
        const taxeTotal = (montant*quantity*taxe)
        const result = ((montant * quantity) - taxeTotal) //le total HT est calculé ici
        return result
    })
    .reduce((acc, curr) => acc + curr, 0)
    return totals.totalHT = parseFloat(resultTotalHT.toFixed(2))
}

const totalTVA = (produits) => {
    const resultTVA = Object.keys(produits)
    .map(key => {
        const montant = parseFloat(produits[key].montant, 10)
        const quantity = parseInt(produits[key].quantity, 10)
        const taxe = parseFloat(produits[key].taxe, 10)
        const taxeTotal = (montant*quantity*taxe)
        return taxeTotal
    })
    .reduce((acc, curr) => acc + curr, 0)
    return totals.TVA = parseFloat(resultTVA.toFixed(2))
}

const requireImg = (url) => {
    if (url === '') {
        return require(`../../logojeff.png`)
    } else {
        return url
    } 
}

const PdfFacture = ({ infos, produits, url, footer }) => (
    <Document>
        <Page size='A4' style={styles.page}>
            <View style={styles.pdf}>
                <Image style={styles.image} src={requireImg(url)} alt="image" />
                <View style={styles.infosPerso}>
                    <Text>{infos.title}</Text>
                    <Text>{infos.adresse}</Text>
                    <Text>{infos.CP} {infos.ville}</Text>
                </View>
                <View style={styles.infosClient}>
                    <Text>{infos.nomClient}</Text>
                    <Text>{infos.adresseClient}</Text>
                    <Text>{infos.CPClient} {infos.villeClient}</Text>
                </View>
                <View style={styles.containerDevis}>
                    <Text style={styles.devis}>FACTURE n°{infos.id}</Text>
                    <Text>{infos.date}</Text>
                </View>

                <View style={styles.produitsContainer}>
                    <View style={styles.titreContainer}>
                        <View style={styles.titreProduits}>
                            <Text>Quantité</Text>
                        </View>
                        <View style={styles.titreDesign}>
                            <Text>Désignation</Text>
                        </View>
                        <View style={styles.titreProduits}>
                            <Text>TVA</Text>
                        </View>
                        <View style={styles.titreProduits}>
                            <Text>TTC /u</Text>
                        </View>
                        <View style={styles.titreProduits}>
                            <Text>TTC Total</Text>
                        </View>
                    </View>

                    <View style={styles.listeContainer}>
                        {Object.keys(produits).map((key) => (
                            <View style={styles.ligneProduits}>
                                <View style={styles.produitsKey}>
                                    <Text>{produits[key].quantity}</Text>
                                </View>
                                <View style={styles.produitsDesign}>
                                    <Text>{produits[key].description} </Text>
                                </View>
                                <View style={styles.produitsKey}>
                                    <Text>{parseFloat(produits[key].taxe) * 100}%</Text>
                                </View>
                                <View style={styles.produitsKey}>
                                    <Text>{produits[key].montant} €</Text>
                                </View>
                                <View style={styles.produitsKey}>
                                    <Text>{parseFloat(produits[key].quantity * produits[key].montant)} €</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                   
                <View style={styles.totalContainer}>
                    <View style={styles.titreTotalContainer}>
                        <Text style={styles.totalTitre}>Total TVA</Text>
                        <Text style={styles.totalTitre}>Total HT</Text>
                        <Text style={styles.totalTitre}>Total TTC</Text>
                    </View>
                    <View style={styles.resultTotalContainer}>
                        <Text style={styles.total}>{totalTVA(produits)} €</Text>
                        <Text style={styles.total}>{totalHT(produits)} €</Text>
                        <Text style={styles.total}>{totalTTC(produits)} €</Text>
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

export const renderPDFInDomFact = (infos, produits, url, footer) => {
    const Wrapper = () => (
        <PDFViewer>
            <PdfFacture footer={footer} url={url} infos={infos} produits={produits} />
        </PDFViewer>
    )
    ReactDOM.render(<Wrapper />, document.getElementById('pdf'));
}

