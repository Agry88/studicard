import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../types';
import AuthStackNavigator from './AuthStackNavigator';

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
    <RootStack.Navigator>
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}
