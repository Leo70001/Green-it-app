// _layout.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

// Import the screen components
// AppController will manage the loading screen and transition for the home tab
import AppController from '../AppController';
import QuizScreen from './QuizScreen'; // Assuming this is your refactored Quiz component or navigator
import ResourcesScreen from './resources'; // The placeholder screen for resources

// Import the type from its separate file. 
// Assuming you have a file named 'types.ts' or similar in the same directory or a dedicated types folder.
import { BottomTabParamList } from '@/interfaces/types';

const Tabs = createBottomTabNavigator<BottomTabParamList>();

/**
 * This is the main layout component for the application.
 * It sets up a bottom tab navigator with three tabs: Home, Quiz, and Resources.
 */
export default function TabLayout() {
    return (
        <Tabs.Navigator
            initialRouteName='home'
            screenOptions={({ route }) => ({
                // Function to determine which icon to show for each tab
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Quiz') {
                        iconName = focused ? 'help-circle' : 'help-circle-outline';
                    } else if (route.name === 'resources') { 
                        iconName = focused? 'book' : 'book-outline';
                    } else {
                        iconName = 'alert-circle-outline'; // Fallback icon
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                // Styling for the tabs
                tabBarActiveTintColor: 'gold',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
                headerShown: false, // Hide the header for all screens globally
            })}
        >
            {/* Home Tab - Uses the AppController to show the loading animation first */}
            <Tabs.Screen
                name="home"
                component={AppController}
                options={{
                    title: 'Accueil',
                }}
            />

            {/* Quiz Tab */}
            <Tabs.Screen
                name="Quiz"
                component={QuizScreen} // Ensure this component is correctly imported
                options={{
                    title: 'Quiz',
                }}
            />

            {/* Resources Tab */}
            <Tabs.Screen
                name="resources"
                component={ResourcesScreen} // Ensure this component is created and imported
                options={{
                    title: 'Ressources',
                }}
            />
        </Tabs.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#212121',
        borderTopWidth: 0.1,
        borderTopColor: '#ccc',
        height: 60,
        paddingBottom: 5,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
});
