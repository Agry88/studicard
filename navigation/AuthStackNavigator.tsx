import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParams } from '../types';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator initialRouteName='Auth'>
            <AuthStack.Screen name="Auth" component={AuthScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
}