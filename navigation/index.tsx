import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import ViewCardSetScreen from '../screens/ViewCardSetScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParams>();
function RootNavigator() {
  return (
    <RootStack.Navigator
    screenOptions={{
      headerShown: false,
  }}
    >
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
      <RootStack.Screen name="ViewCardSet" component={ViewCardSetScreen} />
    </RootStack.Navigator>
  );
}
