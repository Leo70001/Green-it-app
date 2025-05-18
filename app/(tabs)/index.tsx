import WorldMap from "@/assets/svgs/world_map";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Continent = "africa" | "europe" | "asia" | "namerica" | "samerica" | "australia";

export default function Index() {
  const [activeContinent, setActiveContinent] = useState<Continent | null>(null);
    const africa = useSharedValue(0);
  const europe = useSharedValue(0);
  const asia = useSharedValue(0);
  const namerica = useSharedValue(0);
  const samerica = useSharedValue(0);
  const australia = useSharedValue(0);

    const animValues: Record<Continent, Animated.SharedValue<number>> = {
    africa,
    europe,
    asia,
    namerica,
    samerica,
    australia,
  };

  const toggleContinent = (continent: Continent) => {
    const isActive = activeContinent === continent;

    if (isActive) {
      animValues[continent].value = withTiming(0, { duration: 500 });
      setActiveContinent(null);
    } else {
      Object.entries(animValues).forEach(([key, val]) => {
        val.value = withTiming(key === continent ? 1 : 0, { duration: 500 });
      });
      setActiveContinent(continent);
    }
  };

  const africaFill = useAnimatedProps(() => ({
    fill: interpolateColor(africa.value, [0, 1], ["black", "red"]),
  }));
  const europeFill = useAnimatedProps(() => ({
    fill: interpolateColor(europe.value, [0, 1], ["black", "red"]),
  }));
  const asiaFill = useAnimatedProps(() => ({
    fill: interpolateColor(asia.value, [0, 1], ["black", "red"]),
  }));
  const namericaFill = useAnimatedProps(() => ({
    fill: interpolateColor(namerica.value, [0, 1], ["black", "red"]),
  }));
  const samericaFill = useAnimatedProps(() => ({
    fill: interpolateColor(samerica.value, [0, 1], ["black", "red"]),
  }));
  const australiaFill = useAnimatedProps(() => ({
    fill: interpolateColor(australia.value, [0, 1], ["black", "red"]),
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>

    {/* Fixed Header */}
      <View style={styles.header}>
    <Text style={styles.text}>Fixed Header</Text>
      </View>

    
        <View className="flex-1 justify-center items-center">
  
        <WorldMap
          continentColors={{
            africa: africaFill,
            europe: europeFill,
            asia: asiaFill,
            namerica: namericaFill,
            samerica: samericaFill,
            australia: australiaFill,
          }}
          onContinentPress={toggleContinent}
        />

        </View>
       
 
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
    backgroundColor: "#6200ea",
    padding: 20,
    alignItems: "center",
    zIndex: 1,
  },
});