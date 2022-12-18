import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from "../types";

type Props = NativeStackScreenProps<AuthStackParams, "Login">;

export default function LoginScreen({navigation}: Props) {
    return (
        <View>
            <Text>Login Screen</Text>
            <TouchableHighlight>
                <Text onPress={() => navigation.navigate("Signup")}>Sign Up</Text>
            </TouchableHighlight>
        </View>
    )
}