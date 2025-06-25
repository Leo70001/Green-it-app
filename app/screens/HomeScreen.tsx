import WorldMap from "@/app/components/world_map";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Import the new `Selection` type along with the other data
import {
  Continent,
  Selection,
  continentDisplayNames,
  continentTimelines
} from "@/app/data/continentData";

export default function Index() {
  // State is renamed to `activeSelection` to reflect it can be a continent or "world"
  const [activeSelection, setActiveSelection] = useState<Selection | null>(null);

  const animValues = {
    africa: useSharedValue(0),
    europe: useSharedValue(0),
    asia: useSharedValue(0),
    namerica: useSharedValue(0),
    samerica: useSharedValue(0),
    australia: useSharedValue(0),
  };
  const [refreshing, setRefreshing] = useState(false);

  const labelOpacity = useSharedValue(0);
  const labelTranslateY = useSharedValue(10);
  const mapOpacity = useSharedValue(0);
  const mapTranslateY = useSharedValue(20);

  // The reset function now correctly sets the selection to null
  const resetScreen = useCallback(() => {
    setActiveSelection(null);
    (Object.keys(animValues) as Continent[]).forEach((key) => {
      animValues[key].value = withTiming(0, { duration: 500 });
    });
    labelOpacity.value = withTiming(0, { duration: 300 });
    labelTranslateY.value = withTiming(10, { duration: 300 });
    mapOpacity.value = withTiming(0, { duration: 0 });
    mapTranslateY.value = withTiming(20, { duration: 0 });
    mapOpacity.value = withTiming(1, { duration: 1000 });
    mapTranslateY.value = withTiming(0, { duration: 1000 });
  }, [animValues, labelOpacity, labelTranslateY, mapOpacity, mapTranslateY]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      resetScreen();
      setRefreshing(false);
    }, 1000);
  }, [resetScreen]);

  const createFillProps = (sharedValue: Animated.SharedValue<number>) =>
    useAnimatedProps(() => ({
      fill: interpolateColor(sharedValue.value, [0, 1], ["#ccc9be", "green"]),
    }));

  const continentFills = {
    africa: createFillProps(animValues.africa),
    europe: createFillProps(animValues.europe),
    asia: createFillProps(animValues.asia),
    namerica: createFillProps(animValues.namerica),
    samerica: createFillProps(animValues.samerica),
    australia: createFillProps(animValues.australia),
  };

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  const animatedMapStyle = useAnimatedStyle(() => ({
    opacity: mapOpacity.value,
    transform: [{ translateY: mapTranslateY.value }],
  }));

  useEffect(() => {
    mapOpacity.value = withTiming(1, { duration: 2000 });
    mapTranslateY.value = withTiming(0, { duration: 2000 });
  }, []);

  // Logic for selecting a single continent
  const toggleContinent = (continent: Continent) => {
    const isAlreadyActive = activeSelection === continent;

    if (isAlreadyActive) {
      // If clicking the active continent, deselect it
      setActiveSelection(null);
      animValues[continent].value = withTiming(0, { duration: 500 });
      labelOpacity.value = withTiming(0, { duration: 300 });
      labelTranslateY.value = withTiming(10, { duration: 300 });
    } else {
      // Otherwise, select the new continent
      setActiveSelection(continent);
      (Object.keys(animValues) as Continent[]).forEach((key) => {
        // Animate selected one to gold, others to default
        animValues[key].value = withTiming(key === continent ? 1 : 0, { duration: 500 });
      });
      labelOpacity.value = withTiming(1, { duration: 500 });
      labelTranslateY.value = withTiming(0, { duration: 500 });
    }
  };

  // --- NEW: Logic for the "World" button ---
  const toggleWorld = () => {
    const isWorldActive = activeSelection === 'world';

    if (isWorldActive) {
      // If world is active, deselect it (reset)
      resetScreen();
    } else {
      // If another continent or nothing is active, select "world"
      setActiveSelection('world');
      // Highlight all continents
      (Object.keys(animValues) as Continent[]).forEach(key => {
        animValues[key].value = withTiming(1, { duration: 500 });
      });
      // Show the label and timeline
      labelOpacity.value = withTiming(1, { duration: 500 });
      labelTranslateY.value = withTiming(0, { duration: 500 });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#282929" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Green IT et politiques publiques : que font les États ?</Text>
        </View>

        <Animated.View style={[styles.container, animatedMapStyle]}>
          <WorldMap
            continents={Object.keys(animValues) as Continent[]}
            continentColors={continentFills}
            onContinentPress={toggleContinent}
          />
        </Animated.View>

        {/* --- NEW: World Button --- */}
        <TouchableOpacity onPress={toggleWorld} style={styles.worldButton}>
          <Text style={styles.worldButtonText}>Monde</Text>
        </TouchableOpacity>

        {/* This rendering logic now works with `activeSelection` (continent or world) */}
        {activeSelection && (
          <>
            <Animated.View style={[styles.labelContainer, animatedLabelStyle]}>
              <Text style={styles.labelText}>
                {continentDisplayNames[activeSelection].toUpperCase()}
              </Text>
            </Animated.View>

            <Animated.View style={[styles.scrollContainer, animatedLabelStyle]}>
              {continentTimelines[activeSelection].map((entry, index) => (
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

// Styles have been updated to include the new button
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  container: {
    height: 250,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('20%'), // Adjusted margin slightly
  },
  // --- NEW: Styles for the World Button ---
  worldButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  worldButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  labelContainer: {
    marginTop: 30, // Increased margin to give button space
    alignSelf: "center",
  },
  labelText: {
    color: "white",
    fontSize: 22, // Made label slightly larger
    fontWeight: "bold",
    letterSpacing: 1,
  },
  scrollContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  timelineItem: {
    marginBottom: 16,
    borderLeftWidth: 2,
    borderLeftColor: "#888",
    paddingLeft: 16,
    position: "relative",
  },
  timelineDate: {
    color: "green",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  timelineDescription: {
    color: "white",
    fontSize: 15,
    lineHeight: 22,
  },
  timelineDot: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
    position: "absolute",
    left: -6, // Adjusted for new border width
    top: 5,
  },
});