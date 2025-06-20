import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// Import hooks from Reanimated
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Import your custom loading screen
import LoadingScreen from './(tabs)/LoadingScreen'; // Adjust the path if necessary

/**
 * This component handles the loading logic and smoothly transitions
 * to the main app layout (the Stack navigator).
 */
function AppWithLoading() {
  // This state determines if the LoadingScreen component is part of the component tree.
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);

  // A shared value to control the opacity of the loading screen. 1 = fully visible.
  const opacity = useSharedValue(1);

  // This effect runs once when the component mounts.
  useEffect(() => {
    // Set a timer for how long the loading screen should be visible.
    setTimeout(() => {
      // Start the fade-out animation for the loading screen.
      opacity.value = withTiming(0, { duration: 800 }, (isFinished) => {
        // This callback runs when the animation is complete.
        if (isFinished) {
          // Use runOnJS to safely update React state from the animation thread,
          // which removes the loading screen from the component tree.
          runOnJS(setShowLoadingOverlay)(false);
        }
      });
    }, 3000); // Adjust this time (in ms) to match your desired loading duration
  }, []);

  // Create the animated style for the loading screen's container.
  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* The main Stack navigator is always rendered underneath. */}
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>

      {/* The loading screen is rendered as an overlay on top only when needed. */}
      {showLoadingOverlay && (
        <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
          <LoadingScreen />
        </Animated.View>
      )}
    </View>
  );
}

// The main export for the layout file now renders our controller component.
export default function RootLayout() {
  return <AppWithLoading />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    // This makes the loading screen container cover the entire screen,
    // positioning it on top of the main layout.
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#282929', // Match your loading screen background
    zIndex: 10, // Ensures it stays on top of other content.
  },
});
