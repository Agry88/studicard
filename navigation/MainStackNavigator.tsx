import * as React from 'react';
import { MainStackParams } from '../types';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FindScreen from '../screens/FindScreen';
import AddCardSetScreen from '../screens/AddCardSetScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';
import SettingScreen from '../screens/SettingScreen';

const MainStack = createBottomTabNavigator<MainStackParams>();

export default function MainStackNavigator() {
    return (
        <MainStack.Navigator initialRouteName='Home'>
            <MainStack.Screen name="Home" component={HomeScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen name="Find" component={FindScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen name="AddCardSet" component={AddCardSetScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen name="Analyze" component={AnalyzeScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen name="Setting" component={SettingScreen}
                options={{ headerShown: false }}
            />
        </MainStack.Navigator>
    );
}