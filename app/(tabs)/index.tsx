import WorldMap from "@/assets/svgs/world_map";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Continent = "africa" | "europe" | "asia" | "namerica" | "samerica" | "australia";

const continentDisplayNames: Record<Continent, string> = {
  africa: "Africa",
  europe: "Europe",
  asia: "Asia",
  namerica: "North America",
  samerica: "South America",
  australia: "Australia",
};

export default function Index() {
  const [activeContinent, setActiveContinent] = useState<Continent | null>(null);

  // Shared values for continent fills
  const animValues = {
    africa: useSharedValue(0),
    europe: useSharedValue(0),
    asia: useSharedValue(0),
    namerica: useSharedValue(0),
    samerica: useSharedValue(0),
    australia: useSharedValue(0),
  };

  // Shared values for label animation
  const labelOpacity = useSharedValue(0);
  const labelTranslateY = useSharedValue(10);

  // Shared values for map animation on mount
  const mapOpacity = useSharedValue(0);
  const mapTranslateY = useSharedValue(20);
  const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(25);

  // Helper to create fill animated props for a continent
  const createFillProps = (sharedValue: Animated.SharedValue<number>) =>
    useAnimatedProps(() => ({
      fill: interpolateColor(sharedValue.value, [0, 1], ["#ccc9be", "gold"]),
    }));

  // Create fill props for all continents
  const continentFills = {
    africa: createFillProps(animValues.africa),
    europe: createFillProps(animValues.europe),
    asia: createFillProps(animValues.asia),
    namerica: createFillProps(animValues.namerica),
    samerica: createFillProps(animValues.samerica),
    australia: createFillProps(animValues.australia),
  };

  type TimelineEntry = { date: string; description: string };
  type ContinentTimeline = Record<Continent, TimelineEntry[]>;

  const continentTimelines: ContinentTimeline = {
  africa: [
    {
      date: "1865",
      description: "Création de l'Union Internationale des Télécommunications (UIT) à Paris.",
    },
    {
      date: "1932",
      description: "L'UIT adopte son nom actuel après l'évolution vers le téléphone.",
    },
    {
      date: "1947",
      description: "L'UIT rejoint les Nations Unies.",
    },
    {
      date: "4 avril 2017",
      description: "Réunion de lancement de Green IT Global à Amsterdam.",
    },
    {
      date: "14 juin 2017",
      description: "Publication du manifeste Green IT Global au Science Park.",
    },
  ],
  europe: [
    { date: "2020", description: "EU Green Deal launched, focusing on digital sustainability." },
  ],
  asia: [
    { date: "2015", description: "China launches Green Computing Initiative." },
  ],
  namerica: [
    { date: "2011", description: "US announces Federal Data Center Consolidation Initiative." },
  ],
  samerica: [
    { date: "2018", description: "Brazil introduces national green IT framework." },
  ],
  australia: [
    { date: "2019", description: "Australia sets ICT Sustainability Plan 2020." },
  ],
};
 const continentMessages: Record<Continent, string> = {
  africa: "Welcome to Africa – land of vibrant cultures!De nombreux organismes existe comme-	Green IT Global : Un réseau européen à but non lucratif d’organisations axées sur linformatique verte. Afin de mener ce combat plus efficacement, Green IT Amsterdam (Pays-Bas), Sustainability for London (Royaume-Uni), Green IT SIG (Suisse) et Alliance Green IT (France) ont exploré la possibilité d’une approche plus structurelle qui a été réunie lors d’une réunion de lancement le 4 avril 2017 au campus Science Park à Amsterdam.Le 14 juin 2017 le réseau a publié son manifeste définissant ses ambitions et sa vision qui vous pouvez retrouver ici. Définition de ce qu’ils font / Les actions qu’ils ont déjà menées et les pays qui le constitu-	Union Internationale des Télécommunications (UIT) : Depuis 1865, soit un siècle et demi, l'Union internationale des télécommunications (UIT) est au centre des progrès effectués en matière de communications - de la télégraphie au monde moderne des satellites, des téléphones mobiles et de l'Internet. Elle a été fondée à Paris sous le nom initial d'Union Internationale du Télégraphe mais avec le développement du téléphone, elle a adopté son nom actuel en 1932. Elle a intégré les Nations Unies en 1947",
  europe: "Europe – rich history and modern elegance!",
  asia: "Asia – diverse traditions and rapid innovation!",
  namerica: "North America – land of dreams and diversity!",
  samerica: "South America – wild landscapes and spirited people!",
  australia: "Australia – adventure from outback to reef!",
};

  // Animate label style
  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  // Animate map style on mount
  const animatedMapStyle = useAnimatedStyle(() => ({
    opacity: mapOpacity.value,
    transform: [{ translateY: mapTranslateY.value }],
  }));

  // On mount animate map
  useEffect(() => {
    mapOpacity.value = withTiming(1, { duration: 2000 });
    mapTranslateY.value = withTiming(0, { duration: 2000 });
  }, []);

  // Toggle continent selection and animations
  const toggleContinent = (continent: Continent) => {
  const isActive = activeContinent === continent;

    if (isActive) {
      animValues[continent].value = withTiming(0, { duration: 500 });
      labelOpacity.value = withTiming(0, { duration: 300 });
      labelTranslateY.value = withTiming(10, { duration: 300 });
      setActiveContinent(null);
    } else {
      // Animate selected continent to 1, others to 0
      (Object.keys(animValues) as Continent[]).forEach((key) => {
        animValues[key].value = withTiming(key === continent ? 1 : 0, { duration: 500 });
      });
      labelOpacity.value = withTiming(1, { duration: 500 });
      labelTranslateY.value = withTiming(0, { duration: 500 });
      setActiveContinent(continent);
    }
  };

  return (

  <SafeAreaView style={{ flex: 1, backgroundColor: "#282929" }}>
     <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
<View style={styles.header}>
  <View style={{ width: '100%' }}>
  <Text style={styles.accueil}>Accueil</Text>
</View>
  <Text style={styles.title}>Green IT et politiques publiques : que font les États ?</Text>
</View>

    <Animated.View style={[styles.container, animatedMapStyle]}>
      <WorldMap
        continents={Object.keys(animValues) as Continent[]}
        continentColors={continentFills}
        onContinentPress={toggleContinent}
      />
    </Animated.View>

    {activeContinent && (
      <>
        <Animated.View style={[styles.labelContainer, animatedLabelStyle]}>
          <Text style={styles.labelText}>
            {continentDisplayNames[activeContinent].toUpperCase()}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.scrollContainer, animatedLabelStyle]}>
          {continentTimelines[activeContinent].map((entry, index) => (
  <View key={index} style={styles.timelineItem}>
    <View style={styles.timelineDot} />
    <Text style={styles.timelineDate}>{entry.date}</Text>
    <Text style={styles.timelineDescription}>{entry.description}</Text>
  </View>
))}
        </Animated.View>
      </>
    )}
    </ScrollView>
  </SafeAreaView>



  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "white",
  },
