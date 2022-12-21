import * as React from 'react';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { MainStackParams } from '../types';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindScreen from '../screens/FindScreen';
import AddCardSetScreen from '../screens/AddCardSetScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';
import SettingScreen from '../screens/SettingScreen';
import Color from "../constants/Colors";


const MainStack = createBottomTabNavigator<MainStackParams>();

export default function MainStackNavigator() {
    return (
        <MainStack.Navigator
            screenOptions={{
                tabBarInactiveTintColor: Color.tabNavigator.inactiveTintColor,
                tabBarActiveTintColor: Color.tabNavigator.activeTintColor,
                headerShown: false,
                tabBarShowLabel: false,
            }}
            initialRouteName='Home'
        >
            <MainStack.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />
            <MainStack.Screen name="Find" component={FindScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="folder-search" color={color} size={size} />
                    ),
                }}
            />
            <MainStack.Screen name="AddCardSet" component={AddCardSetScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="pluscircle" color={Color.tabNavigator.activeTintColor} size={size} />
                    ),
                }}
            />
            <MainStack.Screen name="Analyze" component={AnalyzeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="bar-chart-o" color={color} size={size} />
                    ),
                }}
            />
            <MainStack.Screen name="Setting" component={SettingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                }}
            />
        </MainStack.Navigator>
    );
}