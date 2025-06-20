// continentData.ts

// A type for the individual continents
export type Continent = "africa" | "europe" | "asia" | "namerica" | "samerica" | "australia";

// A new type that includes all possible selections: a continent OR "world"
export type Selection = Continent | "world";

// A type for a single timeline entry
export type TimelineEntry = { date: string; description: string };

// Update the record key to be the new `Selection` type
export const continentDisplayNames: Record<Selection, string> = {
  africa: "Africa",
  europe: "Europe",
  asia: "Asia",
  namerica: "North America",
  samerica: "South America",
  australia: "Australia",
  world: "Organisations Mondiales",
};

// Update the record key to be the new `Selection` type
export const continentTimelines: Record<Selection, TimelineEntry[]> = {
  africa: [
    {
      date: "1991",
      description: "Traité d'Abuja: Signé, il établit la Communauté économique africaine et jette les bases d'une coopération future, y compris sur les questions environnementales liées au développement.",
    },
    {
      date: "2001",
      description: "Nouveau partenariat pour le développement de l'Afrique (NEPAD): Lancé, il inclut une initiative sur l'environnement visant à lutter contre la dégradation des terres et à promouvoir une gestion durable des ressources.",
    },
    {
      date: "2021",
      description: "Afrique du Sud: La réglementation sur la Responsabilité Élargie des Producteurs (REP) entre en vigueur, rendant les producteurs responsables de la fin de vie de leurs produits.",
    },
    {
      date: "2021-2024",
      description: "Afrique du Sud: Bannissement de l'e-waste en décharge (2021) et plan cible de 61 000 tonnes collectées en 2024. Près de 68 000 tonnes ont été détournées de la décharge grâce aux schémas de REP.",
    },
    {
      date: "2022",
      description: "Nigeria: Règlementation du secteur EE (EE-Sector) imposant l'enregistrement des producteurs et des seuils pour les substances dangereuses comme le plomb ($Pb<0,1\\%$).",
    },
    {
      date: "2023",
      description: "Rwanda: Adoption de la politique nationale sur les déchets électroniques (e-waste) et développement de l'éco-parc Enviroserve à Kigali pour la collecte et le traitement formel.",
    },
    {
      date: "2023-2025",
      description: "Afrique du Sud: La REP pour l'électronique oblige les fabricants/importateurs à publier des plans d'écoconception et d'atteindre des taux de recyclabilité.",
    },
    {
      date: "2024",
      description: "Loi sud-africaine sur le climat: Instauration de budgets carbone sectoriels contraignants, obligeant les opérateurs de data centers à soumettre des plans de réduction d'émissions.",
    },
    {
      date: "2025",
      description: "RDC: Le décret cobalt crée des zones d'exploitation artisanale (ASM) encadrées par l'Entreprise générale du cobalt (EGC) et impose la traçabilité.",
    },
    {
      date: "Février 2025",
      description: "Plan net-zéro shipping (IMO/UA): Adoption d'une feuille de route pour aligner les ports africains sur la stratégie de l'Organisation Maritime Internationale.",
    },
  ],
  europe: [
    {
      date: "1990",
      description: "Règlement créant l'Agence Européenne pour l'Environnement (AEE): Elle devient opérationnelle en 1994, avec pour mission de fournir des informations indépendantes sur l'état de l'environnement.",
    },
    {
      date: "1992",
      description: "Directive \"Habitats\": Vise à établir un réseau européen cohérent d'espaces protégés, le réseau Natura 2000, financé par l'instrument LIFE.",
    },
    {
      date: "2002",
      description: "L'UE ratifie le Protocole de Kyoto, s'engageant à réduire ses émissions de gaz à effet de serre.",
    },
    {
      date: "2003",
      description: "Directive RoHS (Restriction of Hazardous Substances): Adoptée, elle vise à limiter l'utilisation de substances dangereuses (plomb, mercure, etc.) dans les équipements électriques et électroniques. Elle est entrée en vigueur le 1er juillet 2006.",
    },
    {
      date: "2005",
      description: "Lancement du système d'échange de quotas d'émission de l'UE (EU ETS), le premier marché du carbone au monde.",
    },
    {
      date: "2023",
      description: "France: La loi \"Industrie Verte\", adoptée le 24 octobre 2023, vise à décarboner l'industrie existante et à créer de nouvelles filières (batteries, hydrogène) via un crédit d'impôt \"Investissements Industrie Verte\" (C3IV).",
    },
    {
      date: "Avril 2024",
      description: "Règlement sur les infrastructures pour carburants alternatifs (AFIR): Impose des bornes de recharge ultra-rapide (350 kW) pour les véhicules légers tous les 60 km sur le réseau de transport transeuropéen (TEN-T).",
    },
    {
      date: "Mai 2024",
      description: "UE - Corporate Sustainability Due Diligence Directive (CSDDD): Approuvée par le Conseil, cette directive impose aux grandes entreprises un devoir de diligence pour identifier et gérer les impacts négatifs sur les droits humains et l'environnement dans leurs opérations et chaînes d'activités.",
    },
    {
      date: "Mai 2024",
      description: "Critical Raw Materials Act (CRMA): Fixe des objectifs contraignants pour extraire (10%), affiner (40%) et recycler (25%) les métaux critiques de l'UE d'ici 2030, et diversifier les chaînes d'approvisionnement.",
    },
    {
      date: "2024",
      description: "Directive Emissions industrielles révisée: Intègre le secteur des semi-conducteurs, qui doit déclarer annuellement ses consommations d'eau et émissions.",
    },
    {
      date: "2024",
      description: "WEEE Directive: Nouvelle feuille de route pour augmenter le réemploi à 30% des DEEE légers collectés.",
    },
    {
      date: "Mars 2025",
      description: "Restriction PFAS: L'ECHA examine un projet visant à bannir les solvants fluorés (\"forever chemicals\") utilisés dans la fabrication de puces électroniques.",
    },
    {
      date: "2025",
      description: "FuelEU Maritime: Impose une réduction de l'intensité des gaz à effet de serre des carburants maritimes de 2% dès 2025, pour atteindre -80% en 2050.",
    },
    {
      date: "2026",
      description: "France: Objectif d'intégrer des considérations environnementales dans tous les contrats d'achat public.",
    },
    {
      date: "Juillet 2026",
      description: "Directive \"Right-to-Repair\": Oblige les vendeurs à proposer une réparation à un coût \"raisonnable\" jusqu'à 10 ans après l'achat et crée un portail européen de pièces détachées.",
    },
    {
      date: "2027",
      description: "Passeport Numérique de Produit (Digital Product Passport): Deviendra obligatoire progressivement à partir de 2027, en commençant par les batteries, pour tracer le cycle de vie des produits et favoriser l'économie circulaire.",
    },
    {
      date: "2027",
      description: "Règlement Ecodesign for Sustainable Products (ESPR): Introduction d'un passeport numérique pour les smartphones et serveurs, détaillant leur composition et leur réparabilité.",
    },
    {
      date: "Février 2027",
      description: "Règlement sur les batteries: Exige que les batteries soient amovibles dans tous les appareils portables et impose un contenu recyclé minimum pour le nickel (16%) et le cobalt (12%).",
    },
    {
      date: "2030-2040",
      description: "Nouvelle norme CO2 pour les poids lourds: Vise une réduction des émissions de 45% en 2030 et 90% en 2040.",
    },
  ],
  asia: [
    {
      date: "Années 1990",
      description: "Japon: Le pays devient un leader en matière de législation sur le recyclage des appareils ménagers, préfigurant des lois plus complètes sur les déchets électroniques.",
    },
    {
      date: "2007",
      description: "Corée du Sud: La loi sur le recyclage des ressources d'équipements électriques et électroniques et de véhicules entre en vigueur, introduisant un système de REP.",
    },
    {
      date: "2008",
      description: "Chine: Promulgation de la loi sur la promotion de l'économie circulaire, qui fournit un cadre pour améliorer l'efficacité des ressources.",
    },
    {
      date: "2022-2028",
      description: "Inde: Les E-Waste Rules 2022 instaurent une REP avec des cibles de collecte croissantes, de 60% en 2025 à 80% en 2028.",
    },
    {
      date: "2023",
      description: "Japon: Révision de la loi \"Home Appliance Recycling\" qui vise un taux de récupération de 74% pour plusieurs types d'appareils.",
    },
    {
      date: "2023-2025",
      description: "Chine: Plan \"Green DC\" qui impose aux data centers un PUE (Power Usage Effectiveness) moyen inférieur à 1,5 et un taux de recyclage de la chaleur d'au moins 30%.",
    },
    {
      date: "2024",
      description: "Indonésie: Reconduction du bannissement des exportations de minerai de nickel brut pour favoriser le raffinage local.",
    },
    {
      date: "2024",
      description: "Chine: Stratégie sur les gaz fluorés (F-Gases) qui impose des quotas et une obligation de réduction de 90% de ces gaz à fort effet de serre dans les usines de semi-conducteurs.",
    },
    {
      date: "2024",
      description: "Japon: La loi sur la circulation des ressources (Resource Circulation Act) impose un score de démontabilité pour les ordinateurs et téléphones.",
    },
    {
      date: "Octobre 2024",
      description: "Chine: Le règlement sur la gestion des terres rares instaure des quotas d'extraction et interdit l'exportation de concentrés à faible teneur.",
    },
    {
      date: "Mars 2025",
      description: "Singapour: Mise en place de la première norme locale pour le soutage de méthanol, visant à sécuriser les flux de carburant vert pour le transport maritime.",
    },
    {
      date: "2025",
      description: "Chine: Annonce d'un objectif de réduire le PUE des grands data centers à 1,25 d'ici fin 2025.",
    },
    {
      date: "2025",
      description: "Taïwan: Fixe un objectif de 30% d'eau de process issue du recyclage interne dans les usines de semi-conducteurs.",
    },
    {
      date: "2027",
      description: "Inde: Le guide du Bureau of Energy Efficiency (BEE) vise un PUE national inférieur à 1,5 dans les data centers publics et bancaires.",
    },
  ],
  namerica: [
    {
      date: "1990",
      description: "États-Unis: Le Clean Air Act est révisé de manière significative, introduisant de nouvelles normes réglementaires pour contrôler les pluies acides et les émissions de polluants atmosphériques toxiques.",
    },
    {
      date: "1992",
      description: "États-Unis: Création du programme volontaire ENERGY STAR par l'EPA pour identifier et promouvoir les produits écoénergétiques, en commençant par les ordinateurs et les moniteurs.",
    },
    {
      date: "2003",
      description: "Californie: Le \"Electronic Waste Recycling Act\" est la première loi aux États-Unis à établir un programme de financement pour le recyclage des déchets électroniques.",
    },
    {
      date: "2009",
      description: "États-Unis: Le Congrès vote le \"Clean Energy and Security Act\", qui inclut des dispositions pour une réduction des gaz à effet de serre.",
    },
    {
      date: "2022",
      description: "Canada: Le budget fédéral alloue jusqu'à 3,8 milliards de dollars sur 8 ans pour soutenir la mise en œuvre de la Stratégie canadienne sur les minéraux critiques.",
    },
    {
      date: "Janvier 2024",
      description: "États-Unis: L'EPA exige une pré-autorisation pour toute relance de PFAS \"inactifs\" dans les procédés de fabrication de puces.",
    },
    {
      date: "Décembre 2024",
      description: "Executive Order de Biden: Offre un accès prioritaire à des terrains fédéraux pour les data centers qui financent une production d'énergie renouvelable équivalente à leur consommation.",
    },
    {
      date: "2024",
      description: "Canada: La vague 2024 de la REP obligatoire s'étend à de nouvelles provinces comme l'Ontario, incluant les petits appareils électroniques et les batteries portables.",
    },
    {
      date: "2024-2027",
      description: "États-Unis - Inflation Reduction Act: Le crédit d'impôt pour les véhicules électriques est conditionné à un pourcentage croissant (50% en 2024, 80% en 2027) de minéraux extraits ou raffinés localement ou chez des partenaires.",
    },
    {
      date: "2024-2035",
      description: "California Air Resources Board (CARB): Impose que seuls des camions zéro-émission soient enregistrables dans les ports dès 2024, avec un objectif de flotte 100% zéro-émission en 2035.",
    },
    {
      date: "2025",
      description: "Canada: La Stratégie des minéraux critiques alloue des fonds, comme le Critical Minerals Infrastructure Fund (CMIF) doté de 1,5 milliard de dollars jusqu'en 2030, pour financer des projets d'infrastructures énergétiques et de transport.",
    },
    {
      date: "2027-2032",
      description: "États-Unis: Les standards \"Phase 3\" de l'EPA visent une réduction de 50% des émissions de GES pour les camions les plus lourds.",
    },
    {
      date: "2030",
      description: "États-Unis: La stratégie nationale sur les DEEE vise à quadrupler la capacité de recyclage certifié d'ici 2030.",
    },
    {
      date: "2030-2050",
      description: "SAF Grand Challenge: Objectif de production de 3 milliards de gallons de carburants d'aviation durables (SAF) par an d'ici 2030, et 35 milliards d'ici 2050.",
    },
  ],
  samerica: [
    {
      date: "Années 2000",
      description: "Plusieurs pays, dont l'Argentine, le Brésil et la Colombie, commencent à développer des réglementations nationales sur la gestion des déchets dangereux, qui incluent progressivement les déchets électroniques.",
    },
    {
      date: "2009",
      description: "Brésil: La Politique Nationale sur les Déchets Solides est établie, introduisant la responsabilité partagée et la logistique inverse pour plusieurs types de produits, y compris les électroniques.",
    },
    {
      date: "2023",
      description: "Chili: La loi 20.920 et le décret n°12 instaurent la REP avec un objectif de collecte de 45% des EEE en 2030 et un registre public des producteurs.",
    },
    {
      date: "2024",
      description: "Chili: Instauration d'une nouvelle redevance progressive sur le lithium et renforcement des pouvoirs du régulateur (SMA) pour suspendre les pompages en cas de dépassement des seuils hydrogéologiques.",
    },
    {
      date: "2024",
      description: "Brésil: Le décret sur la logistique inverse (11 413/2024) met en place une plateforme de traçabilité des flux de déchets (\"Recircula Brasil\").",
    },
    {
      date: "Mars 2024",
      description: "Chili: Annonce de la création d'un réseau de salars protégés dans le cadre de la Stratégie Nationale du Lithium.",
    },
    {
      date: "Juin 2025",
      description: "Pérou: Prolongation du programme de formalisation des mines artisanales, avec un futur texte qui intégrera des obligations environnementales minimales.",
    },
    {
      date: "2030",
      description: "Chili: Le plan national pour les data centers fixe comme critère un PUE inférieur ou égal à 1,3 et 60% d'électricité renouvelable dès l'entrée en service.",
    },
    {
      date: "2034",
      description: "Brésil: Le programme RenovaBio impose des quotas aux distributeurs de carburants pour réduire l'intensité carbone de 11,4% d'ici 2034.",
    },
    {
      date: "2045",
      description: "Chili: La stratégie d'électromobilité vise 100% des ventes de camions lourds à être zéro-émission en 2045.",
    },
  ],
  australia: [
    {
      date: "1999",
      description: "Adoption de l'Environment Protection and Biodiversity Conservation Act (EPBC Act), la principale loi-cadre environnementale fédérale du pays.",
    },
    {
      date: "2011",
      description: "Le Product Stewardship Act entre en vigueur, fournissant le cadre pour la création de programmes de recyclage nationaux, y compris pour la télévision et les ordinateurs (NTCRS).",
    },
    {
      date: "2021",
      description: "Product Stewardship Act 2021: Impose une obligation de reprise pour les télévisions et ordinateurs.",
    },
    {
      date: "2024",
      description: "Blueprint for a Maritime Nation 2024: Feuille de route pour des corridors maritimes verts entre l'Australie et l'Asie.",
    },
    {
      date: "Décembre 2024",
      description: "PFAS NEMP 3.0: Définit des seuils pour les PFAS dans l'environnement et un plan de substitution dans les chaînes d'approvisionnement électroniques d'ici 2028.",
    },
    {
      date: "2025",
      description: "Réforme de la loi EPBC: Création d'une Agence fédérale indépendante pour l'environnement et introduction de standards de \"non-perte nette\" de biodiversité.",
    },
    {
      date: "Juillet 2025",
      description: "Interdiction des produits contenant des PFOS/PFOA/PFHxS, incluant les solvants et mousses anti-incendie.",
    },
    {
      date: "Juillet 2025",
      description: "NABERS DC v4: Le score d'efficacité pour les data centers inclut une méthodologie d'émission horaire; le gouvernement exige un score minimal de 5 étoiles pour l'hébergement des données fédérales.",
    },
    {
      date: "2027",
      description: "National Television and Computer Recycling Scheme (NTCRS): Vise un objectif de 80% de valorisation matière pour les TV et PC. Le programme a permis de recycler environ 184 500 tonnes de déchets électroniques depuis 2012.",
    },
  ],
  world: [
    {
      date: "1992",
      description: "Sommet de la Terre à Rio: Adoption de la Convention-cadre des Nations Unies sur les changements climatiques (CCNUCC) et du programme Action 21, qui pose les bases du développement durable.",
    },
    {
      date: "1997",
      description: "Protocole de Kyoto: Adopté, c'est le premier accord international à fixer des objectifs contraignants de réduction des émissions de gaz à effet de serre pour les pays industrialisés.",
    },
    {
      date: "2001",
      description: "Convention de Stockholm: Signée, elle vise à éliminer ou à restreindre la production et l'utilisation des polluants organiques persistants (POP), dont certains sont utilisés dans l'industrie électronique.",
    },
    {
      date: "2021",
      description: "UNESCO: Adoption de la Recommandation sur l'éthique de l'intelligence artificielle, qui inclut des domaines d'action politique sur l'environnement et les écosystèmes.",
    },
    {
      date: "2023",
      description: "ICMM Mining Principles: Les grands groupes miniers s'engagent sur 39 exigences ESG, incluant le calcul et la réduction des émissions de Scope 3.",
    },
    {
      date: "EITI Standard 2023",
      description: "Oblige les 57 pays membres à divulguer les impacts environnementaux et les revenus miniers, sous contrôle citoyen.",
    },
    {
      date: "2024",
      description: "OCDE - Guide de diligence raisonnée: Version renforcée qui détaille une procédure en 5 étapes pour gérer les risques ESG dans les chaînes d'approvisionnement minérales.",
    },
    {
      date: "2024",
      description: "Minamata Convention: Révisions pour renforcer les plans nationaux visant à éliminer l'usage du mercure dans l'orpaillage artisanal.",
    },
    {
      date: "2024",
      description: "Global Battery Alliance - Battery Passport (V2): Définit les règles pour un passeport numérique assurant la traçabilité du CO2, de l'origine des métaux, des droits du travail et des impacts sur les peuples autochtones via des indicateurs de performance clés.",
    },
    {
      date: "Janvier 2025",
      description: "Amendements \"e-waste\" de la Convention de Bâle: Étend la procédure de consentement préalable en connaissance de cause (PIC) à tous les déchets électroniques, même non-dangereux, pour éviter le recyclage sauvage.",
    },
    {
      date: "Consultation 2025",
      description: "IRMA Standard 2.0: Standard de certification de mine par mine avec plus de 400 critères \"best-in-class\" sur l'eau, le climat, la biodiversité et les droits humains.",
    },
  ],
};