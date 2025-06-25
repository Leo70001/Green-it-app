// AppController.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// Import hooks from Reanimated
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Import your two screens
import IndexScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';

/**
 * This component orchestrates the transition from the loading screen
 * to the main application screen.
 */
export default function AppController() {
  // This state determines if the LoadingScreen component is part of the component tree.
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // A shared value to control the opacity of the loading screen. 1 = fully visible.
  const loadingScreenOpacity = useSharedValue(1);

  // This effect runs once when the component mounts.
  useEffect(() => {
    // Simulate a loading time.
    setTimeout(() => {
      // Start the fade-out animation.
      loadingScreenOpacity.value = withTiming(0, { duration: 800 }, (isFinished) => {
        // This callback runs on the UI thread when the animation is complete.
        if (isFinished) {
          // We use runOnJS to safely call a React state update from the UI thread.
          runOnJS(setShowLoadingScreen)(false);
        }
      });
    }, 2500); // Total time before animation starts (includes slower leaf animation)
  }, []);

  // Create the animated style for the loading screen container.
  const animatedLoadingScreenStyle = useAnimatedStyle(() => {
    return {
      opacity: loadingScreenOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {/* The main screen is always rendered, but it's underneath. */}
      <IndexScreen />

      {/* The loading screen is rendered only when needed. */}
      {showLoadingScreen && (
        <Animated.View style={[styles.loadingContainer, animatedLoadingScreenStyle]}>
          <LoadingScreen />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    // This makes the loading screen container cover the entire screen,
    // positioning it on top of the main screen.
    ...StyleSheet.absoluteFillObject,
    zIndex: 10, // Ensures it stays on top of other content.
  },
});
