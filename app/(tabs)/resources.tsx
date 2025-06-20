import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Base de données des ressources ---
// Chaque ressource a un titre, une description et une URL.
const resourcesData = [
    {
        category: 'Organisations et Initiatives',
        links: [
            {
                title: 'Union Internationale des Télécommunications (UIT)',
                description: 'L\'agence des Nations Unies pour les technologies de l\'information et de la communication. Explorez son histoire et ses actions pour un numérique vert.',
                url: 'https://www.itu.int/fr/history/Pages/ITUsHistory.aspx',
            },
            {
                title: 'Alliance Green IT (AGIT)',
                description: 'Une alliance d\'acteurs engagés pour un numérique plus responsable en France et à l\'international avec Green IT Global.',
                url: 'https://alliancegreenit.org/green-it-global',
            },
            {
                title: 'ADEME - L\'Agence de la transition écologique',
                description: 'L\'histoire et les missions de l\'agence française qui œuvre pour la transition écologique dans tous les secteurs, y compris le numérique.',
                url: 'https://www.ademe.fr/lagence/notre-histoire/',
            },
            {
                title: 'The Shift Project',
                description: 'Un think tank français qui œuvre en faveur d’une économie libérée de la contrainte carbone. Leurs rapports sur la sobriété numérique sont une référence.',
                url: 'https://theshiftproject.org/',
            },
            {
                title: 'Institut du Numérique Responsable (INR)',
                description: 'Association française qui vise à promouvoir les bonnes pratiques du numérique responsable auprès des organisations.',
                url: 'https://institutnr.org/',
            },
        ],
    },
    {
        category: 'Rapports et Études',
        links: [
            {
                title: 'Baromètre Green IT 2025 - Alliance Green IT',
                description: 'L\'étude de référence annuelle sur les pratiques et la maturité des entreprises en matière de numérique responsable.',
                url: 'https://alliancegreenit.org/2025-barometre-green-it',
            },
            {
                title: 'Empreinte environnementale du numérique - ARCEP',
                description: 'Les enquêtes annuelles de l\'ARCEP pour mesurer l\'impact du numérique en France (terminaux, réseaux, data centers).',
                url: 'https://www.arcep.fr/la-regulation/grands-dossiers-thematiques-transverses/lempreinte-environnementale-du-numerique.html',
            },
            {
                title: 'Top 10 des organisations pour les technologies vertes',
                description: 'Un aperçu (en anglais) des organisations qui mènent la charge en faveur des technologies vertes à l\'échelle mondiale.',
                url: 'https://renewableai.org/community/top-10-organizations-advocating-for-green-technology/',
            }
        ],
    },
    {
        category: 'Articles et Actualités',
        links: [
            {
                title: 'Action numérique verte post-COP29 - ITU',
                description: 'Comment les pays et organisations intensifient leurs actions pour le climat grâce aux technologies numériques suite à la COP29.',
                url: 'https://www.itu.int/fr/mediacentre/Pages/MA-2024-11-15-green-digital-action-cop29-climate-crisis.aspx',
            },
            {
                title: 'Baromètre Green IT : 39% des entreprises ont un responsable Green IT',
                description: 'Un article analysant la progression du Green IT dans les entreprises françaises et la création de postes dédiés.',
                url: 'https://www.channelbiz.fr/2025/03/17/39-des-entreprises-en-france-disposent-dun-responsable-green-it/',
            },
        ],
    },
];

// --- Composant pour un lien cliquable ---
const ResourceLink = ({ title, description, url }) => (
    <TouchableOpacity style={styles.linkContainer} onPress={() => Linking.openURL(url)}>
        <Text style={styles.linkTitle}>{title}</Text>
        <Text style={styles.linkDescription}>{description}</Text>
        <Text style={styles.linkUrl}>Visiter →</Text>
    </TouchableOpacity>
);

export default function ResourcesScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Ressources</Text>
                <Text style={styles.subtitle}>Explorez ces liens pour approfondir vos connaissances sur le numérique responsable.</Text>
                
                {resourcesData.map((categoryItem, index) => (
                    <View key={index} style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{categoryItem.category}</Text>
                        {categoryItem.links.map((link, linkIndex) => (
                            <ResourceLink
                                key={linkIndex}
                                title={link.title}
                                description={link.description}
                                url={link.url}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282929',
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 30,
    },
    categoryContainer: {
        marginBottom: 24,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gold',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'gold',
        paddingBottom: 8,
    },
    linkContainer: {
        backgroundColor: '#3A3B3B',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
    },
    linkTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    linkDescription: {
        fontSize: 14,
        color: '#ddd',
        marginTop: 8,
        lineHeight: 20,
    },
    linkUrl: {
        fontSize: 14,
        color: 'gold',
        marginTop: 12,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});
