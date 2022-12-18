import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from "../types";

type Props = NativeStackScreenProps<AuthStackParams, "Signup">;

export default function SignUpscreen({navigation}: Props) {
    return (
        <View>
            <Text>SignUp Screen</Text>
            <TouchableHighlight>
                <Text onPress={() => navigation.navigate("Login")}>Sign Up</Text>
            </TouchableHighlight>
        </View>
    )
}