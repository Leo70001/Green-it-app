// LoadingScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Importer l'icône de feuille
import { Ionicons } from '@expo/vector-icons';
// Importer les hooks nécessaires de Reanimated
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

/**
 * Un composant pour une feuille qui tombe et rebondit.
 */
const BouncingLeaf = () => {
  // Valeur partagée pour la position verticale (Y) de la feuille
  const translateY = useSharedValue(-200); // Commence au-dessus de l'écran

  useEffect(() => {
    // La valeur est animée en utilisant une séquence pour créer l'effet de rebond
    translateY.value = withRepeat(
      withSequence(
        // 1. La feuille tombe sur le "sol" - Durée augmentée pour ralentir la chute
        withTiming(0, { duration: 1800, easing: Easing.bounce }),
        // 2. Petite pause au sol - Durée augmentée pour une pause plus longue
        withTiming(0, { duration: 1200 }),
        // 3. Remonte pour recommencer la boucle - Durée augmentée pour ralentir la remontée
        withTiming(-200, { duration: 1500 })
      ),
      -1 // Répétition infinie
    );
  }, []);

  // Crée le style animé pour appliquer la translation verticale
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name="leaf" size={80} color="#6FD05B" />
    </Animated.View>
  );
};


/**
 * Un écran de chargement avec une animation de feuille qui rebondit.
 */
export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <BouncingLeaf />
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282929',
  },
  loadingText: {
    // On positionne le texte sous la zone d'animation de la feuille
    position: 'absolute',
    bottom: '40%',
    fontSize: 16,
    color: 'white',
  },
});
