import { Ionicons } from '@expo/vector-icons'; // or use any icon library
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import index from './index'; // replace with actual screen
import profile from './profile'; // replace with actual screen
import search from './search';

const Tabs = createBottomTabNavigator();

export default function _layout() {
    return (
        <Tabs.Navigator
        initialRouteName='home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'search') {
                        iconName = focused ? 'search' : 'search-outline'
                    }

                    return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'gold',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabLabel,
            })}
        >
            <Tabs.Screen
                name="home"
                component={index}
                options={{
                    title: 'Home',
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="search"
                component={search}
                options={{
                    title: 'Search',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="profile"
                component={profile}
                options={{
                    title: 'Profile',
                    headerShown: false,
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
