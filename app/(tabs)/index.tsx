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
    <SafeAreaView style={{ flex: 1 }}>

        {/* Fixed Header */}
        <View style={styles.header}>
          <Text style={styles.text}>Accueil</Text>
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

    <ScrollView style={styles.loremContainer}>
      <Text style={styles.loremText}>{loremIpsum}</Text>
    </ScrollView>
          </>
        )}

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
    padding: 20,
    alignItems: "center",
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#282929",
  },
  labelContainer: {
    position: "absolute",
    top: 400,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    zIndex: 2,
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
});