header: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "transparent",
  justifyContent: "flex-start", // stack from top
  alignItems: "center",
  paddingTop: 20,
  paddingBottom: 20,
  zIndex: 10,
  paddingHorizontal: 16,
},
accueil: {
  fontSize: 16,
  color: "white",
  textAlign: "left",
},
title: {
  fontSize: 24,
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
  marginTop: 8,           // ⬅️ Small gap after Accueil
  paddingHorizontal: 16,
  maxWidth: '90%',
},
container: {
  height: 250, // width / height ratio
  width: '100%',
  justifyContent: "center",
  alignItems: "center",
  marginTop: hp('25%'),
  //  borderWidth: 2,         // Thickness of the border
  // borderColor: 'blue',    // Color of the border
  // borderRadius: 10, 
},
labelContainer: {
  marginTop: 20,
  alignSelf: "center",
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 12,  
},
  labelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

loremText: {
  color: 'white',
  fontSize: 16,
  lineHeight: 22,
},  
loremContainer: {
  marginTop: 20,
  paddingHorizontal: 16,
  maxHeight: 300, // limit height so it doesn’t overflow
},
scrollContainer: {
  marginTop: 20,
  paddingHorizontal: 16,
},
messageText: {
  color: "#ccc",
  fontSize: 16,
  textAlign: "center",
},
timelineItem: {
  marginBottom: 16,
  borderLeftWidth: 2,
  borderLeftColor: "#888",
  paddingLeft: 12,
  position: "relative",
},

timelineDate: {
  color: "gold",
  fontWeight: "bold",
  marginBottom: 4,
},

timelineDescription: {
  color: "white",
  fontSize: 15,
  lineHeight: 20,
},
timelineDot: {
  width: 8,
  height: 8,
  backgroundColor: "gold",
  borderRadius: 4,
  position: "absolute",
  left: -5,
  top: 5,
},
});
